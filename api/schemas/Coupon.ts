import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { integer, relationship, text, virtual } from '@keystone-6/core/fields';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';

export const Coupon = list({
    // TODO only admin can create this
    access: allowAll,
    fields: {
        code: integer({ validation: { isRequired: true, max: 9999 } }),
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
        belongsTo: relationship({
            ref: 'Course',
            many: true,
            ui: {
                description: 'چه محصولاتی را شامل میشود',
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
