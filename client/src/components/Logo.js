import {Link} from 'react-router-dom'

import logoImage from '../assets/forest_logo.svg'

function Logo() {
  return (
    <Link to="/">
      <div className="text-white flex gap-4 items-center font-logo font-semibold tracking-tighter">
        <img src={logoImage} alt="Forest Logo" className="h-12" />
        <span className="leading-tight">
          St. Margaret's Bay Area
          <br />
          Woodland Conservation
        </span>
      </div>
    </Link>
  )
}

export default Logo
