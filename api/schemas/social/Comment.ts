import { list } from '@keystone-6/core';
import {
    checkbox,
    integer,
    relationship,
    text,
    timestamp,
} from '@keystone-6/core/fields';
import { isAdmin, isLoggedIn } from '../../data/access';
import { Roles } from '../../data/enums';
import { GeneralSession } from '../../data/types';
const defaultValidatedValue = true;
export const Comment = list({
    // TODO [security concern] filter by session id
    access: {
        operation: {
            query: isLoggedIn,
            create: isLoggedIn,
            delete: isAdmin,
            update: isAdmin,
        },
    },
    hooks: {
        resolveInput: ({ resolvedData, context }) => {

            if (

                (context.session as GeneralSession)?.data.role === Roles.admin
            ) {
                if (!resolvedData.user)
                    resolvedData.user = {
                        connect: {
                            id: (context.session as GeneralSession)?.itemId,
                        },
                    };

                return resolvedData;
            }

            resolvedData.user = {
                connect: { id: (context.session as GeneralSession)?.itemId },
            };
            resolvedData.isValidated = defaultValidatedValue;
            return resolvedData;
        },
    },
    fields: {
        comment: text({ validation: { isRequired: true } }),
        user: relationship({ ref: 'User.comments', many: false }),
        course: relationship({ ref: 'Course.comments' }),
        courseItem: relationship({ ref: 'CourseItem.comments' }),
        isValidated: checkbox({ defaultValue: defaultValidatedValue }),
        rate: integer({ defaultValue: -1, validation: { min: -1, max: 5 } }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
            // ui: {
            //     createView: {
            //         fieldMode: 'hidden',
            //     },
            // },
        }),
    },
});
