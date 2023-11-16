import express from 'express'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'
import cors from 'cors'

export default function extendApp(app: express.Express) {
  app.use(bodyParser.json())

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  const corsOpts: cors.CorsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
      if (origin === process.env.CLIENT_URL) {
        callback(null, true)
      } else {
        callback('Error: origin not allowed by CORS')
      }
    }
  }

  /* nodemailer message endpoint */
  app.post('/send-message', cors(corsOpts), async (req, res) => {
    console.log(req.body.images)

    const {to, subject, text} = req.body.data
    const from = `${process.env.SENDER_NAME} <${process.env.SENDER_ADDR}>`
    const mail: nodemailer.SendMailOptions = {from, to, subject, text}

    transport.sendMail(mail, error => {
      if (error) {
        console.log(error)
        return res.sendStatus(500)
      }
      console.log(`Message sent to ${to}`)
    })

    return res.sendStatus(200)
  })
}
