import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
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
            query: isLoggedIn,
            create: isLoggedIn,
            delete: isLoggedIn,
            update: isLoggedIn,
        },
    },
    ui: {
        listView: {
            initialColumns: ['summery', 'user'],
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
                        query: 'items { course { name } }',
                    });

                    return items.map((i: any) => i.course.name).join(' & ');
                },
            },),
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
                    console.log(items)
                    return items.reduce((total: number, { priceWithDiscount }: { priceWithDiscount: number }) => total += priceWithDiscount, 0)
                },
            }),
        }),
        isCompleted: checkbox({ defaultValue: false }),
    },
});
