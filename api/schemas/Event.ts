import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import {
    text,
    integer,
    virtual,
    select,
    relationship,
    image,
} from '@keystone-6/core/fields';
import { componentBlocks } from './component-blocks';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';

import { persianCalendar } from '../src/custom-fields/persian-calander';
import { wordifyfa } from '../data/lib/wordifyfa';
import { document } from '@keystone-6/fields-document';
import { allOperations } from '@keystone-6/core/access';
import { isAdmin, isLoggedIn } from '../data/access';
import { Session } from '../data/types';
import { Roles } from '../data/enums';
export const Event = list({
    access: {
        operation: {
            ...allOperations(isAdmin),
            query: () => true,
            update: isLoggedIn,
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

    hooks: {
        validateInput(args) {
            // TODO deadline must not after starting event
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
        image: image({ storage: 'images' }),
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
                    const { price } = item as unknown as { price: number };

                    if (price) {
                        switch (price) {
                            case 0:
                                return 'رایگان';

                            case -1:
                                return 'این رویداد قابل ثبت نام نیست';
                            default:
                                return `${wordifyfa(price)} تومان `;
                        }
                    } else return 'رایگان';
                },
            }),
        }),
        maxAmount: integer({ validation: { isRequired: true } }),
        remaining: virtual({
            field: graphql.field({
                type: graphql.Int,
                // @ts-ignore
                async resolve(
                    { id, maxAmount }: { id: string; maxAmount: number },
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
                    console.log(users);

                    if (
                        (users as { id: string }[]).find(
                            (i) => i.id === context.session.itemId
                        )
                    )
                        return true;

                    return false;
                },
            }),
            // graphQLReturnType: "String",
        }),
        isUpcomming: virtual({
            field: graphql.field({
                type: graphql.Boolean,

                async resolve(item, _) {
                    const { from } = item as unknown as { from: string };

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
                    const { registrationDeadline } = item as unknown as {
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
