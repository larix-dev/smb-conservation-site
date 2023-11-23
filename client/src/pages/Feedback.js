import Page from '../components/Page'
import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import {useForm} from 'react-hook-form'
import {useState} from 'react'
import axios from 'axios'
import cx from 'classnames'

function Feedback() {
  const query = gql`
    query Query {
      feedback {
        image {
          url
        }
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

  const document = data?.feedback?.content.document
  const image = data?.feedback?.image?.url

  return (
    <Page name="Feedback">
      <div className="flex flex-col gap-8">
        <div className="prose max-w-none">
          <DocumentRenderer document={document} />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <FeedbackForm />
          </div>
          <div className="flex-1">
            <img className="w-full" src={image} alt="Feedback page" />
          </div>
        </div>
      </div>
    </Page>
  )
}

function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm()

  const onSubmit = async data => {
    const {name, email, phone, message, images} = data

    const text = `Feedback Received\nName: ${name}\nEmail: ${email}\nPhone Number: ${phone}\n\nMessage:\n${message}\n`

    const body = {
      to: 'yorkejohn02@gmail.com',
      subject: `Feedback from ${name}`,
      text: text
    }

    await axios.postForm('/send-multipart-message', {message: body, images})

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
              className={cx({invalid: errors.name})}
            />
            {errors.name && (
              <p className="text-sm text-red-600">Please enter a name that is under 40 characters long</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="yourname@example.com"
              {...register('email', {required: true})}
              className={cx({invalid: errors.email})}
            />
            {errors.email && <p className="text-sm text-red-600">Please enter a valid email</p>}
          </div>
          <div>
            <label htmlFor="phone">Phone number (optional)</label>
            <input
              type="tel"
              id="phone"
              placeholder="(902) 555-1234"
              {...register('phone', {pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im})}
              className={cx({invalid: errors.phone})}
            />
            {errors.phone && <p className="text-sm text-red-600">Please enter a valid phone number</p>}
          </div>
          <div>
            <label htmlFor="message">Message (optional)</label>
            <textarea
              rows="6"
              id="message"
              className="resize-none"
              placeholder="Tell us how we did!"
              {...register('message')}
            ></textarea>
          </div>
          <label htmlFor="image">Upload images (optional)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            multiple
            {...register('images', {required: false})}
          />
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

export default Feedback
