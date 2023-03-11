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
import { Session } from '../data/types';
import { Roles } from '../data/enums';

export const Course = list({
    access: {
        operation: {
            ...allOperations(allowAll),
            create: isLoggedIn,
        },
        filter: {
            query: (args) => {
                const session = args.context.session as Session | undefined;
                if (session && session.data.role === Roles.admin) return true;
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
        rate: virtual({
            field: graphql.field({
                type: graphql.Float,
                // @ts-ignore
                async resolve(
                    item,
                    _args,
                    context: KeystoneContext<BaseKeystoneTypeInfo>
                ) {
                    const query = await context.query.Comment.findMany({
                        where: {
                            course: { id: { equals: item.id.toString() } },
                        },
                        query: 'rate',
                    });

                    const rates: number[] = query
                        .filter((i) => i.rate !== -1)
                        .map((i) => i.rate);

                    return rates.length === 0
                        ? 3
                        : rates.reduce((total, item) => (total += item), 0) /
                              rates.length;
                },
            }),
        }),
        teacher: relationship({
            ref: 'Teacher.courses',
            ui: { labelField: 'name' },
        }),
        // rate: integer({ defaultValue: 3 }),
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
