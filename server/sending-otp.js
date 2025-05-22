const nodemailer = require('nodemailer')
require("dotenv").config()
const sendOTP = async (email,otp) => {
      const ConnectingToGmail = nodemailer.createTransport({
            service: "gmail",
            auth: {
                  user: process.env.GMAIL,
                  pass:process.env.NODE_MAILER_PASS
            }
      })
      const SendingMessage = {
            from: "BLOGGER APP - authentication issue",
            to: email,
            subject: "Login with this otp",
            html:`<p>This code is valid for the next 8 minutes. Please do not share this code with anyone.<br/>
                     If you did not request this OTP, please ignore this message or contact support immediately.<br/>
                     Thank you for using our platform!<br/>
                     Best regards<br/>
                      </p>
                      <h3>${otp}</h3>
                      `
      }
      try {
            await ConnectingToGmail.sendMail(SendingMessage)
      } catch (error) {
            console.log({message:error.message})
      }
}

module.exports = sendOTP