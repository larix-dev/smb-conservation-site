import axios from 'axios'

function MailTest() {

  const handleClick = async () => {
    const body = {
      name: 'Travis Burke',
      email: 'travis.burke@smu.ca',
      phone: '902-423-3124',
      message: 'I want to be burried in the forest.'
    }
    const data = await axios.post('http://localhost:5051/send-message', body)
    console.log(data.data.message)
  }

  return (
    <div className="p-4">
      <button className="send-button" onClick={handleClick}>Test API</button>
    </div>
  )
}

export default MailTest