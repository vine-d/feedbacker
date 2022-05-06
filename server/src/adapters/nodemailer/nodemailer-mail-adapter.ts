import nodemailer from "nodemailer"
import { MailAdapter, SendMailData } from "../mail-adapter";

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Feedbacker team <hi@feedbacker.com>',
      to: process.env.MAILTRAP_TEST_TO,
      subject,
      html: body
    })
  }
}