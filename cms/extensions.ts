import express from 'express'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'

export default function extendApp(app: express.Express) {
  app.use(bodyParser.json())

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  type Attachment = {filename: string; content: Buffer}
  type Message = {to: string; subject: string; text: string; attachments?: Attachment[]}

  const sendMail = async (message: Message): Promise<number> => {
    const from = `${process.env.SENDER_NAME} <${process.env.SENDER_ADDR}>`
    const mail: nodemailer.SendMailOptions = {from, ...message}

    transport.sendMail(mail, error => {
      if (error) {
        console.log(error)
        return 500
      }
      console.log(`Message sent to ${message.to}`)
    })
    return 200
  }

  const corsOpts: cors.CorsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
      if (origin === process.env.CLIENT_URL) {
        callback(null, true)
      } else {
        callback('Error: origin not allowed by CORS')
      }
    }
  }

  const upload: multer.Multer = multer()
  const mailFields: express.RequestHandler = upload.fields([
    {name: 'message', maxCount: 1},
    {name: 'images[]', maxCount: 10}
  ])

  app.post('/send-multipart-message', cors(corsOpts), mailFields, async (req, res) => {
    interface Files {
      [fieldname: string]: Express.Multer.File[] | undefined
    }
    const files = req.files as Files

    const attachments: Attachment[] = []
    if (files && files['images[]']) {
      files['images[]'].map(file =>
        attachments.push({
          filename: file.originalname,
          content: file.buffer
        })
      )
    }

    return res.sendStatus(await sendMail({...req.body.message, attachments}))
  })

  app.post('/send-message', cors(corsOpts), async (req, res) => {
    return res.sendStatus(await sendMail(req.body))
  })
}
