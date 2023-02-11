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
import bodyParser from 'body-parser';

import { sendCommand } from './data/utils';

import { get } from 'lodash';

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
                app.use(bodyParser.json());

                app.use((req, res, next) => {
                    const path: string = req.path;
                    next();
                });

                // auth item
                app.post('/auth-item', async (req, res) => {
                    console.log(!!ctx.session ? 'loggedin' : 'not loggedin');
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
                app.delete<{ cartid: string }, GeneralApiResponse>(
                    '/cart-item',
                    async (req, res) => {
                        if (
                            !req.body.cartid ||
                            typeof req.body.cartid !== 'string'
                        ) {
                            res.status(400).json({
                                ok: false,
                                message: 'bad request',
                            });
                            return;
                        }

                        if (!ctx.session) {
                            res.status(400).send({
                                ok: false,
                                message: 'you dont have proper access',
                            });
                            sendCommand({
                                action: 'logout',
                                message: 'session expoire',
                            });
                            return;
                        }

                        const cartid = req.body.cartid;

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
                                    'fa :: deleted successfuly ' +
                                    deletedCart.id,
                            });
                        } catch (error) {
                            console.log(error);
                            res.status(500).json({
                                ok: false,
                                message: 'something went wrong',
                            });
                            sendCommand({
                                action: 'show_message',
                                message: 'something went wrong',
                                type: 'error',
                            });
                        }
                    }
                );

                // add course to cart
                app.post<{ cid: string; eventid: string }, GeneralApiResponse>(
                    '/cart-item',
                    async (req, res) => {
                        const courseId = req.body.cid;
                        const eventId = req.body.eventid;

                        const productType = eventId ? 'event' : 'course';
                        const productID = eventId || courseId;
                        const productName = eventId
                            ? 'fa:: Event '
                            : 'Fa:: Course ';

                        if (courseId && eventId) {
                            res.status(400).json({
                                ok: false,
                                message: 'bad request',
                            });
                            return;
                        }

                        if (
                            (!courseId || typeof courseId !== 'string') &&
                            (!eventId || typeof eventId !== 'string')
                        ) {
                            res.status(400).json({
                                ok: false,
                                message: 'bad request',
                            });
                            return;
                        }
                        if (!ctx.session) {
                            res.status(400).send({
                                ok: false,
                                message: 'you dont have proper access',
                            });
                            sendCommand({
                                action: 'logout',
                                message: 'session expoire',
                            });
                            return;
                        }

                        // TODO check and make sure that the curse existed
                        type Cart = {
                            id: string;
                            userId: string;
                            isCompleted: boolean;
                        };

                        const session: GeneralSession = ctx.session;

                        try {
                            let cartId: string;
                            const [cart] = await ctx.query.Cart.findMany({
                                where: {
                                    user: {
                                        id: {
                                            equals: session?.itemId,
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
                                            ${productType} {
                                                id
                                            }
                                        }`,
                            });

                            if (cart) {
                                cartId = cart.id;

                                if (
                                    cart.items
                                        .map((i: any) =>
                                            get(i, `${productType}.id`, '')
                                        )
                                        .filter(Boolean)
                                        .includes(productID)
                                ) {
                                    res.json({
                                        ok: false,
                                        message: productName + ' already added',
                                    });
                                    return;
                                }

                                const newCartItem: Cart =
                                    await ctx.prisma.CartItem.create({
                                        data: {
                                            [productType]: {
                                                connect: {
                                                    id: productID,
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
                                                    [productType]: {
                                                        connect: {
                                                            id: productID,
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
                            res.status(400).json({
                                ok: false,
                                message: 'someting went wrong',
                            });
                            return;
                        }

                        res.status(201).json({ ok: true, message: 'created' });
                    }
                );

                // add coupon
                app.get<{ id: string; cartitem: string }, GeneralApiResponse>(
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
                        // TODO shuld not be numbers only
                        const couponCode = Number(req.query.id);

                        if (!couponCode) {
                            res.status(403).json({
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

                            if (!coupon || !coupon.id) {
                                res.status(403).json({
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
                            // console.error(String('======'));
                            // console.error(String(error));
                            // console.error(error);
                            res.json({
                                ok: false,
                                message: 'operation not successfull',
                            });
                        }
                    }
                );

                //calback
                app.get<ZibalCBQuery, any>('/ipg/cb', async (req, res) => {
                    try {
                        const sudoContext = ctx.sudo();
                        const cartId = req.query.orderId;
                        if (typeof cartId === 'string') {
                            throw new Error('error in params');
                        }

                        const {
                            totalPrice,
                            user: { id: userId },
                            items,
                            isCompleted,
                        } = await sudoContext.query.Cart.findOne({
                            where: {
                                id: cartId,
                            },
                            query: ' totalPrice user { id } items { id priceWithDiscount course {id} } isCompleted',
                        });

                        if (isCompleted) {
                            res.status(400).send(
                                'fa:: purtes already compeleted'
                            );
                            return;
                        }

                        const cartItem = items.map(
                            (i: {
                                id: string;
                                priceWithDiscount: number;
                                course: { id: string };
                            }) => {
                                return {
                                    name: 'hi there',
                                    course: { connect: { id: i.course.id } },
                                    price: i.priceWithDiscount,
                                };
                            }
                        );

                        const newOrder =
                            await sudoContext.query.Order.createOne({
                                data: {
                                    totalCost: totalPrice,
                                    paymentStatus: 1,
                                    user: {
                                        connect: {
                                            id: userId,
                                        },
                                    },
                                    items: {
                                        create: cartItem,
                                    },
                                },
                            });

                        // TODO add Courcess to userId.courses

                        await sudoContext.query.Cart.updateOne({
                            where: {
                                id: cartId,
                            },
                            data: {
                                isCompleted: true,
                            },
                        });

                        res.send('orderid is => ' + newOrder.id);
                        // await ctx.prisma.Order.create({

                        // })
                        sudoContext.exitSudo();
                    } catch (error) {
                        console.log(error);
                        res.send(error);
                    }
                });

                // checkout
                app.get<{}, GeneralApiResponse>(
                    '/checkout',
                    async (req, res) => {
                        if (!ctx.session) {
                            res.status(400).json({
                                ok: false,
                                message: 'fa:: session expires login agin',
                            });
                            return;
                        }

                        const zibal = new Zibal({
                            merchant: 'zibal', // Your IPG's Merchant Id (You Can Get it From Zibal's Dashboard)
                            callbackUrl: 'http://localhost:3030/ipg/cb', // The URL Where User will be Redirected to After Payment
                        });

                        try {
                            const [{ totalPrice, id: cartid }] =
                                await ctx.query.Cart.findMany({
                                    where: {
                                        user: {
                                            id: {
                                                equals: (
                                                    ctx.session as GeneralSession
                                                )?.itemId,
                                            },
                                        },
                                    },
                                    query: ' totalPrice id',
                                });

                            // Payment Request
                            const response = await zibal.request({
                                amount: 200000, // Required - In Rials
                                orderId: cartid, // Optional
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
                    }
                );

                // kick
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
