// import {DocumentRenderer} from '@keystone-6/document-renderer'
// import {useQuery, gql} from '@apollo/client'

import Page from '../components/Page'
import GalleryImage from '../components/GalleryImage'
import GalleryFilterTag from '../components/GalleryFilterTag'


function Gallery() {
//   const query = gql`
//   query Query {
//     galleryTag {
//       tagName
//     }
//   }
// }
// `

  return(
    <Page name="Gallery">
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <p className="text-slate-900 text-lg font-bold">Filters:</p>
        <GalleryFilterTag tag="Bird"></GalleryFilterTag>
        <GalleryFilterTag tag="Fungi"></GalleryFilterTag>
        <GalleryFilterTag tag="Tree"></GalleryFilterTag>
        <GalleryFilterTag tag="Plant"></GalleryFilterTag>
        <GalleryFilterTag tag="Land Animal"></GalleryFilterTag>
        <GalleryFilterTag tag="Miscellaneous"></GalleryFilterTag>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
        <GalleryImage></GalleryImage>
      </div>
    </Page>
  )
}

export default Gallery
