import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { BaseAccessArgs } from '@keystone-6/core/dist/declarations/src/types/config/access-control';
import {
    checkbox,
    integer,
    relationship,
    virtual,
} from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { GraphQLError } from 'graphql';
import { graphql } from '@graphql-ts/schema';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';
import { isLoggedIn } from '../data/access';

export const Cart = list({
    // TODO [security concern] filter by session id
    access: {
        operation: {
            ...allOperations(isLoggedIn),
        },
    },
    ui: {
        listView: {
            initialColumns: ['summery', 'user'],
        },
    },
    hooks: {
        beforeOperation: async (args) => {
            if (args.operation !== 'delete') return;

            const sudo = args.context.sudo();
            try {
                const itemsWithThisParent = await sudo.query.CartItem.findMany({
                    where: { cart: { id: { equals: args.item.id } } },
                    query: ' id ',
                });

                await sudo.query.CartItem.deleteMany({
                    where: itemsWithThisParent,
                });
            } catch (error) {
                console.error(error);
            }
            sudo.exitSudo();
        },
    },
    fields: {
        // quantity: integer({
        //     defaultValue: 1,
        //     validation: {
        //         isRequired: true,
        //     },
        // }),
        summery: virtual({
            field: graphql.field({
                type: graphql.String,
                // @ts-ignore
                async resolve(
                    item,
                    _args,
                    context: KeystoneContext<BaseKeystoneTypeInfo>
                ) {
                    const { items } = await context.query.Cart.findOne({
                        where: { id: item.id.toString() },
                        query: 'items { course { name } event { name } }',
                    });

                    const summeryText =
                        items
                            .map((i: any) => i.event?.name || '')
                            .filter(Boolean)
                            .join(' . ') +
                        items
                            .map((i: any) => i.course?.name || '')
                            .filter(Boolean)
                            .join(' . ');

                    return summeryText.trim() || 'empty cart';
                },
            }),
        }),
        items: relationship({
            ref: 'CartItem.cart',
            many: true,
            label: 'cart items',
        }),
        user: relationship({ ref: 'User.cart', many: false }),
        totalPrice: virtual({
            field: graphql.field({
                type: graphql.Float,
                // @ts-ignore
                async resolve(
                    item,
                    _,
                    context: KeystoneContext<BaseKeystoneTypeInfo>
                ) {
                    const { items } = await context.query.Cart.findOne({
                        where: { id: item.id.toString() },
                        query: 'items { priceWithDiscount }',
                    });

                    return items.reduce(
                        (
                            total: number,
                            { priceWithDiscount }: { priceWithDiscount: number }
                        ) => (total += priceWithDiscount),
                        0
                    );
                },
            }),
        }),
        isCompleted: checkbox({ defaultValue: false }),
    },
});
