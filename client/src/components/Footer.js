import {FaMap, FaPhone, FaInstagram, FaFacebook} from 'react-icons/fa'
import {useQuery, gql} from '@apollo/client'

import Logo from './Logo'
import NavLink from './NavLink'

function Footer() {
  const query = gql`
    query Query {
      footer {
        Phone
        addressLine1
        addressLine2
        socialMediaLink1
        socialMediaLink2
        socialMediaHandle1
        socialMediaHandle2
      }
    }
  `
  const {loading, error, data} = useQuery(query)

  console.log(data)

  if (loading || error || !data) {
    return null
  }

  const addressLine1 = data.footer.addressLine1
  const addressLine2 = data.footer.addressLine2
  const Phone = data.footer.Phone
  const socialMediaLink1 = data.footer.socialMediaLink1
  const socialMediaLink2 = data.footer.socialMediaLink2
  const socialMediaHandle1 = data.footer.socialMediaHandle1
  const socialMediaHandle2 = data.footer.socialMediaHandle2

  return (
    <div className="bg-stone-900 text-white flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-0 p-8 pb-6 max-w-screen-lg">
        <div className="flex-1 flex flex-col gap-2">
          <Logo />
          <div>
            <FaMap className="inline" />
            &nbsp; {addressLine1}
            <br />
            {addressLine2}
          </div>
        </div>
        <div className="flex-1 flex flex-col lg:text-center">
          <div className="text-md font-bold mb-2">Useful Links</div>
          <NavLink to="feedback" name="Feedback" />
          <NavLink to="disclaimer" name="Disclaimer" />
          <NavLink to="privacy-policy" name="Privacy Policy" />
        </div>
        <div className="flex-1 flex flex-col lg:text-right">
          <div className="text-md font-bold mb-2">Contact</div>
          <div>
            <FaPhone className="inline" />
            &nbsp;
            <a href={`tel:${Phone}`}>{Phone}</a>
          </div>
          <div>
            <FaInstagram className="inline" />
            &nbsp;
            <a href={`${socialMediaLink1}`} target="_blank" rel="noopener noreferrer">
              {socialMediaHandle1}
            </a>
          </div>
          <div>
            <FaFacebook className="inline" />
            &nbsp;
            <a href={`${socialMediaLink2}`} target="_blank" rel="noopener noreferrer">
              {socialMediaHandle2}
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-stone-300 p-2">Copyright &copy; SMU CSCI 3428 Group F</div>
    </div>
  )
}

export default Footer
