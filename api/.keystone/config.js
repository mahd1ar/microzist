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
var import_core12 = require("@keystone-6/core");

// schema.ts
var import_core11 = require("@keystone-6/core");
var import_access10 = require("@keystone-6/core/access");
var import_fields10 = require("@keystone-6/core/fields");
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
      initialColumns: ["course", "user"]
    }
  },
  fields: {
    course: (0, import_fields.relationship)({ ref: "Course", many: true }),
    user: (0, import_fields.relationship)({ ref: "User.cart" }),
    isCompleted: (0, import_fields.checkbox)({ defaultValue: false })
  }
});

// schemas/Order.ts
var import_schema = require("@graphql-ts/schema");
var import_core2 = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Order = (0, import_core2.list)({
  access: import_access.allowAll,
  fields: {
    label: (0, import_fields2.virtual)({
      field: import_schema.graphql.field({
        type: import_schema.graphql.String,
        resolve(item) {
          return `${formatMoney(item.total)}`;
        }
      })
    }),
    total: (0, import_fields2.integer)(),
    items: (0, import_fields2.relationship)({ ref: "OrderItem.order", many: true }),
    user: (0, import_fields2.relationship)({ ref: "User.orders" }),
    paymentStatus: (0, import_fields2.select)({
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
      ]
    }),
    orderDate: (0, import_fields2.timestamp)({ defaultValue: { kind: "now" } })
  },
  ui: {
    isHidden: process.env.NODE_ENV === "production"
  }
});

// schemas/OrderItem.ts
var import_core3 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var OrderItem = (0, import_core3.list)({
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields3.text)({ validation: { isRequired: true } }),
    description: (0, import_fields3.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    course: (0, import_fields3.relationship)({
      ref: "Course",
      ui: {
        labelField: "name"
      }
    }),
    price: (0, import_fields3.integer)(),
    order: (0, import_fields3.relationship)({ ref: "Order.items" })
  }
});

// schemas/Course.ts
var import_fields4 = require("@keystone-6/core/fields");
var import_core4 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");

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

