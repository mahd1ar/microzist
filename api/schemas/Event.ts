import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    text,
    integer,
    virtual,
    select,
    relationship,
} from '@keystone-6/core/fields';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';

import { persianCalendar } from '../src/custom-fields/persian-calander';
import { wordifyfa } from "../data/lib/wordifyfa"
import { document } from '@keystone-6/fields-document';

export const Event = list({
    access: allowAll,
    fields: {
        name: text({
            validation: { isRequired: true },
        }),
        description: text({ ui: { displayMode: 'textarea' } }),
        content: document({
            formatting: true,
            layouts: [
                [1, 1],
                [1, 1, 1],
                [2, 1],
                [1, 2],
                [1, 2, 1],
            ],
            links: true,
            dividers: true,
            relationships: {
                mention: {
                    listKey: 'User',
                    label: 'Mention',
                    selection: 'id name',
                },
            },
        }),
        price: integer(),
        priceFa: virtual({
            field: graphql.field({
                type: graphql.String,
                async resolve(item) {
                    // @ts-ignore
                    return item.price ? `${wordifyfa(item.price)} تومان ` : 'رایگان';
                },
            }),
        }),
        maxAmount: integer({ validation: { isRequired: true } }),
        remaining: virtual({
            field: graphql.field({
                type: graphql.Int,
                // @ts-ignore
                async resolve(
                    { id, maxAmount },
                    _,
                    context: KeystoneContext<BaseKeystoneTypeInfo>
                ) {
                    try {
                        const currentlyInUse =
                            await context.query.User.count({
                                where: { events: { some: { id: { equals: id } } } }
                            });



                        return maxAmount - currentlyInUse;
                    } catch (error) {
                        console.error(error);
                        return maxAmount;
                    }
                },
            }),
            // graphQLReturnType: "String",
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

        from: persianCalendar(),
        to: persianCalendar(),
        location: text(),
        users: relationship({
            ref: 'User.events',
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
        isAccessible: virtual({
            // ui: {
            //     createView: {
            //         fieldMode: 'hidden',
            //     },
            // },
            field: graphql.field({
                type: graphql.Boolean,
                // @ts-ignore
                async resolve(
                    item,
                    _,
                    context: KeystoneContext<BaseKeystoneTypeInfo>
                ) {
                    if (!context.session) return false;

                    const { users } = await context.query.Event.findOne({
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
