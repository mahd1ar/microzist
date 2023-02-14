import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    float,
    integer,
    relationship,
    select,
    text,
    timestamp,
    virtual,
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
