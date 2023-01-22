"use strict";
import nodemailer from "nodemailer";
import path from 'path';
import hbs, { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars';

// async..await is not allowed in global scope, must use a wrapper
export async function sendResetPasswordEmail(ctx: { itemId: any, identity: string, token: string }) {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.nikan-alumni.org",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'test@nikan-alumni.org', // generated ethereal user
            pass: "P@ssw0rd110121", // generated ethereal password
        },
    });

    // const viewEngine = handlebars.create({
    //     defaultLayout: false
    // });

    const options: NodemailerExpressHandlebarsOptions = {
        extName: '.hbs',
        viewPath: path.resolve(__dirname, './email-templates'),
        viewEngine: {
            defaultLayout: false
        }
    }
    transporter.use('compile', hbs(options));
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"from nikan" <test@nikan-alumni.org>', // sender address
        to: ctx.identity, // list of receivers
        subject: "Hello ✔ world", // Subject line
        text: "Hello world?", // plain text body
        // @ts-ignore
        template: 'resetpassword',
        context: {
            ...ctx, resetlink: `http://localhost:5173/reset-password?email=${encodeURIComponent(ctx.identity)}&token=${ctx.token}`
        }
        // html: "<b>Hello world?</b>", // html body
    });

    // @ts-ignore
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // @ts-ignore
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

