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

export const Course = list({
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
        status: select({
            options: [
                { label: 'Draft', value: 'DRAFT' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'Unavailable', value: 'UNAVAILABLE' },
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
                createView: { fieldMode: 'hidden' },
            },
        }),
        price: integer(),
        priceFa: virtual({
            field: graphql.field({
                type: graphql.String,
                async resolve(item) {
                    // @ts-ignore
                    return `${formatMoney(item.price)}`;
                },
            }),
        }),
        users: relationship({
            ref: 'User.courses',
            many: true,
            hooks: {
                resolveInput({ operation, resolvedData, context }) {
                    // Default to the currently logged in user on create.

                    if (
                        operation === 'create' &&
                        !resolvedData.users &&
                        context.session?.itemId
                    ) {
                        return { connect: { id: context.session?.itemId } };
                    }
                    return resolvedData.users;
                },
            },
        }),
        isAccessible: virtual({
            field: graphql.field({
                type: graphql.Boolean,
                // @ts-ignore
                async resolve(
                    item,
                    _,
                    context: KeystoneContext<BaseKeystoneTypeInfo>
                ) {
                    if (!context.session) return false;

                    const { users } = await context.query.Course.findOne({
                        where: { id: item.id.toString() },
                        query: 'users { id }',
                    });

                    if (users.length === 0) {
                        return false;
                    }

                    if (context.session.itemId === users[0].id) return true;

                    return false;
                },
            }),
            // graphQLReturnType: "String",
        }),
    },
});
