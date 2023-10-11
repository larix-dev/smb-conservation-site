import {useEffect, useRef} from 'react'
import {useQuery, gql} from '@apollo/client'
import cx from 'classnames'

function Banner(props) {
  const query = gql`
    query {
      announcements(where: {active: {equals: true}}) {
        colour
        text
      }
    }
  `
  const {loading, error, data} = useQuery(query)

  const bannerRef = useRef(null)
  
  useEffect(() => {
    if (data) {
      props.callback(bannerRef.current.offsetHeight)
    }
  }, [data, props])

  if (loading || error) {
    return null
  }

  const colours = {
    red: 'bg-red-600',
    orange: 'bg-orange-500',
    yellow: 'bg-amber-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    violet: 'bg-violet-500'
  }

  return (
    <div ref={bannerRef}>
      {data.announcements.map((item, index) => (
        <div key={index} className={cx(colours[item.colour], 'p-1 text-sm text-center text-white')}>
          {item.text}
        </div>
      ))}
    </div>
  )
}

export default Banner
