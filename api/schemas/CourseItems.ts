import {
    integer,
    select,
    text,
    relationship,
    virtual,
} from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { isLoggedIn } from '../data/access';
import { graphql } from '@graphql-ts/schema';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';
import { formatMoney } from '../data/utils';

export const CourseItems = list({
    access: {
        operation: {
            ...allOperations(allowAll),
            create: isLoggedIn,
        },
        // filter: {
        //   query: rules.canReadProducts,
        //   update: rules.canManageProducts,
        //   delete: rules.canManageProducts,
        // },
    },
    fields: {
        no: integer({ validation: { min: 1 } }),
        name: text({ validation: { isRequired: true } }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        // photo: relationship({
        //   ref: 'ProductImage.product',
        //   ui: {
        //     displayMode: 'cards',
        //     cardFields: ['image', 'altText'],
        //     inlineCreate: { fields: ['image', 'altText'] },
        //     inlineEdit: { fields: ['image', 'altText'] },
        //   },
        // }),

    },
});
