"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core17 = require("@keystone-6/core");

// schema.ts
var import_core16 = require("@keystone-6/core");
var import_access17 = require("@keystone-6/core/access");
var import_fields15 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");

// schemas/CartItem.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");

// data/utils.ts
var import_axios = __toESM(require("axios"));
var formatMoney = (money) => {
  const formatter = new Intl.NumberFormat("fa-IR");
  return formatter.format(money);
};
async function kickout(req) {
  if (req?.headers?.userid) {
    const userid = Array.isArray(req.headers.userid) ? req.headers.userid.at(-1) : req.headers.userid;
    await import_axios.default.get("localhost:3030/kick?userid=" + userid);
  }
}
function sendCommand(cmd) {
  console.log(cmd);
}

// schemas/CartItem.ts
var import_schema = require("@graphql-ts/schema");
var isUser = (args) => {
  if (!!args.session === false)
    kickout(args.context.req);
  return !!args.session;
};
var CartItem = (0, import_core.list)({
  access: {
    operation: {
      query: isUser,
      create: isUser,
      delete: isUser,
      update: isUser
    }
  },
  ui: {
    listView: {
      initialColumns: ["type", "cart", "coupon"]
    }
  },
  hooks: {
    async validateInput(args) {
      console.log(args.resolvedData);
      if (args.operation === "update") {
        return;
      }
      if (args.inputData.course === null && args.inputData.event === null)
        args.addValidationError("select course or event");
      if (args.inputData.course && args.inputData.event)
        args.addValidationError('pick one ! "one"');
      const coponId = args.resolvedData?.coupon?.connect?.id;
      const courseId = args.resolvedData?.course?.connect?.id;
      const eventId = args.resolvedData?.event?.connect?.id;
      if (typeof courseId !== "string" && typeof eventId !== "string") {
        args.addValidationError("enter either courseid or itemid");
        return;
      }
      if (coponId) {
        const { remaining, belongsTo } = await args.context.query.Coupon.findOne({
          where: {
            id: coponId
          },
          query: " remaining , belongsTo { id , name } "
        });
        if (!!courseId && !belongsTo.some((i) => i.id === courseId)) {
          args.addValidationError(
            "fa:: the course dosent belong to this coupon"
          );
          return;
        }
        if (remaining === 0) {
          if (args.resolvedData.coupon && args.resolvedData.coupon.disconnect === false)
            args.addValidationError("fa:: there is no coupon left");
        }
        if (args.resolvedData.coupon && args.resolvedData.coupon.disconnect === false) {
          const {
            cart: [firstcart]
          } = await args.context.query.User.findOne({
            where: {
              id: args.context.session?.itemId
            },
            query: "cart { id items { id coupon { id } } }"
          });
          if (firstcart && firstcart.items.map((i) => i.coupon ? i.coupon.id : false).filter(Boolean).includes(coponId))
            args.addValidationError(
              "fa:: you already use this coupon"
            );
        }
      }
    }
  },
  fields: {
    type: (0, import_fields.virtual)({
      field: import_schema.graphql.field({
        type: import_schema.graphql.String,
        resolve: (item) => item.eventId ? "event" : "course"
      })
    }),
    course: (0, import_fields.relationship)({ ref: "Course" }),
    event: (0, import_fields.relationship)({ ref: "Event" }),
    quantity: (0, import_fields.integer)({ defaultValue: 1 }),
    coupon: (0, import_fields.relationship)({ ref: "Coupon", ui: { labelField: "code" } }),
    priceWithDiscount: (0, import_fields.virtual)({
      field: import_schema.graphql.field({
        type: import_schema.graphql.Float,
        async resolve(item, _args, context) {
          try {
            const { course, coupon, event, quantity } = await context.query.CartItem.findOne({
              where: { id: item.id.toString() },
              query: "course {  price , name }, coupon { discount } event {  price , name }, quantity "
            });
            if (event)
              return event.price * quantity;
            if (coupon) {
              return (100 - coupon.discount) * course.price / 100;
            } else
              return course.price;
          } catch (error) {
            return 0;
          }
        }
      })
    }),
    cart: (0, import_fields.relationship)({
      ref: "Cart.items",
      ui: { hideCreate: true }
    })
  }
});

