import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

require('dotenv').config({ path: '../.env' })

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Feedbacker team <hi@feedbacker.com>',
    to: process.env.MAILTRAP_TEST_TO,
    subject: 'New feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111" >`,
      `<p>Feedback type: ${type}</p>`,
      `<p>Comment: ${comment}</p>`,
      `</div>`
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})