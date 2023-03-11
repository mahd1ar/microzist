import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { calendarDay, relationship, text } from '@keystone-6/core/fields';
import { Session } from '../data/types';
import { document } from '@keystone-6/fields-document';
import { persianCalendar } from '../src/custom-fields/persian-calander';
import { isAdmin } from '../data/access';
import { Roles } from '../data/enums';

export const Post = list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: {
        filter: {
            query: ({ session }: { session: Session }) => {
                if (session?.data.role === Roles.admin) return true;
                return {
                    author: {
                        id: {
                            equals: session?.itemId,
                        },
                    },
                };
            },
        },
        operation: {
            ...allOperations(isAdmin),
            // hint: unconditionally returning `true` is equivalent to using allowAll for this operation
            query: () => true,
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
});
