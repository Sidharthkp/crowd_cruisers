import Map, { Marker } from 'react-map-gl';
import Navbar_user from '../Navbar/User_side/Navbar'

const MapPage = () => {
    return (
        <>
            <Navbar_user />
            <div className='flex flex-row w-full h-screen bg-'>
                <div className='flex flex-col w-3/6 h-full'>
                    <Map
                        initialViewState={{
                            longitude: 46,
                            latitude: 17,
                            zoom: 4
                        }}
                        mapboxAccessToken={import.meta.env.VITE_MAPBOX}
                        style={{ width: "100vw", height: "100vh" }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    />
                    <Marker longitude={-100} latitude={40} anchor="bottom" >
                        <img src="./pin.png" />
                    </Marker>
                </div>
                <div className='flex flex-col w-3/6 h-full'>

                </div>
            </div>
        </>
    );
}

export default MapPage;