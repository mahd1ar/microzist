import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    float,
    relationship,
    select,
    text,
    timestamp,
} from '@keystone-6/core/fields';

export const Order = list({
    access: allowAll,
    // TODO: adjust access for god sakes
    // {
    // create: isSignedIn,
    // read: rules.canOrder,
    // update: () => false,
    // delete: () => false,
    // },
    hooks: {
        beforeOperation: async (args) => {
            if (args.operation !== 'delete') return;

            const sudo = args.context.sudo();
            try {
                const orderItemsWithThisParentParent =
                    await sudo.query.OrderItem.findMany({
                        where: { order: { id: { equals: args.item.id } } },
                        query: ' id ',
                    });

                await sudo.query.OrderItem.deleteMany({
                    where: orderItemsWithThisParentParent,
                });
            } catch (error) {
                console.log(error);
            }
            sudo.exitSudo();
        },
    },
    fields: {
        totalCost: float(),
        items: relationship({ ref: 'OrderItem.order', many: true }),
        trackId: text(),
        user: relationship({ ref: 'User.orders' }),
        paymentStatus: select({
            type: 'integer',
            options: [
                {
                    label: 'pending',
                    value: 0,
                },
                {
                    label: 'paid',
                    value: 1,
                },
                {
                    label: 'failed',
                    value: -1,
                },
            ],
            defaultValue: 0,
        }),
        orderDate: timestamp({ defaultValue: { kind: 'now' } }),

        // charge: text(),
    },
    ui: {
        isHidden: process.env.NODE_ENV === 'production',
    },
});
