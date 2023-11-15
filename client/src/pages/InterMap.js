import Mapbox from '../components/Mapbox'

function InterMap() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Mapbox interactive={true} />
      <div className="bg-stone-200 p-4">
        <button className="bg-stone-300 px-4 rounded">Test Button</button>
      </div>
    </div>
  )
}

export default InterMap
