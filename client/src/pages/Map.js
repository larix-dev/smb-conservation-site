import Page from '../components/Page'
import placeholderMap from '../assets/images/Temp_Map.jpg'

function Map() {
    return (
        <Page name="Map">
            <div class="flex justify-center items-center">
                <img src={placeholderMap} alt="placeholder map"></img>
            </div>
        </Page>
    )
}

export default Map