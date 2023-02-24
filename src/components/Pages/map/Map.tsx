import * as React from 'react';
import Map, { GeolocateControl, Marker, Popup } from 'react-map-gl';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import axios from 'axios'
import { format } from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import { booleanSwitch } from '../../../redux/boolean';

const MapPage = () => {
    if (localStorage.getItem("email") !== null) {
        var currentUser = localStorage.getItem("email")
    }

    const dispatch = useDispatch()
    interface Place {
        longitude: number;
        latitude: number;
    }
    interface Pin {
        lat: number;
        lng: number;
        label: string;
    }
    const [pins, setPins] = React.useState<Pin[]>([]);
    const [viewPort, setViewPort] = React.useState({
        longitude: 75.922096,
        latitude: 10.914627,
        zoom: 3
    })
    const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
    const [newTitle, setNewTitle] = React.useState("");
    const [newDescription, setNewDescription] = React.useState("");
    const [newPlace, setNewPlace] = React.useState<Place | null>(null);
    const boolean = useSelector((state: any) => state.changeBoolean.boolean);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setViewPort({
                ...viewPort,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 3.5,
            });
        });
        const getPins = async () => {
            try {
                const res = await axios.get(`http://${import.meta.env.VITE_IP_ADD}:3000/api/pins`);
                setPins(res.data);
            } catch (err) {
                console.log(err);

            }
        }
        getPins()
    }, [boolean])

    const handleShowPopup = async (id: any, latitude: any, longitude: any, username: any) => {
        if (username === currentUser) {
            try {
                await axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/pins/pinDelete`, { id })
                    .then(() =>
                        dispatch(booleanSwitch())
                    )
            } catch (err) {
                console.log(err);

            }
        } else {
            setCurrentPlaceId(id)
            setViewPort({ ...viewPort, latitude: latitude, longitude: longitude })
        }
    }

    const handleAddClick = (e: any) => {
        const { lat: latitude, lng: longitude } = e.lngLat;
        setNewPlace({
            latitude,
            longitude
        })
        dispatch(booleanSwitch())
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newPin = {
            username: currentUser,
            title: newTitle,
            description: newDescription,
            latitude: newPlace?.latitude,
            longitude: newPlace?.longitude
        }

        try {
            const res = await axios.post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/pins`, newPin)
            setPins([...pins, res.data])
            setNewPlace(null);
            dispatch(booleanSwitch())
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <>
            <div className='mt-16'>
                {viewPort.latitude && viewPort.longitude && (
                    <Map
                        initialViewState={{ ...viewPort }}
                        mapboxAccessToken={import.meta.env.VITE_MAPBOX}
                        style={{ width: '100vw', height: '100vh' }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        onDblClick={handleAddClick}
                    >
                        <GeolocateControl
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                        />

                        {/* live location */}
                        <Marker
                            longitude={viewPort.longitude}
                            latitude={viewPort.latitude}
                        />

                        {newPlace &&
                            <Popup longitude={newPlace.longitude} latitude={newPlace.latitude} onClose={() => setNewPlace(null)} closeOnClick={false} closeButton={true} className="text-red-600" anchor="bottom" >

                                <div className="max-w-sm rounded overflow-hidden shadow-lg text-black">
                                    <div className="w-full max-w-xs">
                                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Title
                                                </label>
                                                <input onChange={(e) => setNewTitle(e.target.value)} className="shadow appearance-none border bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Description
                                                </label>
                                                <input onChange={(e) => setNewDescription(e.target.value)} className="shadow appearance-none border bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Tell me more about it" />
                                            </div>
                                            <h1 className='text-red-600 text-sm'>The pin will expire in 5m</h1>
                                            <div className='w-full flex justify-end'>
                                                <button className='rounded-2xl bg-black w-14 h-6 text-white' type='submit'>Share</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </Popup>}


                        {pins.map((p: any) => {

                            return (<div key={p._id}>

                                <Marker longitude={p.longitude} latitude={p.latitude} anchor="bottom">
                                    <FmdGoodIcon key={p._id} onClick={() => handleShowPopup(p._id, p.latitude, p.longitude, p.username)} style={{ fontSize: p.username === currentUser ? 44 : 40, color: p.username === currentUser ? "tomato" : "purple", cursor: "pointer" }} />
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
                            </div>

                            )
                        })}

                    </Map>
                )}
            </div>
        </>
    );
}

export default MapPage;