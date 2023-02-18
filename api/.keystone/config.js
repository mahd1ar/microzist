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
var import_core18 = require("@keystone-6/core");
var import_body_parser = __toESM(require("body-parser"));
var import_lodash = require("lodash");
var import_ws = __toESM(require("ws"));

// auth.ts
var import_crypto = require("crypto");
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
var sessionSecret = "ABCDEFGH1234567887654321HGFEDCBZ";
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
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

// schema.ts
var import_core17 = require("@keystone-6/core");
var import_access18 = require("@keystone-6/core/access");
var import_fields15 = require("@keystone-6/core/fields");
var import_fields_document2 = require("@keystone-6/fields-document");

// schemas/CartItem.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_schema = require("@graphql-ts/schema");
var isUser = (args) => {
  if (!!args.session === false)
    kickout(args.context.req);
  return !!args.session;
};
var CartItem = (0, import_core.list)({
  access: {
    operation: {
      ...(0, import_access.allOperations)(isUser),
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
    cart: (0, import_fields.relationship)({
      ref: "Cart.items",
      ui: { hideCreate: true }
    }),
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
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Order = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    totalCost: (0, import_fields3.float)(),
    items: (0, import_fields3.relationship)({ ref: "OrderItem.order", many: true }),
    trackId: (0, import_fields3.text)(),
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
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var OrderItem = (0, import_core4.list)({
  access: import_access4.allowAll,
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
    event: (0, import_fields4.relationship)({
      ref: "Event",
      ui: {
        labelField: "name"
      }
    }),
    quantity: (0, import_fields4.integer)({ defaultValue: 1 }),
    price: (0, import_fields4.integer)(),
    order: (0, import_fields4.relationship)({ ref: "Order.items" })
  }
});

// schemas/Course.ts
var import_fields5 = require("@keystone-6/core/fields");
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_schema3 = require("@graphql-ts/schema");
var Course = (0, import_core5.list)({
  access: {
    operation: {
      ...(0, import_access5.allOperations)(import_access5.allowAll),
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
var import_access7 = require("@keystone-6/core/access");
var CourseItem = (0, import_core6.list)({
  access: {
    operation: {
      ...(0, import_access7.allOperations)(import_access7.allowAll),
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
var import_access9 = require("@keystone-6/core/access");
var import_fields7 = require("@keystone-6/core/fields");
var keys = Object.keys(Roles).filter((i) => Number(i) > -1);
var values = Object.keys(Roles).filter((i) => Number(i) > -1 === false);
var RolesItem = keys.map((key, inx) => ({ value: key, label: values[inx] }));
var User = (0, import_core7.list)({
  access: {
    operation: {
      ...(0, import_access9.allOperations)(isAdmin),
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
var import_access11 = require("@keystone-6/core/access");
var import_fields8 = require("@keystone-6/core/fields");
var Category = (0, import_core8.list)({
  access: import_access11.allowAll,
  fields: {
    name: (0, import_fields8.text)({
      validation: { isRequired: true }
    }),
    description: (0, import_fields8.text)(),
    priority: (0, import_fields8.integer)({
      defaultValue: 0
    }),
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
var import_access12 = require("@keystone-6/core/access");
var import_fields9 = require("@keystone-6/core/fields");
var Settings = (0, import_core9.list)({
  access: import_access12.allowAll,
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
var import_access13 = require("@keystone-6/core/access");
var import_fields10 = require("@keystone-6/core/fields");
var File = (0, import_core10.list)({
  access: import_access13.allowAll,
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
var import_access14 = require("@keystone-6/core/access");
var import_fields11 = require("@keystone-6/core/fields");
var Tag = (0, import_core11.list)({
  access: import_access14.allowAll,
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
var import_access15 = require("@keystone-6/core/access");
var import_fields12 = require("@keystone-6/core/fields");
var Coupon = (0, import_core12.list)({
  access: import_access15.allowAll,
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
var import_core15 = require("@keystone-6/core");
var import_access16 = require("@keystone-6/core/access");
var import_fields13 = require("@keystone-6/core/fields");

// schemas/component-blocks/hero.tsx
var import_core13 = require("@keystone-ui/core");
var import_component_blocks = require("@keystone-6/fields-document/component-blocks");
var hero = (0, import_component_blocks.component)({
  label: "Hero",
  schema: {
    imageSrc: import_component_blocks.fields.text({
      label: "Image URL",
      defaultValue: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
    }),
    caption: import_component_blocks.fields.conditional(import_component_blocks.fields.checkbox({ label: "Has caption" }), {
      false: import_component_blocks.fields.empty(),
      true: import_component_blocks.fields.child({
        kind: "block",
        placeholder: "Write a caption...",
        formatting: "inherit",
        links: "inherit"
      })
    })
  },
  preview: function Hero(props) {
    return /* @__PURE__ */ (0, import_core13.jsx)("div", null, /* @__PURE__ */ (0, import_core13.jsx)(import_component_blocks.NotEditable, null, /* @__PURE__ */ (0, import_core13.jsx)(
      "div",
      {
        css: {
          backgroundImage: `url(${props.fields.imageSrc.value})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          minHeight: 200,
          width: "100%"
        }
      }
    )), props.fields.caption.discriminant ? /* @__PURE__ */ (0, import_core13.jsx)("div", { css: { textAlign: "center" } }, props.fields.caption.value.element) : null);
  }
});

// schemas/component-blocks/index.tsx
var componentBlocks = {
  hero
};

// src/custom-fields/persian-calander/index.ts
var import_types = require("@keystone-6/core/types");
var import_core14 = require("@keystone-6/core");
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
      arg: import_core14.graphql.arg({ type: import_core14.graphql.String }),
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
    update: { arg: import_core14.graphql.arg({ type: import_core14.graphql.String }) },
    orderBy: { arg: import_core14.graphql.arg({ type: import_types.orderDirectionEnum }) }
  },
  output: import_core14.graphql.field({
    type: import_core14.graphql.String,
    resolve({ value, item }, args, context, info) {
      return value;
    }
  }),
  views: "./src/custom-fields/persian-calander/views",
  getAdminMeta() {
    return { Jcalandar };
  }
});

// data/lib/wordifyfa/toEnglishDigits.ts
function toEnglishDigits(num) {
  if (num === null || num === void 0) {
    return "";
  }
  if (typeof num !== "string" || num.length === 0)
    return num.toString();
  const faDigits = "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9";
  const arDigits = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
  let output = "";
  for (let ipos = 0; ipos < num.length; ipos++) {
    let faIndex = faDigits.indexOf(num[ipos]);
    if (faIndex >= 0) {
      output += faIndex.toString();
      continue;
    }
    let arIndex = arDigits.indexOf(num[ipos]);
    if (arIndex >= 0) {
      output += arIndex.toString();
      continue;
    }
    output += num[ipos];
  }
  return output.replace(/,/g, "");
}

// data/lib/wordifyfa/index.ts
function wordifyfa(input, level = 0) {
  if (input === null) {
    return "";
  }
  let num = parseInt(toEnglishDigits(input));
  if (num < 0) {
    num = num * -1;
    return "\u0645\u0646\u0641\u06CC " + wordifyfa(num, level);
  }
  if (num === 0) {
    if (level === 0) {
      return "\u0635\u0641\u0631";
    } else {
      return "";
    }
  }
  let result = "";
  const yekan = ["\u06CC\u06A9", "\u062F\u0648", "\u0633\u0647", "\u0686\u0647\u0627\u0631", "\u067E\u0646\u062C", "\u0634\u0634", "\u0647\u0641\u062A", "\u0647\u0634\u062A", "\u0646\u0647"], dahgan = ["\u0628\u06CC\u0633\u062A", "\u0633\u06CC", "\u0686\u0647\u0644", "\u067E\u0646\u062C\u0627\u0647", "\u0634\u0635\u062A", "\u0647\u0641\u062A\u0627\u062F", "\u0647\u0634\u062A\u0627\u062F", "\u0646\u0648\u062F"], sadgan = ["\u06CC\u06A9\u0635\u062F", "\u062F\u0648\u06CC\u0633\u062A", "\u0633\u06CC\u0635\u062F", "\u0686\u0647\u0627\u0631\u0635\u062F", "\u067E\u0627\u0646\u0635\u062F", "\u0634\u0634\u0635\u062F", "\u0647\u0641\u062A\u0635\u062F", "\u0647\u0634\u062A\u0635\u062F", "\u0646\u0647\u0635\u062F"], dah = ["\u062F\u0647", "\u06CC\u0627\u0632\u062F\u0647", "\u062F\u0648\u0627\u0632\u062F\u0647", "\u0633\u06CC\u0632\u062F\u0647", "\u0686\u0647\u0627\u0631\u062F\u0647", "\u067E\u0627\u0646\u0632\u062F\u0647", "\u0634\u0627\u0646\u0632\u062F\u0647", "\u0647\u0641\u062F\u0647", "\u0647\u06CC\u062C\u062F\u0647", "\u0646\u0648\u0632\u062F\u0647"];
  if (level > 0) {
    result += " \u0648 ";
    level -= 1;
  }
  if (num < 10) {
    result += yekan[num - 1];
  } else if (num < 20) {
    result += dah[num - 10];
  } else if (num < 100) {
    result += dahgan[Math.floor(num / 10) - 2] + wordifyfa(num % 10, level + 1);
  } else if (num < 1e3) {
    result += sadgan[Math.floor(num / 100) - 1] + wordifyfa(num % 100, level + 1);
  } else if (num < 1e6) {
    result += wordifyfa(Math.floor(num / 1e3), level) + " \u0647\u0632\u0627\u0631" + wordifyfa(num % 1e3, level + 1);
  } else if (num < 1e9) {
    result += wordifyfa(Math.floor(num / 1e6), level) + " \u0645\u06CC\u0644\u06CC\u0648\u0646" + wordifyfa(num % 1e6, level + 1);
  } else if (num < 1e12) {
    result += wordifyfa(Math.floor(num / 1e9), level) + " \u0645\u06CC\u0644\u06CC\u0627\u0631\u062F" + wordifyfa(num % 1e9, level + 1);
  } else if (num < 1e15) {
    result += wordifyfa(Math.floor(num / 1e12), level) + " \u062A\u0631\u06CC\u0644\u06CC\u0627\u0631\u062F" + wordifyfa(num % 1e12, level + 1);
  }
  return result;
}
function wordifyRials(num) {
  if (num === null || num === void 0 || num === "") {
    return "";
  }
  return wordifyfa(num, 0) + " \u0631\u06CC\u0627\u0644";
}
function wordifyRialsInTomans(num) {
  if (num === null || num === void 0 || num === "") {
    return "";
  }
  if (typeof num == "string") {
    var cleanNumber = toEnglishDigits(num);
    num = parseInt(cleanNumber);
  }
  const originalAmount = num;
  if (num >= 10 || num <= -10) {
    num = Math.floor(num / 10);
  } else {
    num = 0;
  }
  const haveRial = (originalAmount / 10).toString().split(".")[1];
  return (num ? wordifyfa(num, 0) + " \u062A\u0648\u0645\u0627\u0646" : "") + (num && haveRial ? " \u0648 " : "") + (haveRial ? `${wordifyfa(haveRial, 0)} \u0631\u06CC\u0627\u0644` : "");
}
function momentApprox(date, baseDate, suffixBefore = "\u067E\u06CC\u0634", suffixAfter = "\u0628\u0639\u062F") {
  return wordifyMomentApprox(date, baseDate, suffixBefore, suffixAfter, false);
}
function wordifyMomentApprox(date, baseDate, suffixBefore = "\u067E\u06CC\u0634", suffixAfter = "\u0628\u0639\u062F", doWordify = true) {
  if (date === null || date === void 0 || date === "") {
    return "";
  }
  if (baseDate == null || baseDate == void 0 || baseDate == "") {
    baseDate = new Date();
  }
  if (typeof date == "string") {
    date = new Date(date);
  }
  if (typeof baseDate == "string") {
    baseDate = new Date(baseDate);
  }
  let suffix = suffixBefore;
  let diff = Math.floor((baseDate.getTime() - date.getTime()) / 1e3) * 1e3;
  if (diff < 0) {
    suffix = suffixAfter;
    diff = Math.abs(diff);
  }
  let diffYears = Math.floor(diff / 315576e5);
  if (diffYears > 0) {
    return (doWordify ? wordifyfa(diffYears) : diffYears) + " \u0633\u0627\u0644 " + suffix;
  }
  let diffMonths = Math.floor(diff / 26298e5);
  if (diffMonths > 0) {
    return (doWordify ? wordifyfa(diffMonths) : diffMonths) + " \u0645\u0627\u0647 " + suffix;
  }
  let diffWeeks = Math.floor(diff / 6048e5);
  if (diffWeeks > 0) {
    return (doWordify ? wordifyfa(diffWeeks) : diffWeeks) + " \u0647\u0641\u062A\u0647 " + suffix;
  }
  let diffDays = Math.floor(diff / 864e5);
  if (diffDays > 0) {
    return (doWordify ? wordifyfa(diffDays) : diffDays) + " \u0631\u0648\u0632 " + suffix;
  }
  let diffHours = Math.floor(diff / 36e5);
  if (diffHours > 0) {
    return (doWordify ? wordifyfa(diffHours) : diffHours) + " \u0633\u0627\u0639\u062A " + suffix;
  }
  let diffMinutes = Math.floor(diff / 6e4);
  if (diffMinutes > 0) {
    return (doWordify ? wordifyfa(diffMinutes) : diffMinutes) + " \u062F\u0642\u06CC\u0642\u0647 " + suffix;
  }
  let diffSeconds = Math.floor(diff / 1e3);
  if (diffSeconds > 0) {
    return "\u0686\u0646\u062F \u0644\u062D\u0638\u0647 " + suffix;
  }
  return "\u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647";
}
(function() {
  if (typeof window !== "undefined") {
    window["wordifyfa"] = wordifyfa;
    window["wordifyRials"] = wordifyRials;
    window["wordifyRialsInTomans"] = wordifyRialsInTomans;
    window["wordifyMomentApprox"] = wordifyMomentApprox;
    window["momentApprox"] = momentApprox;
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports["wordifyfa"] = wordifyfa;
    module.exports["wordifyRials"] = wordifyRials;
    module.exports["wordifyRialsInTomans"] = wordifyRialsInTomans;
    module.exports["wordifyMomentApprox"] = wordifyMomentApprox;
    module.exports["momentApprox"] = momentApprox;
  } else if (typeof define === "function" && define.amd) {
    define(() => wordifyfa);
    define(() => wordifyRials);
    define(() => wordifyRialsInTomans);
    define(() => wordifyMomentApprox);
    define(() => momentApprox);
  }
})();

// schemas/Event.ts
var import_fields_document = require("@keystone-6/fields-document");
var Event = (0, import_core15.list)({
  access: import_access16.allowAll,
  fields: {
    name: (0, import_fields13.text)({
      validation: { isRequired: true }
    }),
    description: (0, import_fields13.text)({ ui: { displayMode: "textarea" } }),
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
      },
      ui: {
        views: "./schemas/component-blocks"
      },
      componentBlocks
    }),
    price: (0, import_fields13.integer)(),
    priceFa: (0, import_fields13.virtual)({
      field: import_schema5.graphql.field({
        type: import_schema5.graphql.String,
        async resolve(item) {
          return item.price ? `${wordifyfa(item.price)} \u062A\u0648\u0645\u0627\u0646 ` : "\u0631\u0627\u06CC\u06AF\u0627\u0646";
        }
      })
    }),
    maxAmount: (0, import_fields13.integer)({ validation: { isRequired: true } }),
    remaining: (0, import_fields13.virtual)({
      field: import_schema5.graphql.field({
        type: import_schema5.graphql.Int,
        async resolve({ id, maxAmount }, _, context) {
          try {
            const currentlyInUse = await context.query.User.count({
              where: { events: { some: { id: { equals: id } } } }
            });
            return maxAmount - currentlyInUse;
          } catch (error) {
            console.error(error);
            return maxAmount;
          }
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
    from: persianCalendar(),
    to: persianCalendar(),
    location: (0, import_fields13.text)(),
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
var import_core16 = require("@keystone-6/core");
var import_fields14 = require("@keystone-6/core/fields");
var defaultValidatedValue = true;
var Comment = (0, import_core16.list)({
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
  Post: (0, import_core17.list)({
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
        ...(0, import_access18.allOperations)(import_access18.allowAll),
        query: (args) => {
          return true;
        }
      }
    },
    fields: {
      title: (0, import_fields15.text)({ validation: { isRequired: true } }),
      content: (0, import_fields_document2.document)({
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
var import_axios2 = __toESM(require("axios"));
var import_qs = __toESM(require("qs"));
var Zibal = require("zibal");
var wss;
var keystone_default = withAuth(
  (0, import_core18.config)({
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
        app.get("/test", async (req, res) => {
          try {
            res.send("test url");
          } catch (error) {
            console.log("WHAT THE FUCK?");
            console.log(error);
            res.send(String(error));
          }
        });
        app.post("/signup", async (req, res) => {
          const hcaptchaResponse = req.body.token;
          const secret = process.env.NODE_ENV === "production" ? "0x724D577DcAB12A7C40baF7a310113A1e00eC1878" : "0x0000000000000000000000000000000000000000";
          const url = "https://cors.nikan-alumni.com/https://hcaptcha.com/siteverify";
          if (!req.body.firstname || !req.body.firstname.trim() || !req.body.lastname || !req.body.lastname.trim()) {
            res.status(400).json({
              message: "fa::firstname_or_lastname_is_empty",
              ok: false
            });
            return;
          }
          if (!req.body.token || !req.body.token.trim()) {
            res.status(400).json({
              message: "fa::captcha_empty",
              ok: false
            });
            return;
          }
          if (!req.body.email || !req.body.email.trim()) {
            res.status(400).json({
              message: "fa::email_empty",
              ok: false
            });
            return;
          }
          if (!req.body.password || !req.body.password.trim()) {
            res.status(400).json({
              message: "fa::password_empty",
              ok: false
            });
            return;
          } else {
            if (req.body.password !== req.body["re-password"]) {
              res.status(400).json({
                message: "fa::password_confirm_mismatch",
                ok: false
              });
              return;
            }
          }
          const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
          };
          const axiosData = {
            secret,
            response: hcaptchaResponse
          };
          console.log("here");
          const response = await import_axios2.default.post(
            url,
            import_qs.default.stringify(axiosData),
            {
              headers
            }
          );
          if (!response.data.success) {
            res.status(400).json({
              message: "fa::hcaptcha_validation_error",
              ok: false
            });
            return;
          }
          const sudoContext = await ctx.sudo();
          try {
            const newuser = await sudoContext.query.User.createOne({
              data: {
                name: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                password: req.body.password
              },
              query: "id name lastName email"
            });
            res.json({
              message: "fa::user_created",
              ok: true,
              paylod: { newuser }
            });
          } catch (error) {
            if (String(error).search(
              "Unique constraint failed on the fields"
            ) > -1) {
              res.status(400).json({
                message: "fa::duplicate_email",
                ok: false
              });
              return;
            }
            console.log("error:");
            console.log(error);
            res.status(400).json({
              message: "SOMTHING WENT WRON",
              ok: false
            });
          } finally {
            sudoContext.exitSudo();
          }
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
            const callbackUrl = "http://localhost:3030/ipg/cb";
            const zibal = new Zibal({
              merchant: "zibal",
              callbackUrl
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
              if (totalPrice === 0) {
                const urlSearchParams = new URLSearchParams();
                const zibalqueryParams = {
                  success: "1",
                  orderId: cartid,
                  status: "2",
                  trackId: "0"
                };
                for (let [key, value] of Object.entries(
                  zibalqueryParams
                ))
                  urlSearchParams.append(key, value);
                const url = callbackUrl + "?" + urlSearchParams.toString();
                res.redirect(url);
                return;
              }
              const response = await zibal.request({
                amount: totalPrice,
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
        app.get("/ipg/cb", async (req, res) => {
          if (req.query.success === "0") {
            res.sendStatus(500).send("fa:: zbal error!");
            return;
          }
          try {
            const sudoContext = ctx.sudo();
            const cartId = req.query.orderId;
            const trackId = req.query.trackId;
            if (typeof cartId !== "string" || typeof trackId !== "string") {
              throw new Error("error in params");
              return;
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
              query: `totalPrice
                                    user { id } 
                                    items { 
                                        id
                                        priceWithDiscount 
                                        course { id } 
                                        event { id } 
                                    }
                                    isCompleted`
            });
            if (isCompleted) {
              res.status(400).send(
                "fa:: purtes already compeleted"
              );
              return;
            }
            const cartItem = items.map(
              (i) => {
                const productType = i.event ? "event" : "course";
                const productId = i.event?.id || i.course?.id;
                const productTypePlural = i.event ? "events" : "courses";
                return {
                  productType,
                  productId,
                  productTypePlural,
                  price: i.priceWithDiscount
                };
              }
            );
            const newOrder = await sudoContext.query.Order.createOne({
              data: {
                totalCost: totalPrice,
                paymentStatus: 1,
                trackId,
                user: {
                  connect: {
                    id: userId
                  }
                },
                items: {
                  create: cartItem.map((i) => {
                    return {
                      name: i.price === 0 ? "free event" : "hi there",
                      [i.productType]: {
                        connect: {
                          id: i.productId
                        }
                      },
                      price: i.price
                    };
                  })
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
            await sudoContext.query.User.updateMany({
              data: cartItem.map((i) => {
                return {
                  where: {
                    id: userId
                  },
                  data: {
                    [i.productTypePlural]: {
                      connect: { id: i.productId }
                    }
                  }
                };
              })
            });
            res.send("orderid is => " + newOrder.id);
            sudoContext.exitSudo();
          } catch (error) {
            console.log(error);
            res.send(error);
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
