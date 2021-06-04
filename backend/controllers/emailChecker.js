import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';
import handlebars from 'handlebars'
import path from 'path';
import fs from 'fs';
//@desc Sendmail to the users of the app 
//@acces Post /api/mail/send
//@access private


export const sendEmail = async (user)=>{
        //RETURN JSONWEBTOKEN
        const preload = {
            user:{
                id: user.id
            }
        }

    const token  = await  jsonwebtoken.sign(preload, process.env.JWST,
            {expiresIn: 3000})

    const __dirname = path.resolve();

    const templateSource = fs.readFileSync(path.join(__dirname,'/backend/views/confirm.hbs'), 'utf8');
    const template = handlebars.compile(templateSource)


    const url  = `http://localhost:5000/${token}`;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
        user: "khadetou96@gmail.com",
        pass: "nufxzmrjpqykgurf", 
        },
    });

    const htmlToSend = template({value: rl})

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <hadetou96@gmail.com>', // sender address
        to: `${user.name} <${user.email}>`, // list of receivers
        subject: "Confirmation Email", // Subject line
        text: "Hello world?", // plain text body
        html: htmlToSend, // html body
    });

    console.log("Message sent: %s", info.messageId);
 
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
