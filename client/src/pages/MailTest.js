import axios from 'axios'

function MailTest() {

  const handleClick = async () => {
    /* these would come from a form */
    const name = 'John Yorke'
    const email = 'John.Yorke@smu.ca'
    const phone = '9025551234'
    const message = 'This is a test message!'
    /* construct the message (later via an API call to render the HTML) */
    const text = `Feedback received\nName: ${name}\nEmail: ${email}\nPhone Number: ${phone}\n\nMessage:\n${message}`

    const body = {
      to: 'John.Yorke@smu.ca', // business email
      subject: 'Feedback Received',
      text: text
    }
    await axios.post('http://localhost:5051/send-message', body)
  }

  return (
    <div className="p-4">
      <button className="send-button" onClick={handleClick}>Test API</button>
    </div>
  )
}

export default MailTest