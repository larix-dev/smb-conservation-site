import {Link} from 'react-router-dom'
import {HiSparkles} from 'react-icons/hi2'

import background from '../assets/images/home.jpg'

function Home() {
  return (
    <div
      className="w-full bg-cover bg-center flex flex-col justify-center items-center gap-4"
      style={{backgroundImage: `url(${background})`}}
    >
      <div className="text-4xl text-white font-black text-center px-8">
        Preserving Nova&nbsp;Scotia's
        <br />
        Nature and Heritage
      </div>
      <Link to="about" className="accent-button opacity-90">
        Learn More&nbsp;
        <HiSparkles className="inline" />
      </Link>
    </div>
  )
}

export default Home
