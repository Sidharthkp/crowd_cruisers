import Map, { Marker } from 'react-map-gl';
import Navbar_user from '../Navbar/User_side/Navbar'
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const MapPage = () => {
    return (
        <>
            <Navbar_user />
            <div>
                <Map
                    initialViewState={{
                        longitude: 48.858093,
                        latitude: 2.294694,
                        zoom: 4
                    }}
                    mapboxAccessToken={import.meta.env.VITE_MAPBOX}
                    style={{ width: '100vw', height: '100vh' }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                    <Marker longitude={48.858093} latitude={2.294694} anchor="bottom">
                        <FmdGoodIcon className='text-red-600'/>
                    </Marker>
                </Map>
            </div>
        </>
    );
}

export default MapPage;