// schemas/Cart.ts
var import_core2 = require("@keystone-6/core");
var import_fields2 = require("@keystone-6/core/fields");
var import_schema2 = require("@graphql-ts/schema");

// data/enums.ts
var Roles = /* @__PURE__ */ ((Roles2) => {
  Roles2["admin"] = "0";
  Roles2["member"] = "50";
  Roles2["subscriber"] = "100";
  return Roles2;
})(Roles || {});
var FileTypes = /* @__PURE__ */ ((FileTypes2) => {
  FileTypes2["image"] = "image";
  FileTypes2["video"] = "video";
  FileTypes2["file"] = "file";
  return FileTypes2;
})(FileTypes || {});

// data/access.ts
function isLoggedIn(args) {
  if (!!args.session === false)
    kickout(args.context.req);
  return !!args.session;
}
function isAdmin(args) {
  return isLoggedIn(args) && args.context.session.data.role === "0" /* admin */;
}

// schemas/Cart.ts
var Cart = (0, import_core2.list)({
  access: {
    operation: {
      query: isLoggedIn,
      create: isLoggedIn,
      delete: isLoggedIn,
      update: isLoggedIn
    }
  },
  ui: {
    listView: {
      initialColumns: ["summery", "user"]
    }
  },
  fields: {
    summery: (0, import_fields2.virtual)({
      field: import_schema2.graphql.field({
        type: import_schema2.graphql.String,
        async resolve(item, _args, context) {
          const { items } = await context.query.Cart.findOne({
            where: { id: item.id.toString() },
            query: "items { course { name } event { name } }"
          });
          return items.map((i) => i.event?.name || "").filter(Boolean).join(" . ") + items.map((i) => i.course?.name || "").filter(Boolean).join(" . ");
        }
      })
    }),
    items: (0, import_fields2.relationship)({
      ref: "CartItem.cart",
      many: true,
      label: "cart items"
    }),
    user: (0, import_fields2.relationship)({ ref: "User.cart", many: false }),
    totalPrice: (0, import_fields2.virtual)({
      field: import_schema2.graphql.field({
        type: import_schema2.graphql.Float,
        async resolve(item, _, context) {
          const { items } = await context.query.Cart.findOne({
            where: { id: item.id.toString() },
            query: "items { priceWithDiscount }"
          });
          console.log(items);
          return items.reduce(
            (total, { priceWithDiscount }) => total += priceWithDiscount,
            0
          );
        }
      })
    }),
    isCompleted: (0, import_fields2.checkbox)({ defaultValue: false })
  }
});

// schemas/Order.ts
var import_core3 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Order = (0, import_core3.list)({
  access: import_access2.allowAll,
  fields: {
    totalCost: (0, import_fields3.float)(),
    items: (0, import_fields3.relationship)({ ref: "OrderItem.order", many: true }),
    user: (0, import_fields3.relationship)({ ref: "User.orders" }),
    paymentStatus: (0, import_fields3.select)({
      type: "integer",
      options: [
        {
          label: "pending",
          value: 0
        },
        {
          label: "paid",
          value: 1
        },
        {
          label: "failed",
          value: -1
        }
      ],
      defaultValue: 0
    }),
    orderDate: (0, import_fields3.timestamp)({ defaultValue: { kind: "now" } })
  },
  ui: {
    isHidden: process.env.NODE_ENV === "production"
  }
});

// schemas/OrderItem.ts
var import_core4 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var OrderItem = (0, import_core4.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    description: (0, import_fields4.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    course: (0, import_fields4.relationship)({
      ref: "Course",
      ui: {
        labelField: "name"
      }
    }),
    price: (0, import_fields4.integer)(),
    order: (0, import_fields4.relationship)({ ref: "Order.items" })
  }
});

