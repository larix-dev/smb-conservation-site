import Page from '../components/Page'
import fern from '../assets/images/fern.jpeg'

function Feedback() {
  return (
    <Page name="Feedback Page">
      <div className="grid gap-10 grid-cols-2 grid-rows-1">
        <FeedbackForm />
        <img className="w-full h-4/5" src={fern} alt="Fern" />
      </div>
    </Page>
  )
}

function FeedbackForm() {
  return (
    <div>
      <p className="text-lg mb-2">Submit your feedback here</p>
      <form action="post">
        <div className="gap-2 mb-4 flex items-center">
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" name="name" id="name" placeholder="Name" />
        </div>
        <div className="gap-2 mb-4 flex items-center">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@domain.com"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          />
        </div>
        <div className="gap-2 mb-4 flex items-center">
          <label htmlFor="phone">Phone</label>
          <br />
          <input type="text" name="phone" id="phone" placeholder="(###) ###-####" />
        </div>
        <div className="gap-2 mb-4">
          <label htmlFor="message">Feedback</label>
          <textarea name="message" id="message" rows="6" placeholder="Write your feedback here" />
        </div>
        <input type="submit" value="Send" className="send-button cursor-pointer" />
      </form>
    </div>
  )
}

export default Feedback
