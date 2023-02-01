import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    integer,
    relationship,
    select,
    text,
    timestamp,
    virtual,
} from '@keystone-6/core/fields';
// import { isSignedIn, rules } from "../access";
import { formatMoney } from '../data/utils';

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
        total: integer(),
        totalCost: integer(),
        items: relationship({ ref: 'OrderItem.order', many: true }),
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
