import {useQuery, gql} from '@apollo/client'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import cx from 'classnames'

import Page from '../components/Page'

function Gallery() {
  const [filter, setFilter] = useState(null)

  const query = gql`
    query Query {
      galleryTags {
        tagName
      }
      galleryImages {
        caption
        description
        image {
          url
        }
        tags {
          tagName
        }
      }
    }
  `

  const {loading, error, data} = useQuery(query)

  if (loading || error || !data) {
    return null
  }

  return (
    <Page name="Media Gallery">
      <div className="mb-4">
        Saw something interesting at our site?&nbsp;
        <Link className="underline" to="/feedback">
          Send us some feedback with your image attached
        </Link>
        .
      </div>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {data.galleryTags.map((tag, i) => (
          <Filter key={i} tag={tag.tagName} filter={filter} callback={filter => setFilter(filter)} />
        ))}
      </div>
      <div className="columns-xs gap-4">
        {data.galleryImages
          .filter(image => filter === null || image.tags.map(tag => tag.tagName).includes(filter))
          .map((image, i) => (
            <GalleryImage key={i} url={image.image.url} caption={image.caption} desc={image.description} />
          ))}
      </div>
    </Page>
  )
}

function Filter(props) {
  const selected = props.filter === props.tag

  const buttonClass = cx({'bg-stone-400': selected}, 'bg-stone-300 text-sm py-1 px-4 rounded')

  const handleClick = () => props.callback(selected ? null : props.tag)

  return (
    <div className="flex">
      <button className={buttonClass} onClick={handleClick}>
        {props.tag}
      </button>
    </div>
  )
}

function GalleryImage(props) {
  return (
    <div className="flex flex-col mb-4 break-inside-avoid bg-stone-300 rounded overflow-hidden">
      <img src={props.url} alt={props.caption} />
      <div className="p-2">
        <div className="text-lg font-bold">{props.caption}</div>
        <div className="prose">{props.desc}</div>
      </div>
    </div>
  )
}

export default Gallery
