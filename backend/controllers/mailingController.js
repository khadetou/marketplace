import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';


//@desc Sendmail to the users of the app 
//@acces Post /api/mail/send
//@access private


export const sendEmail = asyncHandler(async (res, req)=>{

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
        user: "khadetou96@gmail.com",
        pass: "nufxzmrjpqykgurf", 
        },
    });


    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <khadetou96@gmail.com>', // sender address
        to: "hadetou96@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: 'Hey boy!!!', // html body
    });

    console.log("Message sent: %s", info.messageId);
 
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
})