import nodemailer from 'nodemailer';
import jsonwebtoken from 'jsonwebtoken';
import handlebars from 'handlebars'
import path from 'path';
import fs from 'fs';
//@desc Sendmail to the users of the app 
//@acces Post /api/mail/send
//@access private


export const sendEmailToConfirm = async (user, req, res)=>{
        //RETURN JSONWEBTOKEN
        const preload = {
            user:{
                id: user.id
            }
        }

        //DEFINE OUR TOKEN AND SETTING EMAIL TOKEN
        const token  = await  jsonwebtoken.sign(preload, process.env.JWST,{expiresIn: 3000})
        
        console.log(user.emailToken)
        user.emailToken = token;
      
        //EMAIL TEMPLATE ROUTE
        const __dirname = path.resolve();
        const templateSource = fs.readFileSync(path.join(__dirname,'/backend/views/confirm.hbs'), 'utf8');
        const template = handlebars.compile(templateSource)

        //SETTING THE URL AND TRANSPORTER
        const url  = `http://${req.headers.host}/api/register/checkemail?token=${token}`;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
            user: "khadetou96@gmail.com",
            pass: "nufxzmrjpqykgurf", 
            },
        });

        const htmlToSend = template({value: url});
        const info = {
            from: '"Fred Foo 👻" <hadetou96@gmail.com>', // sender address
            to: `${user.name} <${user.email}>`, // list of receivers
            subject: "Confirmation Email", // Subject line
            text: "Hello world?", // plain text body
            html: htmlToSend, // html body
        }


        //  SENG MAIL TO CONFIRM
    await transporter.sendMail(info, (err, response)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Email sent successfully!");
                res.send("Check your mail to validate")
            }
        });
}
