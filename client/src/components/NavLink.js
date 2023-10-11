import {Link} from 'react-router-dom'

function NavLink(props) {
  return (
    <Link to={props.to} className="text-white hover:underline">
      {props.name}
    </Link>
  )
}

export default NavLink