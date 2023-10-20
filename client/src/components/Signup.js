import {useState} from 'react'
import FormAction from './FormAction'
import Input from './Input'

const fields = [
  {
    labelText: 'First name',
    labelFor: 'first-name',
    id: 'first-name',
    name: 'First Name',
    type: 'text',
    isRequired: true,
    placeholder: 'First name'
  },
  {
    labelText: 'Last Name',
    labelFor: 'last-name',
    id: 'last-name',
    name: 'Last name',
    type: 'text',
    isRequired: true,
    placeholder: 'Last name'
  },
  {
    labelText: 'Email address',
    labelFor: 'email-address',
    id: 'email-address',
    name: 'email',
    type: 'email',
    isRequired: true,
    placeholder: 'Email address'
  },
  {
    labelText: 'Phone number',
    labelFor: 'phone-number',
    id: 'phone-number',
    name: 'phone',
    type: 'tel',
    isRequired: true,
    placeholder: 'Phone number'
  },
  {
    labelText: 'Message',
    labelFor: 'message',
    id: 'message',
    name: 'message',
    type: 'text',
    isRequired: true,
    placeholder: 'Message'
  }
]

let fieldsState = {}

fields.forEach(field => (fieldsState[field.id] = ''))

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState)

  const handleChange = e => setSignupState({...signupState, [e.target.id]: e.target.value})

  const handleSubmit = e => {
    e.preventDefault()
    console.log(signupState)
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map(field => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Submit" />
      </div>
    </form>
  )
}
