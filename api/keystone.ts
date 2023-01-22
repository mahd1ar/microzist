import { config } from '@keystone-6/core';
import { lists } from './schema';
const Zibal = require('zibal');
import { ZibalPaymentResponse, ZibalConfig } from './data/types';
import { withAuth, session } from './auth';
import { storage } from './storage';
import WebSocket from 'ws';

// TODO load .env
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, ../config/${process.env.ENVIRONMENT}.env)});
// or
// const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_END}` : '.env'
// dotenv.config({ path: envFile })

type ZibalCBQuery = {
    success: string; // "1",
    status: string; // "2",
    trackId: string; //"3114997853",
    orderId: string; //"ZBL-aaaa"
};

let wss: WebSocket.Server<WebSocket.WebSocket>;

// session.

// "Fe26.2**e8283474544d8ed9c33645bc502f89cc68d6528697b352ee022c36a8aad758bc*WcGnegP3_gqxT00MsGtcIg*CI-QDOaRWAFabLWXVLrjVqXsJ9a_VZS_NYAZMfsWkyvtFAULQ4nRpfLvtlCzJw4UxsnAKRb8RMqj8biubGK1jQ*1675850956562*d9e517c18e9f6ce9ab063daf0e5f907f9291d84ed98869b55b4f4b23aacc0040*GQJtqk1vboKMo5kwZozZ3aN9wmYG8Z8Ol2yvsdVhSEk"

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
                app.get('/test', async (req, res) => {
                    const keystoneContext = await ctx(req, res);

                    try {
                        // console.log(keystoneContext.prisma.$transaction);
                        // await keystoneContext.prisma.$transaction([
                        //     keystoneContext.prisma.Coupon.update({
                        //         where: { id: 'clcuazkb30048jglof25krj2v' },
                        //         data: { code: 7778 },
                        //     }),
                        // ]);
                        console.log(
                            keystoneContext.prisma._hasPreviewFlag(
                                'interactiveTransactions'
                            )
                        );
                        await keystoneContext.prisma.$transaction(
                            async (tx: any) => {
                                const x = await tx.prisma.Coupon.update({
                                    where: { id: 'clcuazkb30048jglof25krj2v' },
                                    data: { code: 7278 },
                                });

                                return x;
                            }
                        );
                        res.send('hi😒');
                    } catch (error) {
                        console.log('WHAT THE FUCK?');
                        console.log(error);
                        res.send(String(error));
                    }
                });

                app.get<ZibalCBQuery>('/ipg/cb', (req, res) => {
                    // TODO privent double spending
                    // TODO get user id from session
                    // TODO save record to database
                    res.send(req.query);
                });

                app.get('/payment', async (req, res) => {
                    try {
                        const keyStoneCtx = await ctx(req, res);
                        if (!keyStoneCtx.session)
                            throw new Error('session has expired');

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
