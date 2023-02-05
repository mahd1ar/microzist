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
var import_core14 = require("@keystone-6/core");

// schema.ts
var import_core13 = require("@keystone-6/core");
var import_access12 = require("@keystone-6/core/access");
var import_fields12 = require("@keystone-6/core/fields");
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
      initialColumns: ["course", "cart", "coupon"]
    }
  },
  hooks: {
    async validateInput(args) {
      if (args.operation === "create") {
        if (args.inputData.course === null)
          args.addValidationError("course is required");
      }
      const coponId = args.item?.couponId || args.resolvedData?.coupon?.connect?.id;
      const courseId = args.item?.course || args.resolvedData?.course?.connect?.id;
      if (coponId) {
        const { remaining, belongsTo } = await args.context.query.Coupon.findOne({
          where: {
            id: coponId
          },
          query: " remaining , belongsTo { id , name } "
        });
        if (!!courseId && !belongsTo.some((i) => i.id === courseId))
          args.addValidationError(
            "fa:: the course dosent belong to this coupon"
          );
        if (remaining === 0) {
          args.addValidationError("fa:: there is no coupon left");
        }
      }
    }
  },
  fields: {
    course: (0, import_fields.relationship)({ ref: "Course" }),
    coupon: (0, import_fields.relationship)({ ref: "Coupon", ui: { labelField: "code" } }),
    priceWithDiscount: (0, import_fields.virtual)({
      field: import_schema.graphql.field({
        type: import_schema.graphql.Float,
        async resolve(item, _args, context) {
          try {
            const { course, coupon } = await context.query.CartItem.findOne({
              where: { id: item.id.toString() },
              query: "course {  price , name }, coupon { discount }"
            });
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
      ref: "Cart.items"
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

// data/access.ts
function isLoggedIn(args) {
  if (!!args.session === false)
    kickout(args.context.req);
  return !!args.session;
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
            query: "items { course { name } }"
          });
          return items.map((i) => i.course.name).join(" & ");
        }
      })
    }),
    items: (0, import_fields2.relationship)({
      ref: "CartItem.cart",
      many: true,
      label: "cart items"
    }),
    user: (0, import_fields2.relationship)({ ref: "User.cart", many: false }),
    priceFa: (0, import_fields2.virtual)({
      field: import_schema2.graphql.field({
        type: import_schema2.graphql.String,
        async resolve(item, _, ctx) {
          return "badan";
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
    total: (0, import_fields3.integer)(),
    totalCost: (0, import_fields3.integer)(),
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
      }
    }),
    isAccessible: (0, import_fields5.virtual)({
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

// schemas/User.ts
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var keys = Object.keys(Roles).filter((i) => Number(i) > -1);
var values = Object.keys(Roles).filter((i) => Number(i) > -1 === false);
var RolesItem = keys.map((key, inx) => ({ value: key, label: values[inx] }));
console.log(RolesItem);
var User = (0, import_core6.list)({
  access: import_access6.allowAll,
  ui: {},
  fields: {
    name: (0, import_fields6.text)({ validation: { isRequired: true } }),
    lastName: (0, import_fields6.text)({ validation: { isRequired: true } }),
    email: (0, import_fields6.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields6.password)({ validation: { isRequired: true } }),
    cart: (0, import_fields6.relationship)({
      ref: "Cart.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" }
      }
    }),
    orders: (0, import_fields6.relationship)({ ref: "Order.user", many: true }),
    role: (0, import_fields6.select)({
      options: RolesItem
    }),
    courses: (0, import_fields6.relationship)({
      ref: "Course.users",
      many: true
    }),
    posts: (0, import_fields6.relationship)({ ref: "Post.author", many: true }),
    images: (0, import_fields6.relationship)({ ref: "Image.uploadedBy", many: true }),
    createdAt: (0, import_fields6.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/Categoryy.ts
var import_core7 = require("@keystone-6/core");
var import_access7 = require("@keystone-6/core/access");
var import_fields7 = require("@keystone-6/core/fields");
var Category = (0, import_core7.list)({
  access: import_access7.allowAll,
  fields: {
    name: (0, import_fields7.text)({
      validation: { isRequired: true }
    }),
    description: (0, import_fields7.text)(),
    parentId: (0, import_fields7.relationship)({
      ref: "Category",
      many: true,
      isFilterable: true,
      label: "parent categoury"
    })
  }
});

// schemas/Settings.ts
var import_core8 = require("@keystone-6/core");
var import_access8 = require("@keystone-6/core/access");
var import_fields8 = require("@keystone-6/core/fields");
var Settings = (0, import_core8.list)({
  access: import_access8.allowAll,
  isSingleton: true,
  fields: {
    websiteName: (0, import_fields8.text)(),
    copyrightText: (0, import_fields8.text)(),
    highlightedPosts: (0, import_fields8.relationship)({ ref: "Post", many: true }),
    jobsList: (0, import_fields8.multiselect)({ options: [{ label: "1", value: "1" }, { label: "2", value: "2" }] })
  },
  graphql: {
    plural: "ManySettings"
  }
});

// schemas/Image.ts
var import_core9 = require("@keystone-6/core");
var import_access9 = require("@keystone-6/core/access");
var import_fields9 = require("@keystone-6/core/fields");
var Image = (0, import_core9.list)({
  access: import_access9.allowAll,
  ui: {
    label: "media"
  },
  fields: {
    altText: (0, import_fields9.text)({ validation: { isRequired: false } }),
    image: (0, import_fields9.image)({
      storage: "local",
      hooks: {}
    }),
    uploadedBy: (0, import_fields9.relationship)({
      ref: "User.images",
      many: false
    }),
    createdAt: (0, import_fields9.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/Tag.ts
var import_core10 = require("@keystone-6/core");
var import_access10 = require("@keystone-6/core/access");
var import_fields10 = require("@keystone-6/core/fields");
var Tag = (0, import_core10.list)({
  access: import_access10.allowAll,
  ui: {
    isHidden: true
  },
  fields: {
    name: (0, import_fields10.text)(),
    posts: (0, import_fields10.relationship)({ ref: "Post.tags", many: true })
  }
});

// schemas/Coupon.ts
var import_schema4 = require("@graphql-ts/schema");
var import_core11 = require("@keystone-6/core");
var import_access11 = require("@keystone-6/core/access");
var import_fields11 = require("@keystone-6/core/fields");
var Coupon = (0, import_core11.list)({
  access: import_access11.allowAll,
  fields: {
    code: (0, import_fields11.integer)({ validation: { isRequired: true, max: 9999 } }),
    description: (0, import_fields11.text)({ validation: { isRequired: true } }),
    maxAmount: (0, import_fields11.integer)({ validation: { isRequired: true } }),
    remaining: (0, import_fields11.virtual)({
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
    belongsTo: (0, import_fields11.relationship)({
      ref: "Course",
      many: true,
      ui: {
        description: "\u0686\u0647 \u0645\u062D\u0635\u0648\u0644\u0627\u062A\u06CC \u0631\u0627 \u0634\u0627\u0645\u0644 \u0645\u06CC\u0634\u0648\u062F"
      }
    }),
    discount: (0, import_fields11.integer)({
      validation: {
        max: 90,
        min: 5
      }
    }),
    couponItem: (0, import_fields11.relationship)({
      ref: "CouponPivot",
      many: true,
      ui: {}
    })
  }
});

// src/custom-fields/persian-calander/index.ts
var import_types = require("@keystone-6/core/types");
var import_core12 = require("@keystone-6/core");
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
      if (val === "" || val === void 0) {
        args.addValidationError(`The value must be within the range of 0-${Jcalandar}`);
      }
      await config2.hooks?.validateInput?.(args);
    }
  },
  input: {
    create: {
      arg: import_core12.graphql.arg({ type: import_core12.graphql.String }),
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
    update: { arg: import_core12.graphql.arg({ type: import_core12.graphql.String }) },
    orderBy: { arg: import_core12.graphql.arg({ type: import_types.orderDirectionEnum }) }
  },
  output: import_core12.graphql.field({
    type: import_core12.graphql.String,
    resolve({ value, item }, args, context, info) {
      return value;
    }
  }),
  views: "./src/custom-fields/persian-calander/views",
  getAdminMeta() {
    return { Jcalandar };
  }
});

// schema.ts
var lists = {
  User,
  Coupon,
  CouponPivot: (0, import_core13.list)({
    ui: {
      listView: {
        initialColumns: ["couponCode", "customer", "status"]
      }
    },
    hooks: {
      validateInput: async (args) => {
        if (args.operation === "create") {
          if (!args.resolvedData.customer) {
            args.addValidationError(
              "fa:: customer cannot be empty"
            );
            return;
          }
          if (!args.resolvedData.couponCode) {
            args.addValidationError(
              "fa:: coupon Code cannot be empty"
            );
          } else {
            const id = args.resolvedData.couponCode.connect.id;
            const { code, maxAmount } = await args.context.query.Coupon.findOne({
              where: { id },
              query: "code maxAmount"
            });
            const numberOfCouponsPerProduct = await args.context.query.CouponPivot.count({
              where: {
                customer: {
                  id: {
                    equals: args.inputData.customer?.connect?.id
                  }
                },
                couponCode: {
                  code: {
                    equals: code
                  }
                }
              }
            });
            if (numberOfCouponsPerProduct > 0) {
              args.addValidationError(
                "fa:: you already have one"
              );
              return;
            }
            const couponsWeAlreadyHaveCount = await args.context.query.CouponPivot.count({
              where: {
                couponCode: {
                  code: {
                    equals: code
                  }
                }
              }
            });
            if (maxAmount === couponsWeAlreadyHaveCount) {
              args.addValidationError("fa:: we maxed out");
            }
          }
        }
      }
    },
    access: import_access12.allowAll,
    fields: {
      couponCode: (0, import_fields12.relationship)({
        ref: "Coupon",
        many: false,
        label: "C.C",
        ui: {
          labelField: "code"
        }
      }),
      customer: (0, import_fields12.relationship)({
        ref: "User",
        many: false
      }),
      status: (0, import_fields12.select)({
        type: "integer",
        options: [
          {
            label: "applied",
            value: 1
          },
          {
            label: "pending",
            value: 0
          }
        ]
      })
    }
  }),
  Post: (0, import_core13.list)({
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
        ...(0, import_access12.allOperations)(import_access12.allowAll),
        query: (args) => {
          return true;
        }
      }
    },
    fields: {
      title: (0, import_fields12.text)({ validation: { isRequired: true } }),
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
      someFieldName: (0, import_fields12.calendarDay)({
        defaultValue: "1970-01-01",
        db: { map: "my_date" },
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      author: (0, import_fields12.relationship)({
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
      tags: (0, import_fields12.relationship)({
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
  Category,
  Tag,
  Image: (0, import_core13.list)({
    access: import_access12.allowAll,
    ui: {
      label: "media",
      listView: {
        initialColumns: ["image", "altText"]
      }
    },
    fields: {
      altText: (0, import_fields12.text)({ validation: { isRequired: false } }),
      image: (0, import_fields12.image)({
        storage: "local",
        hooks: {}
      }),
      uploadedBy: (0, import_fields12.relationship)({
        ref: "User.images",
        many: false
      }),
      createdAt: (0, import_fields12.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Settings,
  CartItem,
  Cart,
  Order,
  OrderItem
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
      user: "test@nikan-alumni.org",
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
      resetlink: `http://localhost:5173/reset-password?email=${encodeURIComponent(ctx.identity)}&token=${ctx.token}`
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
var baseUrl = "http://localhost:3000";
var storage = {
  "local": {
    kind: "local",
    type: "image",
    generateUrl: (path2) => `${baseUrl}/images${path2}`,
    serverRoute: {
      path: "/images"
    },
    storagePath: "public/images"
  }
};

// keystone.ts
var import_ws = __toESM(require("ws"));
var Zibal = require("zibal");
var wss;
var keystone_default = withAuth(
  (0, import_core14.config)({
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
        app.post("/auth-item", async (req, res) => {
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
        app.get(
          "/delete-from-cart",
          async (req, res) => {
            if (!req.query.cartid || typeof req.query.cartid !== "string") {
              res.status(403).json({
                ok: false,
                message: "bad request"
              });
              return;
            }
            const cartid = req.query.cartid;
            if (!ctx.session) {
              res.status(403).send({
                ok: false,
                message: "you dont have proper access"
              });
              return;
            }
            try {
              const deletedCart = await ctx.prisma.CartItem.delete({
                where: {
                  id: cartid
                }
              });
              res.json({
                ok: true,
                message: "deleted successfuly " + deletedCart.id
              });
            } catch (error) {
              console.log(error);
              res.json({
                ok: false,
                message: "something went wrong"
              });
            }
          }
        );
        app.get(
          "/add-to-cart",
          async (req, res) => {
            if (!req.query.cid || typeof req.query.cid !== "string") {
              res.status(403).json({
                ok: false,
                message: "bad request"
              });
              return;
            }
            if (!ctx.session) {
              res.status(403).send({
                ok: false,
                message: "you dont have proper access"
              });
              return;
            }
            const courseId = req.query.cid;
            const session2 = ctx.session;
            try {
              let cartId;
              const [cart] = await ctx.query.Cart.findMany({
                where: {
                  user: {
                    id: {
                      equals: "cldbbw0rl0711z8hbnfbetvkl"
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
                                            course {
                                                id
                                            }
                                        }`
              });
              if (cart.items.map((i) => i.course.id).includes(courseId)) {
                res.json({
                  ok: false,
                  message: "course already added"
                });
                return;
              }
              if (cart) {
                cartId = cart.id;
                const newCartItem = await ctx.prisma.CartItem.create({
                  data: {
                    course: {
                      connect: {
                        id: courseId
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
                        course: {
                          connect: {
                            id: courseId
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
              res.json({
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
              res.json({
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
              if (!coupon.id) {
                res.json({
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
        app.get(
          "/ipg/cb2",
          async (req, res) => {
            try {
              const cartInfo = await ctx.prisma.Cart.findUnique({
                where: {
                  id: "cldiz4yin0632n0lok698fe3d"
                },
                include: {
                  user: true,
                  items: {
                    select: { course: true, id: true }
                  }
                }
              });
              const purchasedCourses = cartInfo.items.map(
                (i) => i.course.id
              );
              console.log(purchasedCourses);
              console.log(cartInfo);
            } catch (error) {
              console.log(error);
              res.json({
                ok: false,
                message: "operation NOT successfull"
              });
            }
            return;
            const CARTID = "cldiz4yin0632n0lok698fe3d";
            try {
              const cartInfo = await ctx.prisma.Cart.findUnique({
                where: {
                  id: CARTID
                },
                include: {
                  user: true,
                  items: {
                    select: { course: true, id: true }
                  }
                }
              });
              const purchasedCourses = cartInfo.items.map(
                (i) => i.course.id
              );
              res.json({ ok: true, message: "successFull" });
            } catch (error) {
              console.log(error);
              res.json({ ok: false, message: "NOTsuccessfull" });
            }
          }
        );
        app.get("/ipg/cb", async (req, res) => {
          try {
            const cartItemId = "clcoo3fd65168ishbph5ij0pe";
            const cartItem = await ctx.prisma.CartItem.findUnique({
              where: { id: cartItemId },
              include: { user: true, course: true }
            });
            if (cartItem.isCompleted) {
              res.status(200).send(
                "purchase is already completed"
              );
              return;
            }
            const orderItemPromises = cartItem.course.map(({ price, id }) => {
              return ctx.prisma.OrderItem.create({
                data: {
                  name: "kooft",
                  description: "bemiri",
                  price,
                  course: {
                    connect: {
                      id
                    }
                  }
                }
              });
            });
            const cartItemResolvedDB = await Promise.allSettled(orderItemPromises);
            const order = await ctx.prisma.Order.create({
              data: {
                total: cartItemResolvedDB.length,
                totalCost: cartItem.course.reduce(
                  (accumulator, currentValue) => accumulator += currentValue.price,
                  0
                ),
                items: {
                  connect: cartItemResolvedDB.map(
                    (i) => i.status === "fulfilled" ? i.value.id : null
                  ).filter((i) => !!i).map((i) => ({ id: i }))
                },
                user: {
                  connect: { id: cartItem.userId }
                },
                paymentStatus: cartItemResolvedDB.some(
                  (i) => i.status === "rejected"
                ) ? -1 : 1
              }
            });
            const orderItemPromisesDB = cartItemResolvedDB.map(
              (i) => {
                if (i.status === "fulfilled")
                  return ctx.prisma.OrderItem.update({
                    where: {
                      id: i.value.id
                    },
                    data: {
                      order: {
                        connect: { id: order.id }
                      }
                    }
                  });
                else
                  return null;
              }
            );
            await Promise.allSettled(orderItemPromisesDB);
            await ctx.prisma.CartItem.update({
              where: {
                id: cartItemId
              },
              data: {
                isCompleted: true
              }
            });
            cartItem.course.forEach(async (course) => {
              await ctx.prisma.Course.update({
                where: {
                  id: course.id
                },
                data: {
                  users: {
                    connect: {
                      id: cartItem.userId
                    }
                  }
                }
              });
            });
            res.send("successful");
          } catch (error) {
            console.log(error);
            res.send(error);
          }
        });
        app.get("/payment", async (req, res) => {
          try {
            if (!ctx.session) {
              throw new Error("session has expired");
            }
            const zibal = new Zibal({
              merchant: "zibal",
              callbackUrl: "http://localhost:3030/ipg/cb"
            });
            try {
              const response = await zibal.request({
                amount: 2e5,
                orderId: "ZBL-aaaa",
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
          } catch (error) {
            console.log(error);
            res.status(500).send(String(error));
          }
        });
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
