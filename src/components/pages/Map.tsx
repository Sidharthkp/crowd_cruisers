import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import Navbar_user from '../Navbar/User_side/Navbar'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import axios from 'axios'
import { format } from 'timeago.js';

const MapPage = () => {
    interface Place {
        longitude: number;
        latitude: number;
    }
    const currentUser = "Ajmal"
    const [pins, setPins] = React.useState([]);
    const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
    const [newPlace, setNewPlace] = React.useState<Place | null>(null);
    React.useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/pins");
                setPins(res.data);
            } catch (err) {
                console.log(err);

            }
        }
        getPins()
    }, [])

    const handleShowPopup = (id: any) => {
        setCurrentPlaceId(id)
    }

    const handleAddClick = (e: any) => {
        const { lat: latitude, lng: longitude } = e.lngLat;
        setNewPlace({
            latitude,
            longitude
        })
    }

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
                    onDblClick={handleAddClick}
                >
                    {pins.map((p: any) => {
                        console.log(p.longitude, "AND", p.latitude);

                        return (<>

                            <Marker longitude={p.longitude} onClick={() => handleShowPopup(p._id)} latitude={p.latitude} anchor="bottom">
                                <FmdGoodIcon style={{ fontSize: p.username === currentUser ? 64 : 40, color: p.username === currentUser ? "tomato" : "purple", cursor: "pointer" }} />
                            </Marker>


                            {p._id === currentPlaceId && (
                                <Popup longitude={p.longitude} latitude={p.latitude} closeOnClick={false} closeButton={true} className="text-black" anchor="bottom" >

                                    <div className="max-w-sm rounded overflow-hidden shadow-lg text-black">
                                        <div className="px-2 py-3">
                                            <div className="font-bold text-xl">{p.title}</div>
                                            <p className="text-gray-700 text-base">
                                                {p.description}
                                            </p>
                                            <div>{format(p.createdAt)}</div>
                                        </div>
                                    </div>

                                </Popup>
                            )}
                            {newPlace &&
                                <Popup longitude={newPlace.longitude} latitude={newPlace.latitude} onClose={()=>setNewPlace(null)} closeOnClick={false} closeButton={true} className="text-black" anchor="bottom" >

                                    <div className="max-w-sm rounded overflow-hidden shadow-lg text-black">
                                        <div className="px-2 py-3">
                                            {/* <div className="font-bold text-xl">{p.title}</div> */}
                                            <p className="text-gray-700 text-base">
                                                HEllo
                                            </p>
                                            {/* <div>{format(p.createdAt)}</div> */}
                                        </div>
                                    </div>

                                </Popup>}
                        </>

                        )
                    })}

                </Map>
            </div>
        </>
    );
}

export default MapPage;