import {
    integer,
    select,
    text,
    relationship,
    virtual,
    image,
} from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { isLoggedIn } from '../data/access';
import { graphql } from '@graphql-ts/schema';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';
import { formatMoney } from '../data/utils';
import { GeneralSession } from '../data/types';

export const Course = list({
    access: {
        operation: {
            ...allOperations(allowAll),
            create: isLoggedIn,
        },
        filter: {
            query: (args) => {
                if (
                    args.session &&
                    (args.session as GeneralSession)?.data.role === '0'
                )
                    return true;
                else
                    return {
                        status: {
                            equals: 'AVAILABLE',
                        },
                    };
            },
        },
    },
    fields: {
        name: text({ validation: { isRequired: true } }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
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
        teacher: relationship({ ref: 'Teacher.courses', ui: { labelField: 'name' } }),
        rate: integer({ defaultValue: 3 }),
        image: image({
            storage: 'images',
        }),
        comments: relationship({
            ref: 'Comment.course',
            many: true,
            ui: {
                // displayMode: 'count',
            },
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
            ui: {
                hideCreate: true,
            },
        }),
        courseItem: relationship({
            ref: 'CourseItem.course',
            many: true,
            ui: {
                labelField: 'name',

                inlineCreate: {
                    fields: ['CourseItem.name', 'CourseItem.description'],
                },
            },
        }),
        isAccessible: virtual({
            ui: {
                createView: {
                    fieldMode: 'hidden',
                },
            },
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
