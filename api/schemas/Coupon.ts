import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import { allowAll, allOperations } from '@keystone-6/core/access';
import { integer, relationship, text, virtual } from '@keystone-6/core/fields';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';
import { isAdmin, isLoggedIn } from '../data/access';

export const Coupon = list({
    access: {
        operation: { ...allOperations(isAdmin), query: isLoggedIn },
    },
    ui: {
        listView: {
            initialColumns: ['code', 'remaining'],
        },
    },
    fields: {
        code: text({
            validation: { isRequired: true },
        }),
        description: text({ validation: { isRequired: true } }),
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
                            await context.query.CartItem.count({
                                where: {
                                    coupon: {
                                        id: { equals: id },
                                    },
                                },
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
        belongsToCourse: relationship({
            ref: 'Course',
            many: true,
            ui: {
                description: 'چه آموزش هایی را شامل میشود',
            },
        }),
        belongsToEvent: relationship({
            ref: 'Event',
            many: true,
            ui: {
                description: 'چه رویداد هایی را شامل میشود',
            },
        }),
        discount: integer({
            validation: {
                max: 90,
                min: 5,
            },
        }),
    },
});
