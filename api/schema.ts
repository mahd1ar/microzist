// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields
// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { arg } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
    calendarDay,
    image,
    multiselect,
    relationship,
    text,
    timestamp,
    integer,
    select,
} from '@keystone-6/core/fields';
import {
    ListFilterAccessControl,
    ListOperationAccessControl,
} from '@keystone-6/core/types';
// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
import { isAdmin } from './data/access';
import { GeneralSession } from './data/types';
import {
    Category,
    Settings,
    User,
    Image,
    Tag,
    CartItem,
    Order,
    OrderItem,
    Product,
} from './schemas';
import { persianCalendar } from './src/custom-fields/persian-calander';

export const lists: Lists = {
    User,
    // User: list({
    //   // WARNING
    //   //   for this starter project, anyone can create, query, update and delete anything
    //   //   if you want to prevent random people on the internet from accessing your data,
    //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    //   access: allowAll,

    //   // this is the fields for our User list
    //   fields: {
    //     // by adding isRequired, we enforce that every User should have a name
    //     //   if no name is provided, an error will be displayed
    //     name: text({ validation: { isRequired: true } }),
    //     lastName: text({ validation: { isRequired: true } }),

    //     email: text({
    //       validation: { isRequired: true },
    //       // by adding isIndexed: 'unique', we're saying that no user can have the same
    //       // email as another user - this may or may not be a good idea for your project
    //       isIndexed: 'unique',
    //     }),

    //     password: password({ validation: { isRequired: true } }),

    //     // we can use this field to see what Posts this User has authored
    //     //   more on that in the Post list below
    //     posts: relationship({ ref: 'Post.author', many: true }),
    //     images: relationship({ ref: 'Image.uploadedBy', many: true }),

    //     createdAt: timestamp({
    //       // this sets the timestamp to Date.now() when the user is first created
    //       defaultValue: { kind: 'now' },
    //     }),
    //   },
    // }),
    Coupon: list({
        // TODO only admin can create this
        access: allowAll,
        fields: {
            code: integer({ validation: { isRequired: true, max: 9999 } }),
            description: text({ validation: { isRequired: true } }),
            maxAmount: integer({ validation: { isRequired: true } }),
            couponItem: relationship({
                ref: 'CouponPivot',
                many: true,
                ui: {
                    // labelField: 'customer',
                },
            }),
        },
    }),
    CouponPivot: list({
        ui: {
            listView: {
                initialColumns: ['couponCode', 'customer', 'status'],
            },
        },
        hooks: {
            validateInput: async (args) => {
                if (args.operation === 'create') {
                    if (!args.resolvedData.customer) {
                        args.addValidationError(
                            'fa:: customer cannot be empty'
                        );
                        return;
                    }

                    if (!args.resolvedData.couponCode) {
                        args.addValidationError(
                            'fa:: coupon Code cannot be empty'
                        );
                    } else {
                        // every pesion sould have 1 coupon per code
                        const id = args.resolvedData.couponCode.connect!.id;

                        const { code, maxAmount } =
                            await args.context.query.Coupon.findOne({
                                where: { id },
                                query: 'code maxAmount',
                            });

                        const numberOfCouponsPerProduct =
                            await args.context.query.CouponPivot.count({
                                where: {
                                    customer: {
                                        id: {
                                            equals: args.inputData.customer
                                                ?.connect?.id,
                                        },
                                    },
                                    couponCode: {
                                        code: {
                                            equals: code,
                                        },
                                    },
                                },
                            });

                        if (numberOfCouponsPerProduct > 0) {
                            args.addValidationError(
                                'fa:: you already have one'
                            );
                            return;
                        }

                        const couponsWeAlreadyHaveCount =
                            await args.context.query.CouponPivot.count({
                                where: {
                                    couponCode: {
                                        code: {
                                            equals: code,
                                        },
                                    },
                                },
                            });

                        if (maxAmount === couponsWeAlreadyHaveCount) {
                            args.addValidationError('fa:: we maxed out');
                        }
                    }
                }

                // await ctx.context.prisma.CouponPivot.count({
                //     where: {
                //         customer: { is: { name: 'moein' } },
                //     },
                // })
            },
        },
        access: allowAll,
        fields: {
            couponCode: relationship({
                ref: 'Coupon',
                many: false,
                label: 'C.C',
                ui: {
                    labelField: 'code',
                },
            }),
            customer: relationship({
                ref: 'User',
                many: false,
            }),

            status: select({
                type: 'integer',
                options: [
                    {
                        label: 'applied',
                        value: 1,
                    },
                    {
                        label: 'pending',
                        value: 0,
                    },
                ],
            }),
        },
    }),

    Post: list({
        // WARNING
        //   for this starter project, anyone can create, query, update and delete anything
        //   if you want to prevent random people on the internet from accessing your data,
        //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
        access: {
            filter: {
                query: ({ session }: { session: GeneralSession }) => {
                    return {
                        author: {
                            id: {
                                equals: session?.itemId,
                            },
                        },
                    };
                },
                // async query(args) {

                //   const x = await args.context.query.Post.findMany(({
                //     where: {
                //       id: {
                //         equals: "clb1w0tol0014d0loon9kk5n6"
                //       }
                //     }
                //   }))

                //   return true

                // }
                // query(args) {
                //   console.log(999)
                //   return true
                // }
            },
            operation: {
                ...allOperations(allowAll),
                // hint: unconditionally returning `true` is equivalent to using allowAll for this operation
                query: (args) => {
                    // console.log(Math.random())
                    // console.log(args)

                    // (args.session as GeneralSession)?.data.name === 'admin'
                    return true;
                },
            },
        },

        // this is the fields for our Post list
        fields: {
            title: text({ validation: { isRequired: true } }),

            // the document field can be used for making rich editable content
            //   you can find out more at https://keystonejs.com/docs/guides/document-fields
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

            example: persianCalendar(),

            someFieldName: calendarDay({
                defaultValue: '1970-01-01',
                db: { map: 'my_date' },
                validation: { isRequired: true },
                isIndexed: 'unique',
            }),

            // with this field, you can set a User as the author for a Post
            author: relationship({
                // we could have used 'User', but then the relationship would only be 1-way
                ref: 'User.posts',

                // this is some customisations for changing how this will look in the AdminUI
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name', 'email'],
                    inlineEdit: { fields: ['name', 'email'] },
                    linkToItem: true,
                    inlineConnect: true,
                },

                // a Post can only have one author
                //   this is the default, but we show it here for verbosity
                many: false,
            }),

            // with this field, you can add some Tags to Posts
            tags: relationship({
                // we could have used 'Tag', but then the relationship would only be 1-way
                ref: 'Tag.posts',

                // a Post can have many Tags, not just one
                many: true,

                // this is some customisations for changing how this will look in the AdminUI
                ui: {
                    displayMode: 'cards',
                    cardFields: ['name'],
                    inlineEdit: { fields: ['name'] },
                    linkToItem: true,
                    inlineConnect: true,
                    inlineCreate: { fields: ['name'] },
                },
            }),
        },
    }),
    Course: list({
        access: {
            operation: {
                create: isAdmin,
                delete: isAdmin,
                query: isAdmin,
                update: isAdmin,
            }
        },
        // access: allowAll,
        fields: {
            title: text({ validation: { isRequired: true } }),
            participants: relationship({ ref: 'User' }),
            price: integer()
            // ...
        }
    }),

    Category,
    // this last list is our Tag list, it only has a name field for now
    Tag,

    Image: list({
        access: allowAll,
        ui: {
            label: 'media',
            listView: {
                initialColumns: ['image', 'altText'],
            },
            // listView : {
            //   defaultFieldMode : 'hidden'
            // }
        },

        fields: {
            altText: text({ validation: { isRequired: false } }),

            image: image({
                storage: 'local',

                hooks: {
                    // afterOperation: (a) => {
                    // if (a.operation === 'create') {
                    // TODO reduse image size ( probebly with squoosh )
                    //   console.log(a)
                    // }
                    // }
                },
            }),
            uploadedBy: relationship({
                ref: 'User.images',
                many: false,
            }),

            createdAt: timestamp({
                defaultValue: { kind: 'now' },
            }),
        },
        // hooks: {

        //   validateInput: ({ resolvedData, addValidationError }) => {

        //     if (resolvedData.uploadedBy === undefined) {
        //       addValidationError('Uploaded By is not defined')
        //     }
        //   }
        // }
    }),
    Settings,
    CartItem,
    Order,
    OrderItem,
    Product,
};
