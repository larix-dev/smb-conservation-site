import placeholder from '../assets/images/placeholder.jpeg'

function GalleryImage() {
    return (
        <div class="content-stretch">
            <div class="px-10 pb-4">
                <img src={placeholder} alt="Double-toothed Kite"/>
            </div>
            <p class="text-xl px-10 pb-2">Name</p>
            <p class="px-10 pb-10"  >Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed at felis magna.
            Morbi volutpat vestibulum dui, mollis elementum
            velit pellentesque quis. Donec scelerisque augue 
            nec lobortis condimentum.</p>
        </div>
    )
  }
  
  export default GalleryImage