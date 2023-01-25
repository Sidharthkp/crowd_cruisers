import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import Navbar_user from '../Navbar/User_side/Navbar'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import axios from 'axios'

const MapPage = () => {
    const [pins, setPins] = React.useState([]);
    const [showPopup, setShowPopup] = React.useState(true);

    React.useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get("/pins");
                setPins(res.data);
            } catch (err) {
                console.log(err);

            }
        }
        getPins()
    }, [])

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
                    {pins.map((p: any) => {

                        <Marker longitude={p.longitude} latitude={p.latitude} anchor="bottom">
                            <FmdGoodIcon style={{ fontSize: 64, color: "tomato", cursor: "pointer" }} />
                        </Marker>
                        {
                            showPopup && (
                                <Popup longitude={p.longitude} latitude={p.latitude} closeOnClick={false} onClose={() => setShowPopup(false)} closeButton={true} className="text-black" anchor="bottom" >

                                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                        <div className="px-2 py-3">
                                            <div className="font-bold text-xl  text-black">The Coldest Sunset</div>
                                            <p className="text-gray-700 text-base">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                            </p>
                                        </div>
                                    </div>

                                </Popup>
                            )
                        }
                    })}
                </Map>
            </div>
        </>
    );
}

export default MapPage;