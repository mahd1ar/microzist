import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { BaseAccessArgs } from '@keystone-6/core/dist/declarations/src/types/config/access-control';
import { integer, relationship, virtual } from '@keystone-6/core/fields';
import {
    BaseKeystoneTypeInfo,
    BaseListTypeInfo,
    KeystoneContext,
} from '@keystone-6/core/types';
import { Session } from '../data/types';
// import { rules, isSignedIn } from "../access";
import { kickout } from '../data/utils';
import { graphql } from '@graphql-ts/schema';
import { capitalize } from 'lodash';
import Dict from '../data/dict';
import { isLoggedIn } from '../data/access';

export const CartItem = list({
    access: {
        operation: {
            ...allOperations(isLoggedIn),
            update: isLoggedIn,
        },
    },
    ui: {
        listView: {
            initialColumns: ['type', 'cart', 'coupon'],
        },
    },
    hooks: {
        async validateInput(args) {
            // if(args.operation==='create'){

            // }
            // const x = args.context.query.CartItem.findOne({
            //     where: {id:}
            // })

            if (args.operation === 'create') {
                if (
                    args.inputData.course === null &&
                    args.inputData.event === null
                )
                    args.addValidationError('select course or event');
                if (args.inputData.course && args.inputData.event)
                    args.addValidationError('pick one ! "one"');

                // FIND A WAY TO GET FINAL RESAULT

                const courseId = args.resolvedData?.course?.connect?.id;
                const eventId = args.resolvedData?.event?.connect?.id;

                if (
                    typeof courseId !== 'string' &&
                    typeof eventId !== 'string'
                ) {
                    args.addValidationError('enter either courseid or itemid');
                    return;
                }
            }

            if (args.operation === 'update') {
                const coponId: string | undefined =
                    args.resolvedData?.coupon?.connect?.id ||
                    args.item.couponId;

                const courseId: string | undefined =
                    args.resolvedData?.course?.connect?.id ||
                    args.item.courseId;
                const eventId: string | undefined =
                    args.resolvedData?.event?.connect?.id || args.item.eventId;
                console.log(args.context.session);
                const productType = eventId ? 'event' : 'course';
                const productID = eventId || courseId;
                const productName = eventId ? 'fa:: Event ' : 'Fa:: Course ';

                if (coponId) {
                    const { remaining, belongsTo } =
                        await args.context.query.Coupon.findOne({
                            where: {
                                id: coponId,
                            },

                            query: `id remaining , belongsTo: belongsTo${capitalize(
                                productType
                            )} { id , name } `,
                        });

                    if (
                        !!courseId &&
                        !belongsTo.some((i: any) => i.id === productID)
                    ) {
                        args.addValidationError(Dict.fa.errors.e101);
                        return;
                    }

                    if (remaining === 0) {
                        // remaining dosent matter if u want to delete
                        if (
                            args.resolvedData.coupon &&
                            args.resolvedData.coupon.disconnect === false
                        )
                            args.addValidationError(Dict.fa.errors.e102);
                    }

                    if (
                        args.resolvedData.coupon &&
                        !!args.resolvedData.coupon.disconnect === false
                    ) {
                        const {
                            cart: [firstcart],
                        } = await args.context.query.User.findOne({
                            where: {
                                id: (args.context.session as Session)?.itemId,
                            },
                            query: 'cart { id items { id coupon { id } } }',
                        });

                        if (
                            firstcart &&
                            firstcart.items
                                .map((i: any) =>
                                    i.coupon ? i.coupon.id : false
                                )
                                .filter(Boolean)
                                .includes(coponId)
                        )
                            args.addValidationError(Dict.fa.errors.e103);
                    }
                }
            }
        },
    },
    fields: {
        // quantity: integer({
        //     defaultValue: 1,
        //     validation: {
        //         isRequired: true,
        //     },
        // }),
        type: virtual({
            field: graphql.field({
                type: graphql.String,
                resolve: (item) => (item.eventId ? 'event' : 'course'),
            }),
        }),
        course: relationship({ ref: 'Course' }),
        event: relationship({ ref: 'Event' }),
        quantity: integer({ defaultValue: 1 }),
        coupon: relationship({ ref: 'Coupon', ui: { labelField: 'code' } }),
        cart: relationship({
            ref: 'Cart.items',
            ui: { hideCreate: true },
        }),
        priceWithDiscount: virtual({
            field: graphql.field({
                type: graphql.Float,
                // @ts-ignore
                async resolve(
                    item,
                    _args,
                    context: KeystoneContext<BaseKeystoneTypeInfo>
                ) {
                    try {
                        const { course, coupon, event, quantity } =
                            await context.query.CartItem.findOne({
                                where: { id: item.id.toString() },
                                query: 'course {  price , name }, coupon { discount } event {  price , name }, quantity ',
                            });

                        const remainingPercent =
                            (100 - (coupon?.discount || 0)) / 100;

                        // TODO check if coupon belongs to
                        if (event) {
                            return remainingPercent * event.price * quantity;
                        }

                        if (course) {
                            return remainingPercent * course.price;
                        }
                    } catch (error) {
                        return 0;
                    }
                },
            }),
        }),
    },
});
