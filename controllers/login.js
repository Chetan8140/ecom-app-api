const LOGIN =require('../model/login')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
// require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  },
});

async function main(mailing) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_USER, // sender address
      to: mailing, // list of receivers
      subject: "Creative Desinging Multimedia & Institute", // Subject line
    //   text: "Hello world?", // plain text body
      html: "<i>Welcome to creavive multimedia <br><br> Today 5pm our class is running so please recach at time <br> today is our mysql lacture this is important lacture <br> so please atain <br><br><br> Faithfully <br> Creative Academy</i>", // html body
    });
    console.log("Message sent: %s", info.messageId);
  }

exports.SINGUP = async function(req , res , next){
    try {
        req.body.password= await bcrypt.hash(req.body.password,10)
        const user = await LOGIN.create(req.body)
        await main(user.email)
        res.status(201).json({
            status:"success",
            message:"user created",
            data: user
        })

    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
   }

exports.USERLOGIN = async function (req,res,next){
    try {
        const chekuser = await LOGIN.findOne({email:req.body.email})
        if (!chekuser) {
            throw new Error("INVALID EMAIL")
        }
        
        const chekPass = await bcrypt.compare(req.body.password,chekuser.password)
        if (!chekPass) {
            throw new Error("INVALID PASSWORD")
        }
        
        res.status(201).json({
            status:"success",
            message:"user is login",
            data:chekuser
        })
      } catch (error) {
        res.status(404).json({
            status:"fail", 
            message:error.message
        })
      }
}

exports.ALL = async function (req,res,next){
    try {
        const data = await LOGIN.find()
        res.status(200).json({
            status: "Success",
            message: "All User Found",
            data : data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}