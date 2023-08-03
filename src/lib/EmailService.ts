import nodemailer from 'nodemailer'

type EmailPayload = {
  to: string
  subject: string
  html: string
}

export default class EmailService {
  static smtpOptions = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  }
  static transporter = nodemailer.createTransport({
    ...this.smtpOptions,
  })

  static async sendEmail(data: EmailPayload) {
    return await this.transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      ...data,
    })
  }
}