// schemas/Course.ts
var import_fields5 = require("@keystone-6/core/fields");
var import_core5 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_schema3 = require("@graphql-ts/schema");
var Course = (0, import_core5.list)({
  access: {
    operation: {
      ...(0, import_access4.allOperations)(import_access4.allowAll),
      create: isLoggedIn
    },
    filter: {
      query: (args) => {
        if (args.session && args.session?.data.role === "0")
          return true;
        else
          return {
            status: {
              equals: "DRAFT"
            }
          };
      }
    }
  },
  fields: {
    name: (0, import_fields5.text)({ validation: { isRequired: true } }),
    description: (0, import_fields5.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    status: (0, import_fields5.select)({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" }
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" }
      }
    }),
    price: (0, import_fields5.integer)(),
    priceFa: (0, import_fields5.virtual)({
      field: import_schema3.graphql.field({
        type: import_schema3.graphql.String,
        async resolve(item) {
          return `${formatMoney(item.price)}`;
        }
      })
    }),
    users: (0, import_fields5.relationship)({
      ref: "User.courses",
      many: true,
      hooks: {
        resolveInput({ operation, resolvedData, context }) {
          if (operation === "create" && !resolvedData.users && context.session?.itemId) {
            return { connect: { id: context.session?.itemId } };
          }
          return resolvedData.users;
        }
      },
      ui: {
        hideCreate: true
      }
    }),
    courseItem: (0, import_fields5.relationship)({
      ref: "CourseItem.course",
      many: true,
      ui: {
        labelField: "name",
        inlineCreate: {
          fields: ["CourseItem.name", "CourseItem.description"]
        }
      }
    }),
    isAccessible: (0, import_fields5.virtual)({
      ui: {
        createView: {
          fieldMode: "hidden"
        }
      },
      field: import_schema3.graphql.field({
        type: import_schema3.graphql.Boolean,
        async resolve(item, _, context) {
          if (!context.session)
            return false;
          const { users } = await context.query.Course.findOne({
            where: { id: item.id.toString() },
            query: "users { id }"
          });
          if (users.length === 0) {
            return false;
          }
          if (context.session.itemId === users[0].id)
            return true;
          return false;
        }
      })
    })
  }
});

