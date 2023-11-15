import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import {useForm} from 'react-hook-form'
import {useState} from 'react'
import {render} from '@react-email/render'
import axios from 'axios'

import Page from '../components/Page'

import BurialMail from '../templates/BurialMail'

import burial from '../assets/images/burial.jpg'

function Burial() {
  const query = gql`
    query Query {
      burial {
        content {
          document
        }
      }
    }
  `

  const {loading, error, data} = useQuery(query)

  if (loading || error || !data) {
    return null
  }

  const document = data.burial.content.document

  return (
    <Page name="Green Burial: Resting in Nature's Embrace">
      <div className="flex flex-col gap-8">
        <div className="prose max-w-none">
          <DocumentRenderer document={document} />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <img src={burial} alt="Burial" />
          </div>
          <div className="flex-1">
            <div className="text-2xl lg:text-4xl tracking-tight font-bold mb-4">Get In Touch</div>
            <BurialForm />
          </div>
        </div>
      </div>
    </Page>
  )
}

function BurialForm() {
  const [submitted, setSubmitted] = useState(false)

  const {register, handleSubmit, reset} = useForm()

  const onSubmit = async data => {
    const html = render(<BurialMail data={data} />, {pretty: true})

    const body = {
      to: 'John.Yorke@smu.ca', // business email
      subject: `Green Burial Inquery from ${data.name}`,
      html: html
    }
    await axios.post('/send-message', body)
    reset()
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              {...register('name', {required: true, maxLength: 40})}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="yourname@example.com"
              {...register('email', {required: true})}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone number</label>
            <input type="tel" id="phone" placeholder="(902) 555-1234" {...register('phone')} />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              rows="6"
              id="message"
              className="resize-none"
              placeholder="Ask us about our green burial services."
              {...register('message')}
            ></textarea>
          </div>
        </div>
        {submitted && (
          <div className="text-sm text-green-800">
            Thank you for your message. We will get back to you as soon as possible.
          </div>
        )}
        <input type="submit" value="Send" className="send-button cursor-pointer" />
      </div>
    </form>
  )
}

export default Burial
