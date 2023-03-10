import axios from "axios"
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../../firebase/config";
import { setEditDpSwitchOn } from "../../../redux/editDp";
import { setEditUserSwitchOn } from "../../../redux/editUser";
import { setSwitchOn } from "../../../redux/members";
import { setJoinedSwitchOn } from "../../../redux/usersJoined";
import Members from "./Members";
import UpdateProfile from "./UpdateProfile";
import UserJoined from "./UserJoined";
import UserProfileEdit from "./UserProfileEdit";

const Profile = () => {
    const [user, setUser] = useState({ email: '', profileImage: '', userName: '' })
    const [community, setCommunity] = useState([]);
    const [joinedEventsRides, setJoinedEventsRides] = useState([]);
    const [distance, setDistance] = useState(0);
    const [fuelEfficiency, setEfficiency] = useState(0);
    const [fuelPrice, setPrice] = useState(0);
    const [tripCost, setCost] = useState(0);
    const [calculatedFuel, setFuel] = useState(0);
    const dispatch = useDispatch()

    const boolean = useSelector((state: any) => state.changeBoolean.boolean);

    const email = localStorage.getItem("email")

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await getIdToken(user);
                axios.post(`${import.meta.env.VITE_SERVER_CONFIG}/api/profile/showProfile`, { email }, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
                    .then((res) => setUser(res.data)
                    )
                    .catch((err) => {
                        toast.warn(err.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    });
                axios.post(`${import.meta.env.VITE_SERVER_CONFIG}/api/profile/showCommunity`, { email }, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
                    .then((res) => setCommunity(res.data)
                    )
                    .catch((err) => {
                        toast.warn(err.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    });
                axios.get(`${import.meta.env.VITE_SERVER_CONFIG}/api/profile/showJoinedEventsRides`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                })
                    .then((res) => setJoinedEventsRides(res.data))
                    .catch((err) => {
                        toast.warn(err.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    });
            }
        })
    }, [boolean])

    const printMembers = (data: any) => {
        dispatch(setSwitchOn(data))
    }

    const openModal = (name: any) => {
        dispatch(setEditDpSwitchOn(name))
    }

    const openUserEdit = (name: any) => {
        dispatch(setEditUserSwitchOn(name))
    }

    const getMembersList = (id: any) => {
        dispatch(setJoinedSwitchOn(id))
    }

    const calculate = () => {
        let fuel: number = distance / fuelEfficiency;
        let tripCost: number = fuel * fuelPrice;
        setFuel(Math.round(fuel));
        setCost(Math.round(tripCost));
    }
    return (
        <div className="w-full absolute h-screen flex md:flex-row flex-col">
            <Members />
            <UserJoined />
            <UpdateProfile />
            <UserProfileEdit />
            <ToastContainer />
            <div className="profileSection w-full h-full justify-center flex flex-row">
                <div className="flex flex-col items-center bg-black/40 backdrop-blur-2xl p-5 w-full">
                    <div onClick={() => { user && openModal(user.email) }} className="group block cursor-pointer rounded-b-2xl w-80">
                        {user?.profileImage ?
                            (
                                <img className="rounded-xl inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                    src={`${import.meta.env.VITE_SERVER_CONFIG}/api/profile/image?q=${user.profileImage}`}
                                    alt=""
                                />
                            ) : (
                                <img className="rounded-xl inset-0 h-full object-cover opacity-75 transition-opacity group-hover:opacity-50" src="https://www.transparentpng.com/thumb/user/blak-frame-user-profile-png-icon--cupR3D.png" alt="blak frame user profile png icon @transparentpng.com" />
                            )
                        }
                    </div>
                    <div className="mt-5 w-full p-2">
                        <div className="w-full flex flex-row justify-end text-lg">
                            <FaUserEdit className="cursor-pointer" onClick={() => openUserEdit(user.email)} />
                        </div>
                        <div className="flex flex-row items-center w-full">
                            <p className="mx-2 text-lg font-bold">Name:</p>
                            <p>{user && user.userName ?
                                <div>

                                    <p>{user.userName}</p>

                                </div>
                                :
                                <div>

                                    <p className="text-gray-500">Please add your name</p>

                                </div>
                            }</p>
                        </div>
                        <div className="flex flex-row items-center w-full">
                            <p className="mx-2 text-lg font-bold">Email:</p>
                            <p className="text-sm">{localStorage.getItem('email')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profileElements p-12 h-full flex w-full flex-col overflow-y-auto scrollbar-hide">
                <div className="mt-4">
                    <h1 className="font-bold text-lg mb-5">Your Community</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Trip distance
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fuel efficiency
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fuel price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Estimated price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fuel required
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-black">
                                    <td>
                                        <input type="number" value={distance} onChange={(e: any) => setDistance(e.target.value)} className="bg-gray-200 text mx-2 text-black w-3/6 text-center" /> Km
                                    </td>
                                    <td>
                                        <input type="number" value={fuelEfficiency} onChange={(e: any) => setEfficiency(e.target.value)} className="bg-gray-200 text mr-2 text-black w-3/6 text-center" /> Kmpl
                                    </td>
                                    <td>
                                        <input type="number" value={fuelPrice} onChange={(e: any) => setPrice(e.target.value)} className="bg-gray-200 text mr-2 text-black w-3/6 text-center" /> Rs
                                    </td>
                                    <td>
                                        <input type="number" value={tripCost} className="bg-green-200 text mr-2 text-black w-3/6 text-center" /> Rs
                                    </td>
                                    <td>
                                        <input type="number" value={calculatedFuel} className="bg-yellow-200 mr-2 text text-black w-3/6 text-center" /> L
                                    </td>
                                    <td>
                                        <button onClick={calculate} className="text-white block w-full my-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Calculate</button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-center items-center'>
                    <div className='w-10 h-0.5 bg-gray-500' />
                    <img src="./src/assets/Images/book-a-service.svg" className='w-12' alt="" />
                    <div className='w-10 h-0.5 bg-gray-500' />

                </div>
                <div className="mt-4">
                    <h1 className="font-bold text-lg mb-5">Your Community</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Community name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Members
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Events
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Rides
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Get Members
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {community.length > 0 && community.map((data: any) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {data.groupName}
                                            </th>
                                            <td className="px-6 py-4">
                                                {data.members.length}
                                            </td>
                                            <td className="px-6 py-4">
                                                {data.events.length}
                                            </td>
                                            <td className="px-6 py-4">
                                                {data.rides.length}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <button onClick={() => printMembers(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='w-full flex flex-row justify-center items-center'>
                    <div className='w-10 h-0.5 bg-gray-500' />
                    <img src="./src/assets/Images/book-a-service.svg" className='w-12' alt="" />
                    <div className='w-10 h-0.5 bg-gray-500' />

                </div>

                <div className="mt-4">
                    <h1 className="font-bold text-lg mb-5">Your Rides</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Ride name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Community name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Registration ends in
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Flag off
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {community.length > 0 && community.map((data: any) => {
                                    return (
                                        data.rides.length > 0 && data.rides.map((ride: any) => {
                                            const date = new Date(ride.expirationDate);
                                            const day = date.getDate();
                                            const month = date.getMonth() + 1;
                                            const year = date.getFullYear();

                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {ride.description}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {data.groupName}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {`${day}-${month}-${year}`}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            {/* <button onClick={() => printMembers(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button> */}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => getMembersList(ride._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button>
                                                    </td>
                                                </tr>
                                            )


                                        }))
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className='w-full flex flex-row justify-center items-center'>
                    <div className='w-10 h-0.5 bg-gray-500' />
                    <img src="./src/assets/Images/book-a-service.svg" className='w-12' alt="" />
                    <div className='w-10 h-0.5 bg-gray-500' />

                </div>
                <div className="mt-4">
                    <h1 className="font-bold text-lg mb-5">Your Events</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Event name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Community name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Registration ends in
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Event date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {community.length > 0 && community.map((data: any) => {
                                    return (
                                        data.events.length > 0 && data.events.map((event: any) => {
                                            const date = new Date(event.expirationDate);
                                            const day = date.getDate();
                                            const month = date.getMonth() + 1;
                                            const year = date.getFullYear();

                                            return (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {event.description}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {data.groupName}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {`${day}-${month}-${year}`}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            {/* <button onClick={() => printMembers(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button> */}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => getMembersList(event._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button>
                                                    </td>
                                                </tr>
                                            )


                                        }))
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='w-full flex flex-row justify-center items-center'>
                    <div className='w-10 h-0.5 bg-gray-500' />
                    <img src="./src/assets/Images/book-a-service.svg" className='w-12' alt="" />
                    <div className='w-10 h-0.5 bg-gray-500' />

                </div>
                <div className="mt-4">
                    <h1 className="font-bold text-lg mb-5">Joined Rides</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Ride name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Community name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Flag off
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {joinedEventsRides.length > 0 &&
                                    joinedEventsRides.map((data: any) => {

                                        return data.regMembers.map((user: any) => {
                                            if (user.email === email && data.eventType === 'ride') {

                                                const date = new Date(data.expirationDate);
                                                const day = date.getDate();
                                                const month = date.getMonth() + 1;
                                                const year = date.getFullYear();
                                                return (
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {data.description}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {data.groupName}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {`${day}-${month}-${year}`}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                {/* <button onClick={() => printMembers(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button> */}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => getMembersList(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">
                                                                Click
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )

                                            }
                                        });
                                    }
                                    )}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='w-full flex flex-row justify-center items-center'>
                    <div className='w-10 h-0.5 bg-gray-500' />
                    <img src="./src/assets/Images/book-a-service.svg" className='w-12' alt="" />
                    <div className='w-10 h-0.5 bg-gray-500' />

                </div>
                <div className="mt-4">
                    <h1 className="font-bold text-lg mb-5">Joined Events</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Event name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Community name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Event date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {joinedEventsRides.length > 0 &&
                                    joinedEventsRides.map((data: any) => {

                                        return data.regMembers.map((user: any) => {
                                            if (user.email === email && data.eventType === 'event') {

                                                const date = new Date(data.expirationDate);
                                                const day = date.getDate();
                                                const month = date.getMonth() + 1;
                                                const year = date.getFullYear();
                                                return (
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {data.description}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {data.groupName}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {`${day}-${month}-${year}`}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                {/* <button onClick={() => printMembers(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button> */}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => getMembersList(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">
                                                                Click
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )

                                            }
                                        });
                                    }
                                    )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile