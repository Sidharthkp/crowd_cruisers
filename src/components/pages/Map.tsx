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
                        longitude: 75.922096,
                        latitude: 10.914627,
                        zoom: 3
                    }}
                    mapboxAccessToken={import.meta.env.VITE_MAPBOX}
                    style={{ width: '100vw', height: '100vh' }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                    <Marker longitude={75.922096} latitude={10.914627} anchor="bottom">
                        <FmdGoodIcon style={{ fontSize: 64, color: "tomato", cursor: "pointer" }} />
                    </Marker>
                </Map>
            </div>
        </>
    );
}

export default MapPage;