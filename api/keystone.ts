import { config } from '@keystone-6/core';
import { lists } from './schema';
const Zibal = require('zibal');
import {
    ZibalPaymentResponse,
    ZibalConfig,
    GeneralSession,
    GeneralApiResponse,
} from './data/types';
import { withAuth, session } from './auth';
import { storage } from './storage';
import WebSocket from 'ws';
import { BaseKeystoneTypeInfo, KeystoneContext } from '@keystone-6/core/types';
import { Request } from 'express';
import Iron from '@hapi/iron';

// TODO load .env
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, ../config/${process.env.ENVIRONMENT}.env)});
// or
// const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_END}` : '.env'
// dotenv.config({ path: envFile })

type ZibalCBQuery = {
    success: '1' | '0'; // "1",
    status: string; // "2",
    trackId: string; //"3114997853",
    orderId: string; //"ZBL-aaaa"
};

let wss: WebSocket.Server<WebSocket.WebSocket>;

// session.

// "Fe26.2**e8283474544d8ed9c33645bc502f89cc68d6528697b352ee022c36a8aad758bc*WcGnegP3_gqxT00MsGtcIg*CI-QDOaRWAFabLWXVLrjVqXsJ9a_VZS_NYAZMfsWkyvtFAULQ4nRpfLvtlCzJw4UxsnAKRb8RMqj8biubGK1jQ*1675850956562*d9e517c18e9f6ce9ab063daf0e5f907f9291d84ed98869b55b4f4b23aacc0040*GQJtqk1vboKMo5kwZozZ3aN9wmYG8Z8Ol2yvsdVhSEk"
// TODO DETETE this bullshit
type CartItemDatabase = {
    id: string;
    userId: string;
    isCompleted: boolean;
    user: {
        id: string;
        name: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        passwordResetToken: string;
        passwordResetIssuedAt: Date;
        passwordResetRedeemedAt: Date;
    };
    course: {
        id: string;
        name: string;
        description: string;
        status: string;
        price: number;
    }[];
};

type CartItem = {
    id: string;
    courseId: string;
    cartId: string;
};

type Course = {
    id: string;
    name: string;
    description: string;
    status: string;
    price: number;
};

type User = {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    passwordResetToken: string;
    passwordResetIssuedAt: Date;
    passwordResetRedeemedAt: Date;
};

