import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { integer, relationship, text } from '@keystone-6/core/fields';
// import { isSignedIn, rules } from "../access";
// import { list } from "@keystone-next/keystone/schema";

export const OrderItem = list({
    access: allowAll,
    // {
    //   create: isSignedIn,
    //   read: rules.canManageOrderItems,
    //   update: () => false,
    //   delete: () => false,
    // },
    fields: {
        name: text({ validation: { isRequired: true } }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        // TODO this items has interesting UI filds
        // photo: relationship({
        //   ref: "ProductImage",
        //   ui: {
        //     displayMode: "cards",
        //     cardFields: ["image", "altText"],
        //     inlineCreate: { fields: ["image", "altText"] },
        //     inlineEdit: { fields: ["image", "altText"] },
        //   },
        // }),
        price: integer(),
        quantity: integer(),
        order: relationship({ ref: 'Order.items' }),
    },
});
