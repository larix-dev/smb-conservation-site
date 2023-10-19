import placeholder from '../assets/images/c_small.png'

function GalleryImage() {
  return (
    <div className="flex flex-col gap-2">
      <img src={placeholder} alt="Double-toothed Kite" />
      <div class="text-xl">Name</div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at felis magna. Morbi volutpat vestibulum dui,
        mollis elementum velit pellentesque quis. Donec scelerisque augue nec lobortis condimentum.
      </div>
    </div>
  )
}

export default GalleryImage
