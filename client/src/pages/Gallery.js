import Page from '../components/Page'
import GalleryImage from '../components/GalleryImage'
import GalleryFilter from '../components/GalleryFilter'

function Gallery() {
  return (
    <Page name="Gallery">
      <div className="">
        <GalleryFilter></GalleryFilter>
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
