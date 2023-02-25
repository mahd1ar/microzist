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
import { componentBlocks } from './component-blocks';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';

import { persianCalendar } from '../src/custom-fields/persian-calander';
import { wordifyfa } from '../data/lib/wordifyfa';
import { document } from '@keystone-6/fields-document';
import { allOperations } from '@keystone-6/core/access';
import { isAdmin, isLoggedIn } from '../data/access';
export const Event = list({
    access: {
        operation: {
            ...allOperations(isAdmin),
            query: () => true,
            update: isLoggedIn,
        },
    },

    hooks: {
        validateInput(args) {
            // TODO deadline must not after starting event
            console.log('args.resolvedData');
            console.log(args.resolvedData);

            console.log('args.item');
            console.log(args.item);
            console.log('args.inputData');
            console.log(args.inputData);
        },
    },

    fields: {
        url: virtual({
            field: graphql.field({
                type: graphql.String,

                async resolve(item) {
                    return `${process.env.FRONTENDURL}/events/${item.id}`;
                },
            }),
        }),
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
            ui: {
                views: './schemas/component-blocks',
            },
            componentBlocks,
        }),
        price: integer(),
        priceFa: virtual({
            field: graphql.field({
                type: graphql.String,
                async resolve(item) {
                    const { price } = item as { price: number };
                    return price ? `${wordifyfa(price)} تومان ` : 'رایگان';
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
                        const currentlyInUse = await context.query.User.count({
                            where: { events: { some: { id: { equals: id } } } },
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

        from: persianCalendar({
            label: 'starting date',
        }),
        to: persianCalendar({
            label: 'ending date',
        }),
        registrationDeadline: persianCalendar({
            label: 'آخرین مهلت ثبت نام',
        }),
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
        isUpcomming: virtual({
            field: graphql.field({
                type: graphql.Boolean,

                async resolve(item, _) {
                    const { from } = item as { from: string };

                    if (!from) return false;
                    // const fromArr = from.split('-').map((i) => +i);
                    // const [today_m, today_d, today_y] = new Intl.DateTimeFormat(
                    //     'en-US'
                    // )
                    //     .format(new Date())
                    //     .split('/')
                    //     .map((i) => +i);

                    // const todayEpoch =
                    //     new Date(today_y, today_m, today_d).getTime() / 1000;
                    const todayEpoch = ~~(new Date().getTime() / 1000);

                    // const fromEpoch =
                    //     new Date(fromArr[0], fromArr[1], fromArr[2]).getTime() /
                    //     1000;
                    const fromEpoch =
                        new Date(from + 'T06:00').getTime() / 1000;

                    return todayEpoch < fromEpoch;
                },
            }),
            // graphQLReturnType: "String",
        }),
        isOpen: virtual({
            field: graphql.field({
                type: graphql.Boolean,

                async resolve(item, _) {
                    const { registrationDeadline } = item as {
                        registrationDeadline: string;
                    };

                    if (!registrationDeadline) return false;

                    const todayEpoch = ~~(new Date().getTime() / 1000);

                    const deadlineDate =
                        new Date(registrationDeadline + 'T06:00').getTime() /
                        1000;

                    return todayEpoch <= deadlineDate;
                },
            }),
            // graphQLReturnType: "String",
        }),
    },
});
