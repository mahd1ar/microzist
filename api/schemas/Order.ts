import { graphql } from '@graphql-ts/schema';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { integer, relationship, text, virtual } from '@keystone-6/core/fields';
// import { isSignedIn, rules } from "../access";
import { formatMoney } from "../data/utils"

export const Order = list({
  access: allowAll,
  // TODO: adjust access for god sakes
  // {
  // create: isSignedIn,
  // read: rules.canOrder,
  // update: () => false,
  // delete: () => false,
  // },
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          // @ts-ignore
          return `${formatMoney(item.total)}`;
        },
      })
      // graphQLReturnType: "String",
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});
