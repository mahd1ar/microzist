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
            initialColumns: ['course', 'cart', 'coupon'],
        },
    },
    hooks: {
        async validateInput(args) {
            if (args.operation === 'create') {
                if (args.inputData.course === null)
                    args.addValidationError('course is required');
            }

            const coponId: string | undefined =
                args.item?.couponId || args.resolvedData?.coupon?.connect?.id;

            const courseId =
                args.item?.course || args.resolvedData?.course?.connect?.id;

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
                )
                    args.addValidationError(
                        'fa:: the course dosent belong to this coupon'
                    );

                if (remaining === 0) {
                    args.addValidationError('fa:: there is no coupon left');
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
        course: relationship({ ref: 'Course' }),
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
                        const { course, coupon } =
                            await context.query.CartItem.findOne({
                                where: { id: item.id.toString() },
                                query: 'course {  price , name }, coupon { discount }',
                            });

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
            // ui: { labelField: 'summery' },
        }),
    },
});
