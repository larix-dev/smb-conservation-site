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
        author
        dateTaken
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
        Did you take an interesting photo during your visit?&nbsp;
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
            <GalleryImage
              key={i}
              url={image.image.url}
              caption={image.caption}
              author={image.author}
              date={image.dateTaken}
              tags={image.tags}
              filter={filter}
            />
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
    <div
      key={props.filter}
      className="flex flex-col mb-4 break-inside-avoid bg-stone-300 rounded overflow-hidden animate-expand"
    >
      <img src={props.url} alt={props.caption} />
      <div className="px-2 py-4 prose">
        <div className="text-sm flex flex-wrap gap-1">
          {props.tags.map((tag, i) => (
            <span className="bg-stone-200 rounded px-1" key={i}>{tag.tagName}</span>
          ))}
        </div>
        <div className="text-md font-bold hyphens-auto break-words" lang="en">
          {props.caption}
        </div>
        <div>{props.author}</div>
        <div className="text-sm">{new Date(props.date).toLocaleDateString('en-US', {dateStyle: 'long'})}</div>
      </div>
    </div>
  )
}

export default Gallery
