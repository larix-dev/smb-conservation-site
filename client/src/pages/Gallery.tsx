import {useQuery, gql} from '@apollo/client'
import {useState} from 'react'
import {Link} from 'react-router-dom'

import Page from '../components/Page'
import Filter from '../components/Filter'

interface GalleryImage {
  caption: string
  author: string
  dateTaken: string
  image: {
    url: string
  }
  tags: {
    tagName: string
  }[]
}

export default function Gallery() {
  const [filter, setFilter] = useState<string | null>(null)

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
  interface GalleryData {
    galleryTags: {
      tagName: string
    }[]
    galleryImages: GalleryImage[]
  }

  const {loading, error, data} = useQuery<GalleryData>(query)

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
          <Filter key={i} tag={tag.tagName} filter={filter} callback={(filter: string) => setFilter(filter)} />
        ))}
      </div>
      <div className="columns-xs gap-4">
        {data.galleryImages
          .filter(image => filter === null || image.tags.map(tag => tag.tagName).includes(filter))
          .map((image, i) => (
            <GalleryImage key={i} image={image} filter={filter} />
          ))}
      </div>
    </Page>
  )
}

function GalleryImage(props: {image: GalleryImage; filter: string | null}) {
  const {caption, author, dateTaken, image, tags} = props.image

  return (
    <div
      key={props.filter}
      className="flex flex-col mb-4 break-inside-avoid bg-stone-300 rounded overflow-hidden animate-expand"
    >
      <img src={image.url} alt={caption} />
      <div className="px-2 py-4 prose">
        <div className="text-xs flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span className="bg-stone-400 rounded px-1" key={i}>
              {tag.tagName}
            </span>
          ))}
        </div>
        <div className="text-md font-bold hyphens-auto break-words" lang="en">
          {caption}
        </div>
        <div>{author}</div>
        <div className="text-sm">{new Date(dateTaken).toLocaleDateString('en-US', {dateStyle: 'long'})}</div>
      </div>
    </div>
  )
}
