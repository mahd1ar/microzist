import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    relationship,
    password,
    text,
    timestamp,
    select,
} from '@keystone-6/core/fields';
import { Roles } from '../data/enums';
// import { permissions, rules } from "../access";

const keys = Object.keys(Roles).filter((i) => Number(i) > -1);
const values = Object.keys(Roles).filter((i) => Number(i) > -1 === false);
const RolesItem = keys.map((key, inx) => ({ value: key, label: values[inx] }));

console.log(RolesItem);

export const User = list({
    access: allowAll,
    ui: {
        // hide the backend UI from regular users
        // TODO deal with this later v
        // hideCreate: (args) => !permissions.canManageUsers(args),
        // hideDelete: (args) => !permissions.canManageUsers(args),
    },
    fields: {
        name: text({ validation: { isRequired: true } }),
        lastName: text({ validation: { isRequired: true } }),

        email: text({
            validation: { isRequired: true },
            // by adding isIndexed: 'unique', we're saying that no user can have the same
            // email as another user - this may or may not be a good idea for your project
            isIndexed: 'unique',
        }),

        password: password({ validation: { isRequired: true } }),
        cart: relationship({
            ref: 'Cart.user',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'read' },
            },
        }),
        orders: relationship({ ref: 'Order.user', many: true }),
        role: select({
            options: RolesItem,
        }),
        courses: relationship({
            ref: 'Course.users',
            many: true,
        }),
        // productImages: relationship({
        //   ref: "ProductImage.user",
        //   many: true,
        // }),

        posts: relationship({ ref: 'Post.author', many: true }),
        images: relationship({ ref: 'Image.uploadedBy', many: true }),

        createdAt: timestamp({
            // this sets the timestamp to Date.now() when the user is first created
            defaultValue: { kind: 'now' },
        }),
    },
});
