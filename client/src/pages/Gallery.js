import Page from '../components/Page'
import GalleryImage from '../components/GalleryImage'

function Gallery() {
  return (
    <Page name="Gallery">
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