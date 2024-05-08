import {Link} from 'react-router-dom'

interface NavLinkProps {
  to: string
  name: string
}

export default function NavLink(props: NavLinkProps) {
  return (
    <Link to={props.to} className="text-white hover:underline">
      {props.name}
    </Link>
  )
}
