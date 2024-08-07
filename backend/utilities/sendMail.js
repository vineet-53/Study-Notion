const nodemailer = require("nodemailer");
require("dotenv").config();
exports.sendMail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail email address
        pass: process.env.EMAIL_PASS, // Your Gmail app password (generate one if 2-Step Verification is enabled)
      },
    });
    const info = await transporter.sendMail({
      from: `Study Notion : -`,
      to: `${email}`,
      subject: `${subject}`,
      html: `${html}`,
    });
    return info;
  } catch (err) {
    console.log("**********Error sending mail to the Client***********");
    console.error(err);
  }
};
