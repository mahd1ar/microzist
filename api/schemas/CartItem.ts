import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { BaseAccessArgs } from '@keystone-6/core/dist/declarations/src/types/config/access-control';
import { checkbox, integer, relationship } from '@keystone-6/core/fields';
import { BaseListTypeInfo } from '@keystone-6/core/types';
import { GeneralSession } from '../data/types';
// import { rules, isSignedIn } from "../access";
import { GraphQLError } from 'graphql';
import { kickout } from '../data/utils';

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
            initialColumns: ['course', 'user'],
        },
    },
    fields: {
        // quantity: integer({
        //     defaultValue: 1,
        //     validation: {
        //         isRequired: true,
        //     },
        // }),
        course: relationship({ ref: 'Course', many: true }),
        user: relationship({ ref: 'User.cart' }),
        isCompleted: checkbox({ defaultValue: false })
    },
});
