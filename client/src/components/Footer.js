import {FaMap, FaPhone, FaInstagram, FaFacebook} from 'react-icons/fa'

import Logo from './Logo'
import NavLink from './NavLink'

function Footer() {
  return (
    <div className="bg-stone-900 text-white flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-0 p-8 pb-6 max-w-screen-lg">
        <div className="flex-1 flex flex-col gap-2">
          <Logo />
          <div>
            <FaMap className="inline" />
            &nbsp;100 Conservation Road
            <br />
            St. Margaret's Bay, NS B1A 1A1
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
            <a href="tel:+19025551234">(902) 555-1234</a>
          </div>
          <div>
            <FaInstagram className="inline" />
            &nbsp;
            <a href="http://instagram.com/smbconservation" target="_blank" rel="noopener noreferrer">
              smbconservation
            </a>
          </div>
          <div>
            <FaFacebook className="inline" />
            &nbsp;
            <a href="http://facebook.com/smbconservation" target="_blank" rel="noopener noreferrer">
              smbconservation
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-stone-300 p-2">Copyright &copy; SMU CSCI 3428 Group F</div>
    </div>
  )
}

export default Footer
