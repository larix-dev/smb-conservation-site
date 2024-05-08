import {useEffect, useRef} from 'react'
import {useQuery, gql} from '@apollo/client'
import cx from 'classnames'

export default function Banner({callback}: {callback: Function}) {
  const query = gql`
    query {
      announcements(where: {active: {equals: true}}) {
        colour
        text
      }
    }
  `
  interface BannerData {
    announcements: {
      colour: string
      text: string
    }[]
  }

  const {loading, error, data} = useQuery<BannerData>(query)

  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (data) {
      callback(bannerRef.current?.offsetHeight)
    }
  }, [data, callback])

  if (loading || error) {
    return null
  }

  const colours: {[key: string]: string} = {
    red: 'bg-red-600',
    orange: 'bg-orange-500',
    yellow: 'bg-amber-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    violet: 'bg-violet-500'
  }

  return (
    <div ref={bannerRef}>
      {data?.announcements.map((item, index) => (
        <div key={index} className={cx(colours[item.colour], 'p-1 text-sm text-center text-white')}>
          {item.text}
        </div>
      ))}
    </div>
  )
}