// schemas/Course.ts
var Course = (0, import_core4.list)({
  access: {
    operation: {
      ...(0, import_access3.allOperations)(import_access3.allowAll),
      create: isLoggedIn
    }
  },
  fields: {
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    description: (0, import_fields4.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    status: (0, import_fields4.select)({
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
    price: (0, import_fields4.integer)(),
    users: (0, import_fields4.relationship)({
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
    })
  }
});

// schemas/User.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var keys = Object.keys(Roles).filter((i) => Number(i) > -1);
var values = Object.keys(Roles).filter((i) => Number(i) > -1 === false);
var RolesItem = keys.map((key, inx) => ({ value: key, label: values[inx] }));
console.log(RolesItem);
var User = (0, import_core5.list)({
  access: import_access5.allowAll,
  ui: {},
  fields: {
    name: (0, import_fields5.text)({ validation: { isRequired: true } }),
    lastName: (0, import_fields5.text)({ validation: { isRequired: true } }),
    email: (0, import_fields5.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields5.password)({ validation: { isRequired: true } }),
    cart: (0, import_fields5.relationship)({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" }
      }
    }),
    orders: (0, import_fields5.relationship)({ ref: "Order.user", many: true }),
    role: (0, import_fields5.select)({
      options: RolesItem
    }),
    courses: (0, import_fields5.relationship)({
      ref: "Course.users",
      many: true
    }),
    posts: (0, import_fields5.relationship)({ ref: "Post.author", many: true }),
    images: (0, import_fields5.relationship)({ ref: "Image.uploadedBy", many: true }),
    createdAt: (0, import_fields5.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/Categoryy.ts
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var Category = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    name: (0, import_fields6.text)({
      validation: { isRequired: true }
    }),
    description: (0, import_fields6.text)(),
    parentId: (0, import_fields6.relationship)({
      ref: "Category",
      many: true,
      isFilterable: true,
      label: "parent categoury"
    })
  }
});

// schemas/Settings.ts
var import_core7 = require("@keystone-6/core");
var import_access7 = require("@keystone-6/core/access");
var import_fields7 = require("@keystone-6/core/fields");
var Settings = (0, import_core7.list)({
  access: import_access7.allowAll,
  isSingleton: true,
  fields: {
    websiteName: (0, import_fields7.text)(),
    copyrightText: (0, import_fields7.text)(),
    highlightedPosts: (0, import_fields7.relationship)({ ref: "Post", many: true }),
    jobsList: (0, import_fields7.multiselect)({ options: [{ label: "1", value: "1" }, { label: "2", value: "2" }] })
  },
  graphql: {
    plural: "ManySettings"
  }
});

// schemas/Image.ts
var import_core8 = require("@keystone-6/core");
var import_access8 = require("@keystone-6/core/access");
var import_fields8 = require("@keystone-6/core/fields");
var Image = (0, import_core8.list)({
  access: import_access8.allowAll,
  ui: {
    label: "media"
  },
  fields: {
    altText: (0, import_fields8.text)({ validation: { isRequired: false } }),
    image: (0, import_fields8.image)({
      storage: "local",
      hooks: {}
    }),
    uploadedBy: (0, import_fields8.relationship)({
      ref: "User.images",
      many: false
    }),
    createdAt: (0, import_fields8.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/Tag.ts
var import_core9 = require("@keystone-6/core");
var import_access9 = require("@keystone-6/core/access");
var import_fields9 = require("@keystone-6/core/fields");
var Tag = (0, import_core9.list)({
  access: import_access9.allowAll,
  ui: {
    isHidden: true
  },
  fields: {
    name: (0, import_fields9.text)(),
    posts: (0, import_fields9.relationship)({ ref: "Post.tags", many: true })
  }
});

// src/custom-fields/persian-calander/index.ts
var import_types = require("@keystone-6/core/types");
var import_core10 = require("@keystone-6/core");
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
      arg: import_core10.graphql.arg({ type: import_core10.graphql.String }),
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
    update: { arg: import_core10.graphql.arg({ type: import_core10.graphql.String }) },
    orderBy: { arg: import_core10.graphql.arg({ type: import_types.orderDirectionEnum }) }
  },
  output: import_core10.graphql.field({
    type: import_core10.graphql.String,
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
  Coupon: (0, import_core11.list)({
    access: import_access10.allowAll,
    fields: {
      code: (0, import_fields10.integer)({ validation: { isRequired: true, max: 9999 } }),
      description: (0, import_fields10.text)({ validation: { isRequired: true } }),
      maxAmount: (0, import_fields10.integer)({ validation: { isRequired: true } }),
      couponItem: (0, import_fields10.relationship)({
        ref: "CouponPivot",
        many: true,
        ui: {}
      })
    }
  }),
  CouponPivot: (0, import_core11.list)({
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
    access: import_access10.allowAll,
    fields: {
      couponCode: (0, import_fields10.relationship)({
        ref: "Coupon",
        many: false,
        label: "C.C",
        ui: {
          labelField: "code"
        }
      }),
      customer: (0, import_fields10.relationship)({
        ref: "User",
        many: false
      }),
      status: (0, import_fields10.select)({
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
  Post: (0, import_core11.list)({
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
        ...(0, import_access10.allOperations)(import_access10.allowAll),
        query: (args) => {
          return true;
        }
      }
    },
    fields: {
      title: (0, import_fields10.text)({ validation: { isRequired: true } }),
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
      someFieldName: (0, import_fields10.calendarDay)({
        defaultValue: "1970-01-01",
        db: { map: "my_date" },
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      author: (0, import_fields10.relationship)({
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
      tags: (0, import_fields10.relationship)({
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
  Image: (0, import_core11.list)({
    access: import_access10.allowAll,
    ui: {
      label: "media",
      listView: {
        initialColumns: ["image", "altText"]
      }
    },
    fields: {
      altText: (0, import_fields10.text)({ validation: { isRequired: false } }),
      image: (0, import_fields10.image)({
        storage: "local",
        hooks: {}
      }),
      uploadedBy: (0, import_fields10.relationship)({
        ref: "User.images",
        many: false
      }),
      createdAt: (0, import_fields10.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Settings,
  CartItem,
  Order,
  OrderItem
};

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
var sessionSecret = process.env.SESSION_SECRET;
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
  (0, import_core12.config)({
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
        app.get("/test", async (req, res) => {
          try {
            console.log(
              ctx.prisma._hasPreviewFlag(
                "interactiveTransactions"
              )
            );
            await ctx.prisma.$transaction(
              async (tx) => {
                const x = await tx.prisma.Coupon.update({
                  where: { id: "clcuazkb30048jglof25krj2v" },
                  data: { code: 7278 }
                });
                return x;
              }
            );
            res.send("hi\u{1F612}");
          } catch (error) {
            console.log("WHAT THE FUCK?");
            console.log(error);
            res.send(String(error));
          }
        });
        app.get("/ipg/cb", async (req, res) => {
          try {
            const cartItemId = "clcoo3fd65168ishbph5ij0pe";
            const cartItem = await ctx.prisma.CartItem.findUnique({
              where: { id: cartItemId },
              include: { user: true, course: true }
            });
            if (cartItem.isCompleted) {
              res.status(200).send("purchase is already completed");
              return;
            }
            const cartItemPromises = cartItem.course.map(({ price, id }) => {
              return ctx.prisma.OrderItem.create({
                name: "kooft",
                description: "bemiri",
                price,
                course: {
                  connect: {
                    id
                  }
                }
              });
            });
            const x = await Promise.all(cartItemPromises);
            console.log(x);
          } catch (error) {
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
