import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { BaseAccessArgs } from '@keystone-6/core/dist/declarations/src/types/config/access-control';
import {
    checkbox,
    integer,
    relationship,
    virtual,
} from '@keystone-6/core/fields';
import {
    BaseKeystoneTypeInfo,
    BaseListTypeInfo,
    KeystoneContext,
} from '@keystone-6/core/types';
import { GeneralSession } from '../data/types';
// import { rules, isSignedIn } from "../access";
import { GraphQLError } from 'graphql';
import { kickout } from '../data/utils';
import { graphql } from '@graphql-ts/schema';

const isUser = (args: BaseAccessArgs<BaseListTypeInfo>) => {
    if (!!args.session === false) kickout(args.context.req);

    return !!args.session;
};

export const CartItem = list({
    access: {
        operation: {
            query: isUser,
            create: isUser,
            delete: isUser,
            update: isUser,
        },
    },
    ui: {
        listView: {
            initialColumns: ['type', 'cart', 'coupon'],
        },
    },
    hooks: {
        async validateInput(args) {
            console.log(args.resolvedData);
            if (args.operation === 'update') {
                return;
            }

            if (args.inputData.course === null && args.inputData.event === null)
                args.addValidationError('select course or event');
            if (args.inputData.course && args.inputData.event)
                args.addValidationError('pick one ! "one"');

            // FIND A WAY TO GET FINAL RESAULT

            const coponId: string | undefined =
                args.resolvedData?.coupon?.connect?.id;
            const courseId = args.resolvedData?.course?.connect?.id;
            const eventId = args.resolvedData?.event?.connect?.id;

            if (typeof courseId !== 'string' && typeof eventId !== 'string') {
                args.addValidationError('enter either courseid or itemid');
                return;
            }
            if (coponId) {
                const { remaining, belongsTo } =
                    await args.context.query.Coupon.findOne({
                        where: {
                            id: coponId,
                        },
                        query: ' remaining , belongsTo { id , name } ',
                    });

                if (
                    !!courseId &&
                    !belongsTo.some((i: any) => i.id === courseId)
                ) {
                    args.addValidationError(
                        'fa:: the course dosent belong to this coupon'
                    );
                    return;
                }

                if (remaining === 0) {
                    // remaining dosent matter if u want to delete
                    if (
                        args.resolvedData.coupon &&
                        args.resolvedData.coupon.disconnect === false
                    )
                        args.addValidationError('fa:: there is no coupon left');
                }

                // throw an error if user already use siad coupon
                if (
                    args.resolvedData.coupon &&
                    args.resolvedData.coupon.disconnect === false
                ) {
                    const {
                        cart: [firstcart],
                    } = await args.context.query.User.findOne({
                        where: {
                            id: (args.context.session as GeneralSession)
                                ?.itemId,
                        },
                        query: 'cart { id items { id coupon { id } } }',
                    });

                    if (
                        firstcart &&
                        firstcart.items
                            .map((i: any) => (i.coupon ? i.coupon.id : false))
                            .filter(Boolean)
                            .includes(coponId)
                    )
                        args.addValidationError(
                            'fa:: you already use this coupon'
                        );
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

                        if (event) return event.price * quantity;

                        if (coupon) {
                            return (
                                ((100 - coupon.discount) * course.price) / 100
                            );
                        } else return course.price;
                    } catch (error) {
                        return 0;
                    }
                },
            }),
        }),
        cart: relationship({
            ref: 'Cart.items',
            ui: { hideCreate: true },
        }),
    },
});
