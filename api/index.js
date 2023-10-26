import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import nodemailer from 'nodemailer'

const port = process.env.PORT || 5051

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const originRule = (origin, callback) => {
  if (origin === process.env.CLIENT_URL) {
    callback(null, true)
  } else {
    callback('Error: origin not allowed by CORS')
  }
}

app.use(cors({origin: originRule}))

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

app.post('/send-message', async (req, res) => {
  const {to, subject, text} = req.body
  const from = `${process.env.SENDER_NAME} <${process.env.SENDER_ADDR}>`
  const mail = {from, to, subject, text}

  transport.sendMail(mail, error => {
    if (error) {
      console.log(error)
      return res.send(500)
    }
    console.log(`Message sent to ${to}`)
  })

  return res.send(200)
})
