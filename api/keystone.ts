import { config } from '@keystone-6/core';
import bodyParser from 'body-parser';
import { get } from 'lodash';
import WebSocket from 'ws';
import { session, withAuth } from './auth';
import { GeneralApiResponse, GeneralSession } from './data/types';
import { sendCommand } from './data/utils';
import { lists } from './schema';
import { storage } from './storage';
const Zibal = require('zibal');
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import { Roles } from './data/enums';



const envFile = process.env.NODE_ENV !== 'production' ? `.env.dev` : '.env'
dotenv.config({ path: envFile })


type ZibalCBQuery = {
    success: '1' | '0'; // "1",
    status: string; // "2",
    trackId: string; //"3114997853",
    orderId: string; //"ZBL-aaaa"
};

let wss: WebSocket.Server<WebSocket.WebSocket>;

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
                    // TODO
                    const path: string = req.path;
                    next();
                });


                app.get('/setadmin', async (req, res) => {


                    const sudoctx = await ctx.sudo()
                    try {

                        const userCount = await sudoctx.query.User.count({
                            where: {
                                email: {
                                    equals: 'a.mahdiyar7@yahoo.com'
                                }
                            }
                        })


                        if (userCount === 1) {

                            await sudoctx.query.User.updateOne({
                                where: {
                                    id: 'clcn1d4qg0056ywhb2o13r9wj'
                                },
                                data: {
                                    role: Roles.admin
                                }
                            })
                            res.send('userUpdated')

                        } else if (userCount === 0) {

                            const { name } = await sudoctx.query.User.createOne({
                                data: {
                                    name: 'admin',
                                    lastName: 'administrator',
                                    email: 'a.mahdiyar7@yahoo.com',
                                    password: 'Aa12345678',
                                    role: Roles.admin
                                },
                                query: 'id name lastName email',
                            });

                            res.send(name + 'created')

                        } else {

                            res.send(':(')
                        }


                    } catch (error) {
                        console.error(error)
                        res.send(String(error))
                    }
                    sudoctx.exitSudo()

                })


                app.get('/test', async (req, res) => {
                    try {
                        res.send('test url');
                    } catch (error) {
                        console.log('WHAT THE FUCK?');
                        console.log(error);
                        res.send(String(error));
                    }
                });

                // signup new user
                app.post<
                    {
                        email: string;
                        token: string;
                        password: string;
                        're-password': string;
                        firstname: string;
                        lastname: string;
                    },
                    GeneralApiResponse
                >('/signup', async (req, res) => {
                    const hcaptchaResponse = req.body.token;

                    // TODO get this from dotenv
                    const secret =
                        process.env.NODE_ENV === 'production'
                            ? '0x724D577DcAB12A7C40baF7a310113A1e00eC1878'
                            : '0x0000000000000000000000000000000000000000';
                    const url =
                        'https://cors.nikan-alumni.com/https://hcaptcha.com/siteverify';

                    // validating

                    if (
                        !req.body.firstname ||
                        !req.body.firstname.trim() ||
                        !req.body.lastname ||
                        !req.body.lastname.trim()
                    ) {
                        res.status(400).json({
                            message: 'fa::firstname_or_lastname_is_empty',
                            ok: false,
                        });
                        return;
                    }

                    if (!req.body.token || !req.body.token.trim()) {
                        res.status(400).json({
                            message: 'fa::captcha_empty',
                            ok: false,
                        });
                        return;
                    }

                    if (!req.body.email || !req.body.email.trim()) {
                        res.status(400).json({
                            message: 'fa::email_empty',
                            ok: false,
                        });
                        return;
                    }

                    if (!req.body.password || !req.body.password.trim()) {
                        res.status(400).json({
                            message: 'fa::password_empty',
                            ok: false,
                        });
                        return;
                    } else {
                        if (req.body.password !== req.body['re-password']) {
                            res.status(400).json({
                                message: 'fa::password_confirm_mismatch',
                                ok: false,
                            });
                            return;
                        }
                    }

                    const headers = {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    };

                    const axiosData = {
                        secret,
                        response: hcaptchaResponse,
                    };
                    console.log('here');
                    const response = await axios.post(
                        url,
                        qs.stringify(axiosData),
                        {
                            headers,
                        }
                    );

                    if (!response.data.success) {
                        res.status(400).json({
                            message: 'fa::hcaptcha_validation_error',
                            ok: false,
                        });

                        return;
                    }

                    const sudoContext = await ctx.sudo();
                    // TODO 😈 save password

                    try {
                        const newuser = await sudoContext.query.User.createOne({
                            data: {
                                name: req.body.firstname,
                                lastName: req.body.lastname,
                                email: req.body.email,
                                password: req.body.password,
                                role: Roles.member
                            },
                            query: 'id name lastName email',
                        });

                        // TODO send email

                        res.json({
                            message: 'fa::user_created',
                            ok: true,
                            paylod: { newuser },
                        });
                    } catch (error) {
                        if (
                            String(error).search(
                                'Unique constraint failed on the fields'
                            ) > -1
                        ) {
                            res.status(400).json({
                                message: 'fa::duplicate_email',
                                ok: false,
                            });
                            return;
                        }
                        console.log('error:');
                        console.log(error);

                        res.status(400).json({
                            message: 'SOMTHING WENT WRON',
                            ok: false,
                        });
                    } finally {
                        sudoContext.exitSudo();
                    }
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

                // add  to cart
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

                        // make sure user is logged in
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

                        const callbackUrl = 'http://localhost:3030/ipg/cb';

                        const zibal = new Zibal({
                            merchant: 'zibal', // Your IPG's Merchant Id (You Can Get it From Zibal's Dashboard)
                            callbackUrl, // The URL Where User will be Redirected to After Payment
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

                            if (totalPrice === 0) {
                                const urlSearchParams = new URLSearchParams();
                                const zibalqueryParams: ZibalCBQuery = {
                                    success: '1',
                                    orderId: cartid, // 'free-' + ~~(Math.random() * 100000),
                                    status: '2',
                                    trackId: '0',
                                };

                                for (let [key, value] of Object.entries(
                                    zibalqueryParams
                                ))
                                    urlSearchParams.append(key, value);

                                const url =
                                    callbackUrl +
                                    '?' +
                                    urlSearchParams.toString();

                                res.redirect(url);
                                return;
                            }

                            // Payment Request
                            const response = await zibal.request({
                                amount: totalPrice, // Required - In Rials
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
                            res.status(500).json({ ok: false, message: String(error) });
                        }
                    }
                );

                //calback
                app.get<ZibalCBQuery, any>('/ipg/cb', async (req, res) => {
                    if (req.query.success === '0') {
                        // TODO redicet the motherfucker to frontend
                        res.sendStatus(500).send('fa:: zbal error!');
                        return;
                    }

                    try {
                        const sudoContext = ctx.sudo();

                        const cartId = req.query.orderId;
                        const trackId = req.query.trackId;
                        if (
                            typeof cartId !== 'string' ||
                            typeof trackId !== 'string'
                        ) {
                            throw new Error('error in params');
                            return;
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
                            query: `totalPrice
                                    user { id } 
                                    items { 
                                        id
                                        priceWithDiscount 
                                        course { id } 
                                        event { id } 
                                    }
                                    isCompleted`,
                        });

                        if (isCompleted) {
                            res.status(400).send(
                                'fa:: purtes already compeleted'
                            );

                            return;
                        }

                        const cartItem: {
                            productType: string;
                            productId: string;
                            productTypePlural: string;
                            price: number;
                        }[] = items.map(
                            (i: {
                                id: string;
                                priceWithDiscount: number;
                                course: { id: string } | null;
                                event: { id: string } | null;
                            }) => {
                                const productType = i.event
                                    ? 'event'
                                    : 'course';
                                const productId = i.event?.id || i.course?.id;
                                const productTypePlural = i.event
                                    ? 'events'
                                    : 'courses';
                                return {
                                    productType,
                                    productId,
                                    productTypePlural,
                                    price: i.priceWithDiscount,
                                };
                            }
                        );

                        const newOrder =
                            await sudoContext.query.Order.createOne({
                                data: {
                                    totalCost: totalPrice,
                                    paymentStatus: 1,
                                    trackId,
                                    user: {
                                        connect: {
                                            id: userId,
                                        },
                                    },
                                    items: {
                                        create: cartItem.map((i) => {
                                            return {
                                                name:
                                                    i.price === 0
                                                        ? 'free event'
                                                        : 'hi there',
                                                [i.productType]: {
                                                    connect: {
                                                        id: i.productId,
                                                    },
                                                },
                                                price: i.price,
                                            };
                                        }),
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

                        // add course or event to user profile
                        await sudoContext.query.User.updateMany({
                            data: cartItem.map((i) => {
                                return {
                                    where: {
                                        id: userId,
                                    },
                                    data: {
                                        [i.productTypePlural]: {
                                            connect: { id: i.productId },
                                        },
                                    },
                                };
                            }),
                        });

                        // TODO redirect to frontend
                        res.send('orderid is => ' + newOrder.id);

                        sudoContext.exitSudo();
                    } catch (error) {
                        console.log(error);
                        res.send(error);
                    }
                });

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
