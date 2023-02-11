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
    File,
    Tag,
    CartItem,
    Cart,
    Order,
    OrderItem,
    Course,
    CourseItem,
    Coupon,
    Comment,
    Event,
} from './schemas';

import { persianCalendar } from './src/custom-fields/persian-calander';

export const lists: Lists = {
    User,
    Coupon,
    Event,

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
    Course,
    CourseItem,
    Category,
    // this last list is our Tag list, it only has a name field for now
    Tag,

    File,
    Settings,
    CartItem,
    Cart,
    Order,
    OrderItem,
    Comment,
};