export default withAuth(
    config({
        db: {
            provider: 'sqlite',
            url: 'file:./keystone.db',
        },
        lists,
        session,
        storage,
        graphql: {
            playground: true,
        },
        server: {
            cors: { origin: ['http://localhost:5173'], credentials: true },
            port: 3030,
            extendExpressApp: (app, ctx) => {
            
                app.post('/auth-item', async (req, res) => {
                    
                    if (ctx.session) {
                        const session: GeneralSession = ctx.session;
                        try {
                            const user: User = await ctx.prisma.User.findUnique(
                                {
                                    where: {
                                        id: session?.itemId,
                                    },
                                }
                            );

                            res.json(user);
                        } catch (error) {
                            res.send(undefined);
                            console.error(error);
                        }
                    } else res.send(undefined);
                });

                app.get('/test', async (req, res) => {
                    try {
                        // console.log(keystoneContext.prisma.$transaction);
                        // await keystoneContext.prisma.$transaction([
                        //     keystoneContext.prisma.Coupon.update({
                        //         where: { id: 'clcuazkb30048jglof25krj2v' },
                        //         data: { code: 7778 },
                        //     }),
                        // ]);
                        console.log(
                            ctx.prisma._hasPreviewFlag(
                                'interactiveTransactions'
                            )
                        );
                        await ctx.prisma.$transaction(async (tx: any) => {
                            const x = await tx.prisma.Coupon.update({
                                where: { id: 'clcuazkb30048jglof25krj2v' },
                                data: { code: 7278 },
                            });

                            return x;
                        });
                        res.send('hi😒');
                    } catch (error) {
                        console.log('WHAT THE FUCK?');
                        console.log(error);
                        res.send(String(error));
                    }
                });

                // delete from cart
                app.get<{ cartid: string }, GeneralApiResponse>(
                    '/delete-from-cart',
                    async (req, res) => {
                        if (
                            !req.query.cartid ||
                            typeof req.query.cartid !== 'string'
                        ) {
                            res.status(403).json({
                                ok: false,
                                message: 'bad request',
                            });
                            return;
                        }

                        const cartid = req.query.cartid;

                        if (!ctx.session) {
                            res.status(403).send({
                                ok: false,
                                message: 'you dont have proper access',
                            });
                            return;
                        }
                        try {
                            const deletedCart =
                                await ctx.prisma.CartItem.delete({
                                    where: {
                                        id: cartid,
                                    },
                                });

                            res.json({
                                ok: true,
                                message:
                                    'deleted successfuly ' + deletedCart.id,
                            });
                        } catch (error) {
                            console.log(error);
                            res.json({
                                ok: false,
                                message: 'something went wrong',
                            });
                        }
                    }
                );

                // add course to cart
                app.get<{ cid: string }, GeneralApiResponse>(
                    '/add-to-cart',
                    async (req, res) => {
                        if (
                            !req.query.cid ||
                            typeof req.query.cid !== 'string'
                        ) {
                            res.status(403).json({
                                ok: false,
                                message: 'bad request',
                            });
                            return;
                        }
                        if (!ctx.session) {
                            res.status(403).send({
                                ok: false,
                                message: 'you dont have proper access',
                            });
                            return;
                        }

                        // TODO check and make sure that the curse existed
                        type Cart = {
                            id: string;
                            userId: string;
                            isCompleted: boolean;
                        };

                        const courseId = req.query.cid;
                        const session: GeneralSession = ctx.session;
                        // try {

                        // } catch (error) {
                        //     console.log(error);
                        // }
                        // res.send({ ok: true, message: 'as' });
                        // return;
                        try {
                            let cartId: string;
                            const [cart] = await ctx.query.Cart.findMany({
                                where: {
                                    user: {
                                        id: {
                                            equals: 'cldbbw0rl0711z8hbnfbetvkl', // session?.itemId
                                        },
                                    },
                                    AND: {
                                        isCompleted: {
                                            equals: false,
                                        },
                                    },
                                },
                                query: `id
                                        items {
                                            course {
                                                id
                                            }
                                        }`,
                            });

                            if (
                                cart.items
                                    .map((i: any) => i.course.id)
                                    .includes(courseId)
                            ) {
                                res.json({
                                    ok: false,
                                    message: 'course already added',
                                });
                                return;
                            }

                            if (cart) {
                                cartId = cart.id;

                                const newCartItem: Cart =
                                    await ctx.prisma.CartItem.create({
                                        data: {
                                            course: {
                                                connect: {
                                                    id: courseId,
                                                },
                                            },
                                            cart: {
                                                connect: {
                                                    id: cartId,
                                                },
                                            },
                                        },
                                    });
                            } else {
                                const newCart: Cart =
                                    await ctx.prisma.Cart.create({
                                        data: {
                                            user: {
                                                connect: {
                                                    id: session?.itemId,
                                                },
                                            },
                                            items: {
                                                create: {
                                                    course: {
                                                        connect: {
                                                            // course id
                                                            id: courseId,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    });

                                cartId = newCart.id;
                            }
                        } catch (error) {
                            console.error(error);
                            res.json({
                                ok: false,
                                message: 'someting went wrong',
                            });
                            return;
                        }

                        res.status(201).json({ ok: true, message: 'created' });
                    }
                );

                app.get<{ id: string }, GeneralApiResponse>(
                    '/coupon',
                    async (req, res) => {
                        type Coupon = {
                            id: string;
                            code: string;
                            description: string;
                            maxAmount: number;
                            discount: number;
                        };

                        if (!req.query.id || typeof req.query.id !== 'string') {
                            res.status(403).json({
                                ok: false,
                                message: 'bad request',
                            });
                            return;
                        }

                        if (
                            !req.query.cartitem ||
                            typeof req.query.cartitem !== 'string'
                        ) {
                            res.status(403).json({
                                ok: false,
                                message: 'bad request',
                            });
                            return;
                        }
                        const cartitem = req.query.cartitem;
                        const couponCode = Number(req.query.id);

                        if (!couponCode) {
                            res.json({
                                ok: false,
                                message: 'coupon is not valid',
                            });
                            return;
                        }
                        try {
                            // console.log(Object.keys(ctx.prisma.Coupon));
                            const [coupon] = await ctx.query.Coupon.findMany({
                                where: {
                                    code: { equals: couponCode },
                                },
                                query: 'id code remaining',
                            });

                            if (!coupon.id) {
                                res.json({
                                    ok: false,
                                    message: 'coupon dosent exists',
                                });
                                return;
                            }

                            await ctx.db.CartItem.updateOne({
                                where: {
                                    id: cartitem,
                                },
                                data: {
                                    coupon: {
                                        connect: {
                                            id: coupon.id,
                                        },
                                    },
                                },
                            });

                            res.json({ ok: true, message: 'success full' });
                        } catch (error) {
                            // console.error(error?.extensions?.code);
                            // console.error(String(error));
                            res.json({
                                ok: false,
                                message: 'operation not successfull',
                            });
                        }
                    }
                );

                // checkout

                app.get<ZibalCBQuery, GeneralApiResponse>(
                    '/ipg/cb2',
                    async (req, res) => {
                        // test
                        // console.log('what thw fuck');
                        try {
                            const cartInfo: {
                                user: User;
                                items: { id: string; course: Course }[];
                            } = await ctx.prisma.Cart.findUnique({
                                where: {
                                    id: 'cldiz4yin0632n0lok698fe3d',
                                },
                                include: {
                                    user: true,
                                    items: {
                                        select: { course: true, id: true },
                                    },
                                },
                            });

                            const purchasedCourses = cartInfo.items.map(
                                (i) => i.course.id
                            );

                            console.log(purchasedCourses);
                            console.log(cartInfo);
                        } catch (error) {
                            // write somwwhere for god sakes
                            console.log(error);
                            res.json({
                                ok: false,
                                message: 'operation NOT successfull',
                            });
                        }

                        return;
                        // get cartid from query
                        const CARTID = 'cldiz4yin0632n0lok698fe3d';

                        // get courses from cart
                        try {
                            const cartInfo: {
                                user: User;
                                items: { id: string; course: Course }[];
                            } = await ctx.prisma.Cart.findUnique({
                                where: {
                                    id: CARTID,
                                },
                                include: {
                                    user: true,
                                    items: {
                                        select: { course: true, id: true },
                                    },
                                },
                            });

                            const purchasedCourses = cartInfo.items.map(
                                (i) => i.course.id
                            );

                            res.json({ ok: true, message: 'successFull' });
                        } catch (error) {
                            // write somwwhere for god sakes
                            console.log(error);
                            res.json({ ok: false, message: 'NOTsuccessfull' });
                        }
                        // create order and orderItem base of courses
                        // add user to course owner
                        // check isCompelete attribute in cart
                    }
                );

                app.get<ZibalCBQuery>('/ipg/cb', async (req, res) => {
                    // if (req.query.success === "1") {

                    // }
                    // else {

                    // }

                    try {
                        // get cart item
                        const cartItemId = 'clcoo3fd65168ishbph5ij0pe';
                        const cartItem: CartItemDatabase =
                            await ctx.prisma.CartItem.findUnique({
                                where: { id: cartItemId },
                                include: { user: true, course: true },
                            });

                        if (cartItem.isCompleted) {
                            res.status(200).send(
                                'purchase is already completed'
                            );
                            return;
                        }

                        const orderItemPromises: Promise<any>[] =
                            cartItem.course.map(({ price, id }) => {
                                return ctx.prisma.OrderItem.create({
                                    data: {
                                        name: 'kooft',
                                        description: 'bemiri',
                                        price,
                                        course: {
                                            connect: {
                                                id,
                                            },
                                        },
                                    },
                                });
                            });

                        const cartItemResolvedDB = await Promise.allSettled<{
                            id: string;
                            name: string;
                            description: string;
                            courseId: string;
                            price: number;
                            orderId: null;
                        }>(orderItemPromises);

                        const order: {
                            id: string;
                            total: number;
                            userId: string;
                            paymentStatus: number;
                            orderDate: Date;
                        } = await ctx.prisma.Order.create({
                            data: {
                                total: cartItemResolvedDB.length,
                                totalCost: cartItem.course.reduce(
                                    (accumulator, currentValue) =>
                                        (accumulator += currentValue.price),
                                    0
                                ),
                                items: {
                                    connect: cartItemResolvedDB
                                        .map((i) =>
                                            i.status === 'fulfilled'
                                                ? i.value.id
                                                : null
                                        )
                                        .filter((i) => !!i)
                                        .map((i) => ({ id: i })),
                                },
                                user: {
                                    connect: { id: cartItem.userId },
                                },
                                paymentStatus: cartItemResolvedDB.some(
                                    (i) => i.status === 'rejected'
                                )
                                    ? -1
                                    : 1,
                            },
                        });

                        const orderItemPromisesDB = cartItemResolvedDB.map(
                            (i) => {
                                if (i.status === 'fulfilled')
                                    return ctx.prisma.OrderItem.update({
                                        where: {
                                            id: i.value.id,
                                        },
                                        data: {
                                            order: {
                                                connect: { id: order.id },
                                            },
                                        },
                                    });
                                else return null;
                            }
                        );

                        await Promise.allSettled(orderItemPromisesDB);

                        await ctx.prisma.CartItem.update({
                            where: {
                                id: cartItemId,
                            },
                            data: {
                                isCompleted: true,
                            },
                        });

                        cartItem.course.forEach(async (course) => {
                            await ctx.prisma.Course.update({
                                where: {
                                    id: course.id,
                                },
                                data: {
                                    users: {
                                        connect: {
                                            id: cartItem.userId,
                                        },
                                    },
                                },
                            });
                        });

                        res.send('successful');
                    } catch (error) {
                        console.log(error);
                        res.send(error);
                    }

                    // res.send(req.query);
                });

                app.get('/payment', async (req, res) => {
                    try {
                        if (!ctx.session) {
                            throw new Error('session has expired');
                        }
                        const zibal = new Zibal({
                            merchant: 'zibal', // Your IPG's Merchant Id (You Can Get it From Zibal's Dashboard)
                            callbackUrl: 'http://localhost:3030/ipg/cb', // The URL Where User will be Redirected to After Payment
                        });

                        try {
                            // Payment Request
                            const response = await zibal.request({
                                amount: 200000, // Required - In Rials
                                orderId: 'ZBL-aaaa', // Optional
                                merchant: 'zibal', // As Said Above, You can Specify merchant for Each Transaction too.
                                callbackUrl: 'http://localhost:3030/ipg/cb', // As Said Above, You can Specify merchant for Each Transaction too.
                                mobile: '09102124368', // Optional - User's Card Numbers will Show inf Dropdown in Shaparak Page if you Send User's Mobile
                                description: 'THIS IS MY DESCRIPTION', // Optional
                                allowedCards: ['5022291092719457'], // Optional - Any Transaction with a Card Number which is not Present in this Array will be Unsuccessful
                                linkToPay: false, // Optional - If true, we will generate a Short Link for this transaction.
                                sms: false, // Optional - If true, we will Send the Short Link to User's Mobile
                            });

                            res.redirect(response.paymentUrl);
                        } catch (error) {
                            console.error(error); // { result: 103, message: 'authentication error', statusMessage: '{merchant} غیرفعال' }
                            // TODO write somewhere for godsakes
                            res.status(500).send(error);
                        }

                        // res.send(keyStoneCtx.session);
                    } catch (error) {
                        console.log(error);
                        res.status(500).send(String(error));
                    }
                });

                app.get<{ userid: string | undefined }>('/kick', (req, res) => {
                    if (
                        wss &&
                        req.query.userid &&
                        !Array.isArray(req.query.userid)
                    ) {
                        wss.clients.forEach((ws) => {
                            const data = JSON.stringify({
                                event: 'kickout',
                                payload: req.query.userid,
                            });
                            ws.send(data);
                        });
                    }
                    res.send('ok');
                });
            },
            extendHttpServer: (httpServer, commonContext, graphqlSchema) => {
                wss = new WebSocket.WebSocketServer({
                    server: httpServer,
                    path: '/ws',
                });

                wss.on('connection', function connection(ws) {
                    ws.on('message', function message(data) {
                        console.log('received: %s', data);
                    });

                    ws.send('websocket connected');
                    // TODO close connections
                    // socket.id = uuidv4()
                    // connections[socket.id] = socket
                    // socket.on('close', () => {
                    //     delete connections[socket.id]
                    //     delete socket.id
                    //   })
                });
            },
        },
    })
);
