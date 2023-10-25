import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import nodemailer from 'nodemailer'

const port = process.env.PORT || 5051

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const whitelist = ['http://localhost:3000']
const originRule = (origin, callback) => {
  if (whitelist.includes(origin)) {
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
  const {name, email, phone, message} = req.body

  const recipient = 'yorkejohn02@gmail.com' // set to yourself

  const mail = {
    from: 'SMB Woodland Conservation <smbc@larix.dev>',
    to: recipient,
    subject: `Test Message`,
    //html: html, <-- rendered html here
    text: `Feedback received\nName: ${name}\nEmail: ${email}\nPhone Number: ${phone}\n\nMessage:\n${message}`
  }
  
  transport.sendMail(mail, (error) => {
    if(error) {
      return res.send(500)
    }
  })

  return res.send(200)
})