// schemas/CourseItems.ts
var import_fields6 = require("@keystone-6/core/fields");
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var CourseItem = (0, import_core6.list)({
  access: {
    operation: {
      ...(0, import_access6.allOperations)(import_access6.allowAll),
      create: isLoggedIn
    }
  },
  fields: {
    no: (0, import_fields6.integer)({ validation: { min: 1 } }),
    name: (0, import_fields6.text)({ validation: { isRequired: true } }),
    description: (0, import_fields6.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    video: (0, import_fields6.relationship)({
      ref: "File"
    }),
    course: (0, import_fields6.relationship)({
      label: "belongs to",
      ref: "Course.courseItem",
      ui: {
        labelField: "name"
      }
    }),
    comments: (0, import_fields6.relationship)({
      ref: "Comment.courseItem",
      many: true,
      ui: {}
    })
  }
});

// schemas/User.ts
var import_core7 = require("@keystone-6/core");
var import_access8 = require("@keystone-6/core/access");
var import_fields7 = require("@keystone-6/core/fields");
var keys = Object.keys(Roles).filter((i) => Number(i) > -1);
var values = Object.keys(Roles).filter((i) => Number(i) > -1 === false);
var RolesItem = keys.map((key, inx) => ({ value: key, label: values[inx] }));
var User = (0, import_core7.list)({
  access: {
    operation: {
      ...(0, import_access8.allOperations)(isAdmin),
      query: () => true
    }
  },
  ui: {},
  fields: {
    name: (0, import_fields7.text)({ validation: { isRequired: true } }),
    lastName: (0, import_fields7.text)({ validation: { isRequired: true } }),
    email: (0, import_fields7.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields7.password)({ validation: { isRequired: true } }),
    cart: (0, import_fields7.relationship)({
      ref: "Cart.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" }
      }
    }),
    orders: (0, import_fields7.relationship)({ ref: "Order.user", many: true }),
    role: (0, import_fields7.select)({
      options: RolesItem
    }),
    courses: (0, import_fields7.relationship)({
      ref: "Course.users",
      many: true
    }),
    events: (0, import_fields7.relationship)({
      ref: "Event.users",
      many: true
    }),
    posts: (0, import_fields7.relationship)({ ref: "Post.author", many: true }),
    comments: (0, import_fields7.relationship)({ ref: "Comment.user", many: true }),
    createdAt: (0, import_fields7.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/Categoryy.ts
var import_core8 = require("@keystone-6/core");
var import_access10 = require("@keystone-6/core/access");
var import_fields8 = require("@keystone-6/core/fields");
var Category = (0, import_core8.list)({
  access: import_access10.allowAll,
  fields: {
    name: (0, import_fields8.text)({
      validation: { isRequired: true }
    }),
    description: (0, import_fields8.text)(),
    parentId: (0, import_fields8.relationship)({
      ref: "Category",
      many: true,
      isFilterable: true,
      label: "parent categoury"
    })
  }
});

// schemas/Settings.ts
var import_core9 = require("@keystone-6/core");
var import_access11 = require("@keystone-6/core/access");
var import_fields9 = require("@keystone-6/core/fields");
var Settings = (0, import_core9.list)({
  access: import_access11.allowAll,
  isSingleton: true,
  fields: {
    websiteName: (0, import_fields9.text)(),
    copyrightText: (0, import_fields9.text)(),
    highlightedPosts: (0, import_fields9.relationship)({ ref: "Post", many: true }),
    jobsList: (0, import_fields9.multiselect)({ options: [{ label: "1", value: "1" }, { label: "2", value: "2" }] })
  },
  graphql: {
    plural: "ManySettings"
  }
});

// schemas/File.ts
var import_core10 = require("@keystone-6/core");
var import_access12 = require("@keystone-6/core/access");
var import_fields10 = require("@keystone-6/core/fields");
var File = (0, import_core10.list)({
  access: import_access12.allowAll,
  ui: {
    label: "media"
  },
  hooks: {
    async resolveInput({ resolvedData, operation }) {
      if (resolvedData.video && resolvedData.video.filename) {
        if (!resolvedData.type) {
          if (["mp4", "mpa", "mov", "avi", "wmv"].includes(
            resolvedData.video.filename.split(".").at(-1).toLowerCase()
          )) {
            resolvedData.type = "video";
          }
        }
      }
      return resolvedData;
    }
  },
  fields: {
    altText: (0, import_fields10.text)({ validation: { isRequired: false } }),
    video: (0, import_fields10.file)({
      storage: "local"
    }),
    type: (0, import_fields10.select)({
      options: Object.keys(FileTypes)
    }),
    createdAt: (0, import_fields10.timestamp)({
      defaultValue: { kind: "now" },
      ui: {}
    })
  }
});

// schemas/Tag.ts
var import_core11 = require("@keystone-6/core");
var import_access13 = require("@keystone-6/core/access");
var import_fields11 = require("@keystone-6/core/fields");
var Tag = (0, import_core11.list)({
  access: import_access13.allowAll,
  ui: {
    isHidden: true
  },
  fields: {
    name: (0, import_fields11.text)(),
    posts: (0, import_fields11.relationship)({ ref: "Post.tags", many: true })
  }
});

// schemas/Coupon.ts
var import_schema4 = require("@graphql-ts/schema");
var import_core12 = require("@keystone-6/core");
var import_access14 = require("@keystone-6/core/access");
var import_fields12 = require("@keystone-6/core/fields");
var Coupon = (0, import_core12.list)({
  access: import_access14.allowAll,
  fields: {
    code: (0, import_fields12.integer)({ validation: { isRequired: true, max: 9999 } }),
    description: (0, import_fields12.text)({ validation: { isRequired: true } }),
    maxAmount: (0, import_fields12.integer)({ validation: { isRequired: true } }),
    remaining: (0, import_fields12.virtual)({
      field: import_schema4.graphql.field({
        type: import_schema4.graphql.Int,
        async resolve({ id, maxAmount }, _, context) {
          try {
            const currentlyInUse = await context.query.CartItem.count({
              where: {
                coupon: {
                  id: { equals: id }
                }
              }
            });
            return maxAmount - currentlyInUse;
          } catch (error) {
            console.error(error);
            return maxAmount;
          }
        }
      })
    }),
    belongsTo: (0, import_fields12.relationship)({
      ref: "Course",
      many: true,
      ui: {
        description: "\u0686\u0647 \u0645\u062D\u0635\u0648\u0644\u0627\u062A\u06CC \u0631\u0627 \u0634\u0627\u0645\u0644 \u0645\u06CC\u0634\u0648\u062F"
      }
    }),
    discount: (0, import_fields12.integer)({
      validation: {
        max: 90,
        min: 5
      }
    })
  }
});

// schemas/Event.ts
var import_schema5 = require("@graphql-ts/schema");
var import_core14 = require("@keystone-6/core");
var import_access15 = require("@keystone-6/core/access");
var import_fields13 = require("@keystone-6/core/fields");

// src/custom-fields/persian-calander/index.ts
var import_types = require("@keystone-6/core/types");
var import_core13 = require("@keystone-6/core");
var persianCalendar = ({
  isIndexed,
  Jcalandar = "2022-12-03",
  ...config2
} = {}) => (meta) => (0, import_types.fieldType)({
  kind: "scalar",
  mode: "optional",
  scalar: "String",
  index: isIndexed === true ? "index" : isIndexed || void 0
})({
  ...config2,
  hooks: {
    ...config2.hooks,
    async validateInput(args) {
      console.log("validation input:");
      console.log(args.resolvedData[meta.fieldKey]);
      const val = args.resolvedData[meta.fieldKey];
      if (args.operation === "create") {
        if (val === "" || val === void 0) {
          args.addValidationError(
            `The value must be within the range of 0-${Jcalandar}`
          );
        }
      }
      await config2.hooks?.validateInput?.(args);
    }
  },
  input: {
    create: {
      arg: import_core13.graphql.arg({ type: import_core13.graphql.String }),
      resolve(val, context) {
        if (val === null) {
          return null;
        }
        if (val === void 0) {
          return void 0;
        }
        return val;
      }
    },
    update: { arg: import_core13.graphql.arg({ type: import_core13.graphql.String }) },
    orderBy: { arg: import_core13.graphql.arg({ type: import_types.orderDirectionEnum }) }
  },
  output: import_core13.graphql.field({
    type: import_core13.graphql.String,
    resolve({ value, item }, args, context, info) {
      return value;
    }
  }),
  views: "./src/custom-fields/persian-calander/views",
  getAdminMeta() {
    return { Jcalandar };
  }
});

// schemas/Event.ts
var Event = (0, import_core14.list)({
  access: import_access15.allowAll,
  fields: {
    name: (0, import_fields13.text)({
      validation: { isRequired: true }
    }),
    description: (0, import_fields13.text)({ ui: { displayMode: "textarea" } }),
    price: (0, import_fields13.integer)(),
    priceFa: (0, import_fields13.virtual)({
      field: import_schema5.graphql.field({
        type: import_schema5.graphql.String,
        async resolve(item) {
          return `${formatMoney(item.price)}`;
        }
      })
    }),
    status: (0, import_fields13.select)({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" }
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" }
      }
    }),
    maxAmount: (0, import_fields13.integer)(),
    from: persianCalendar(),
    to: persianCalendar(),
    users: (0, import_fields13.relationship)({
      ref: "User.events",
      many: true,
      hooks: {
        resolveInput({ operation, resolvedData, context }) {
          if (operation === "create" && !resolvedData.users && context.session?.itemId) {
            return { connect: { id: context.session?.itemId } };
          }
          return resolvedData.users;
        }
      },
      ui: {
        hideCreate: true
      }
    }),
    isAccessible: (0, import_fields13.virtual)({
      field: import_schema5.graphql.field({
        type: import_schema5.graphql.Boolean,
        async resolve(item, _, context) {
          if (!context.session)
            return false;
          const { users } = await context.query.Event.findOne({
            where: { id: item.id.toString() },
            query: "users { id }"
          });
          if (users.length === 0) {
            return false;
          }
          if (context.session.itemId === users[0].id)
            return true;
          return false;
        }
      })
    })
  }
});

// schemas/social/Comment.ts
var import_core15 = require("@keystone-6/core");
var import_fields14 = require("@keystone-6/core/fields");
var defaultValidatedValue = true;
var Comment = (0, import_core15.list)({
  access: {
    operation: {
      query: isLoggedIn,
      create: isLoggedIn,
      delete: isAdmin,
      update: isAdmin
    }
  },
  hooks: {
    resolveInput: ({ resolvedData, context }) => {
      if (context.session?.data.role === "0" /* admin */) {
        if (!resolvedData.user)
          resolvedData.user = {
            connect: {
              id: context.session?.itemId
            }
          };
        return resolvedData;
      }
      resolvedData.user = {
        connect: { id: context.session?.itemId }
      };
      resolvedData.isValidated = defaultValidatedValue;
      return resolvedData;
    }
  },
  fields: {
    comment: (0, import_fields14.text)({ validation: { isRequired: true } }),
    user: (0, import_fields14.relationship)({ ref: "User.comments", many: false }),
    courseItem: (0, import_fields14.relationship)({ ref: "CourseItem.comments" }),
    isValidated: (0, import_fields14.checkbox)({ defaultValue: defaultValidatedValue }),
    createdAt: (0, import_fields14.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schema.ts
var lists = {
  User,
  Coupon,
  Event,
  Post: (0, import_core16.list)({
    access: {
      filter: {
        query: ({ session: session2 }) => {
          return {
            author: {
              id: {
                equals: session2?.itemId
              }
            }
          };
        }
      },
      operation: {
        ...(0, import_access17.allOperations)(import_access17.allowAll),
        query: (args) => {
          return true;
        }
      }
    },
    fields: {
      title: (0, import_fields15.text)({ validation: { isRequired: true } }),
      content: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true,
        relationships: {
          mention: {
            listKey: "User",
            label: "Mention",
            selection: "id name"
          }
        }
      }),
      example: persianCalendar(),
      someFieldName: (0, import_fields15.calendarDay)({
        defaultValue: "1970-01-01",
        db: { map: "my_date" },
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      author: (0, import_fields15.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      tags: (0, import_fields15.relationship)({
        ref: "Tag.posts",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  }),
  Course,
  CourseItem,
  Category,
  Tag,
  File,
  Settings,
  CartItem,
  Cart,
  Order,
  OrderItem,
  Comment
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");

// email/resetpassword.ts
var import_nodemailer = __toESM(require("nodemailer"));
var import_path = __toESM(require("path"));
var import_nodemailer_express_handlebars = __toESM(require("nodemailer-express-handlebars"));
async function sendResetPasswordEmail(ctx) {
  let transporter = import_nodemailer.default.createTransport({
    host: "mail.nikan-alumni.org",
    port: 465,
    secure: true,
    auth: {
      user: "nikpeyvand@nikan-alumni.org",
      pass: "P@ssw0rd110121"
    }
  });
  const options = {
    extName: ".hbs",
    viewPath: import_path.default.resolve(__dirname, "./email-templates"),
    viewEngine: {
      defaultLayout: false
    }
  };
  transporter.use("compile", (0, import_nodemailer_express_handlebars.default)(options));
  let info = await transporter.sendMail({
    from: '"from nikan" <test@nikan-alumni.org>',
    to: ctx.identity,
    subject: "Hello \u2714 world",
    text: "Hello world?",
    template: "resetpassword",
    context: {
      ...ctx,
      resetlink: `http://localhost:5173/reset-password?email=${encodeURIComponent(
        ctx.identity
      )}&token=${ctx.token}`
    }
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", import_nodemailer.default.getTestMessageUrl(info));
}

// auth.ts
var sessionSecret = "ABCDEFGH1234567887654321HGFEDCBA";
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name role createdAt",
  secretField: "password",
  passwordResetLink: {
    sendToken: async ({ identity, itemId, token }) => {
      await sendResetPasswordEmail({
        itemId,
        identity,
        token
      });
    },
    tokensValidForMins: 60
  },
  initFirstItem: {
    fields: ["name", "lastName", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// storage.ts
var baseUrl = "http://localhost:3030";
var storage = {
  local: {
    kind: "local",
    type: "file",
    generateUrl: (path2) => `${baseUrl}/files${path2}`,
    serverRoute: {
      path: "/files"
    },
    storagePath: "public/files"
  }
};

// keystone.ts
var import_ws = __toESM(require("ws"));
var import_body_parser = __toESM(require("body-parser"));
var import_lodash = require("lodash");
var Zibal = require("zibal");
var wss;
var keystone_default = withAuth(
  (0, import_core17.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session,
    storage,
    graphql: {
      playground: true
    },
    server: {
      cors: { origin: ["http://localhost:5173"], credentials: true },
      port: 3030,
      extendExpressApp: (app, ctx) => {
        app.use(import_body_parser.default.json());
        app.use((req, res, next) => {
          const path2 = req.path;
          next();
        });
        app.post("/auth-item", async (req, res) => {
          console.log(!!ctx.session ? "loggedin" : "not loggedin");
          if (ctx.session) {
            const session2 = ctx.session;
            try {
              const user = await ctx.prisma.User.findUnique(
                {
                  where: {
                    id: session2?.itemId
                  }
                }
              );
              res.json(user);
            } catch (error) {
              res.send(void 0);
              console.error(error);
            }
          } else
            res.send(void 0);
        });
        app.get("/test", async (req, res) => {
          try {
            console.log(
              ctx.prisma._hasPreviewFlag(
                "interactiveTransactions"
              )
            );
            await ctx.prisma.$transaction(async (tx) => {
              const x = await tx.prisma.Coupon.update({
                where: { id: "clcuazkb30048jglof25krj2v" },
                data: { code: 7278 }
              });
              return x;
            });
            res.send("hi\u{1F612}");
          } catch (error) {
            console.log("WHAT THE FUCK?");
            console.log(error);
            res.send(String(error));
          }
        });
        app.delete(
          "/cart-item",
          async (req, res) => {
            if (!req.body.cartid || typeof req.body.cartid !== "string") {
              res.status(400).json({
                ok: false,
                message: "bad request"
              });
              return;
            }
            if (!ctx.session) {
              res.status(400).send({
                ok: false,
                message: "you dont have proper access"
              });
              sendCommand({
                action: "logout",
                message: "session expoire"
              });
              return;
            }
            const cartid = req.body.cartid;
            try {
              const deletedCart = await ctx.prisma.CartItem.delete({
                where: {
                  id: cartid
                }
              });
              res.json({
                ok: true,
                message: "fa :: deleted successfuly " + deletedCart.id
              });
            } catch (error) {
              console.log(error);
              res.status(500).json({
                ok: false,
                message: "something went wrong"
              });
              sendCommand({
                action: "show_message",
                message: "something went wrong",
                type: "error"
              });
            }
          }
        );
        app.post(
          "/cart-item",
          async (req, res) => {
            const courseId = req.body.cid;
            const eventId = req.body.eventid;
            const productType = eventId ? "event" : "course";
            const productID = eventId || courseId;
            const productName = eventId ? "fa:: Event " : "Fa:: Course ";
            if (courseId && eventId) {
              res.status(400).json({
                ok: false,
                message: "bad request"
              });
              return;
            }
            if ((!courseId || typeof courseId !== "string") && (!eventId || typeof eventId !== "string")) {
              res.status(400).json({
                ok: false,
                message: "bad request"
              });
              return;
            }
            if (!ctx.session) {
              res.status(400).send({
                ok: false,
                message: "you dont have proper access"
              });
              sendCommand({
                action: "logout",
                message: "session expoire"
              });
              return;
            }
            const session2 = ctx.session;
            try {
              let cartId;
              const [cart] = await ctx.query.Cart.findMany({
                where: {
                  user: {
                    id: {
                      equals: session2?.itemId
                    }
                  },
                  AND: {
                    isCompleted: {
                      equals: false
                    }
                  }
                },
                query: `id
                                        items {
                                            ${productType} {
                                                id
                                            }
                                        }`
              });
              if (cart) {
                cartId = cart.id;
                if (cart.items.map(
                  (i) => (0, import_lodash.get)(i, `${productType}.id`, "")
                ).filter(Boolean).includes(productID)) {
                  res.json({
                    ok: false,
                    message: productName + " already added"
                  });
                  return;
                }
                const newCartItem = await ctx.prisma.CartItem.create({
                  data: {
                    [productType]: {
                      connect: {
                        id: productID
                      }
                    },
                    cart: {
                      connect: {
                        id: cartId
                      }
                    }
                  }
                });
              } else {
                const newCart = await ctx.prisma.Cart.create({
                  data: {
                    user: {
                      connect: {
                        id: session2?.itemId
                      }
                    },
                    items: {
                      create: {
                        [productType]: {
                          connect: {
                            id: productID
                          }
                        }
                      }
                    }
                  }
                });
                cartId = newCart.id;
              }
            } catch (error) {
              console.error(error);
              res.status(400).json({
                ok: false,
                message: "someting went wrong"
              });
              return;
            }
            res.status(201).json({ ok: true, message: "created" });
          }
        );
        app.get(
          "/coupon",
          async (req, res) => {
            if (!req.query.id || typeof req.query.id !== "string") {
              res.status(403).json({
                ok: false,
                message: "bad request"
              });
              return;
            }
            if (!req.query.cartitem || typeof req.query.cartitem !== "string") {
              res.status(403).json({
                ok: false,
                message: "bad request"
              });
              return;
            }
            const cartitem = req.query.cartitem;
            const couponCode = Number(req.query.id);
            if (!couponCode) {
              res.status(403).json({
                ok: false,
                message: "coupon is not valid"
              });
              return;
            }
            try {
              const [coupon] = await ctx.query.Coupon.findMany({
                where: {
                  code: { equals: couponCode }
                },
                query: "id code remaining"
              });
              if (!coupon || !coupon.id) {
                res.status(403).json({
                  ok: false,
                  message: "coupon dosent exists"
                });
                return;
              }
              await ctx.db.CartItem.updateOne({
                where: {
                  id: cartitem
                },
                data: {
                  coupon: {
                    connect: {
                      id: coupon.id
                    }
                  }
                }
              });
              res.json({ ok: true, message: "success full" });
            } catch (error) {
              res.json({
                ok: false,
                message: "operation not successfull"
              });
            }
          }
        );
        app.get("/ipg/cb", async (req, res) => {
          try {
            const sudoContext = ctx.sudo();
            const cartId = req.query.orderId;
            if (typeof cartId === "string") {
              throw new Error("error in params");
            }
            const {
              totalPrice,
              user: { id: userId },
              items,
              isCompleted
            } = await sudoContext.query.Cart.findOne({
              where: {
                id: cartId
              },
              query: " totalPrice user { id } items { id priceWithDiscount course {id} } isCompleted"
            });
            if (isCompleted) {
              res.status(400).send(
                "fa:: purtes already compeleted"
              );
              return;
            }
            const cartItem = items.map(
              (i) => {
                return {
                  name: "hi there",
                  course: { connect: { id: i.course.id } },
                  price: i.priceWithDiscount
                };
              }
            );
            const newOrder = await sudoContext.query.Order.createOne({
              data: {
                totalCost: totalPrice,
                paymentStatus: 1,
                user: {
                  connect: {
                    id: userId
                  }
                },
                items: {
                  create: cartItem
                }
              }
            });
            await sudoContext.query.Cart.updateOne({
              where: {
                id: cartId
              },
              data: {
                isCompleted: true
              }
            });
            res.send("orderid is => " + newOrder.id);
            sudoContext.exitSudo();
          } catch (error) {
            console.log(error);
            res.send(error);
          }
        });
        app.get(
          "/checkout",
          async (req, res) => {
            if (!ctx.session) {
              res.status(400).json({
                ok: false,
                message: "fa:: session expires login agin"
              });
              return;
            }
            const zibal = new Zibal({
              merchant: "zibal",
              callbackUrl: "http://localhost:3030/ipg/cb"
            });
            try {
              const [{ totalPrice, id: cartid }] = await ctx.query.Cart.findMany({
                where: {
                  user: {
                    id: {
                      equals: ctx.session?.itemId
                    }
                  }
                },
                query: " totalPrice id"
              });
              const response = await zibal.request({
                amount: 2e5,
                orderId: cartid,
                merchant: "zibal",
                callbackUrl: "http://localhost:3030/ipg/cb",
                mobile: "09102124368",
                description: "THIS IS MY DESCRIPTION",
                allowedCards: ["5022291092719457"],
                linkToPay: false,
                sms: false
              });
              res.redirect(response.paymentUrl);
            } catch (error) {
              console.error(error);
              res.status(500).send(error);
            }
          }
        );
        app.get("/kick", (req, res) => {
          if (wss && req.query.userid && !Array.isArray(req.query.userid)) {
            wss.clients.forEach((ws) => {
              const data = JSON.stringify({
                event: "kickout",
                payload: req.query.userid
              });
              ws.send(data);
            });
          }
          res.send("ok");
        });
      },
      extendHttpServer: (httpServer, commonContext, graphqlSchema) => {
        wss = new import_ws.default.WebSocketServer({
          server: httpServer,
          path: "/ws"
        });
        wss.on("connection", function connection(ws) {
          ws.on("message", function message(data) {
            console.log("received: %s", data);
          });
          ws.send("websocket connected");
        });
      }
    }
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
