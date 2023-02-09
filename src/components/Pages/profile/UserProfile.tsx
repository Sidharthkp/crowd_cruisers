import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setSwitchOn } from "../../../redux/members";
import Members from "./Members";

const Profile = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [community, setCommunity] = useState([]);
    const [distance, setDistance] = useState(0);
    const [fuelEfficiency, setEfficiency] = useState(0);
    const [fuelPrice, setPrice] = useState(0);
    const [tripCost, setCost] = useState(0);
    const [calculatedFuel, setFuel] = useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        const email = localStorage.getItem("email")
        axios.post("http://localhost:3000/api/profile/showProfile", { email })
            .then((res) => setUser(res.data)
            )
            .catch((err) => console.log(err));
        axios.post("http://localhost:3000/api/profile/showCommunity", { email })
            .then((res) => setCommunity(res.data)
            )
            .catch((err) => console.log(err));
    }, [user, community])

    const printMembers = (data: any) => {
        dispatch(setSwitchOn(data))
    }

    const calculate = () => {
        let fuel: number = distance / fuelEfficiency;
        let tripCost: number = fuel * fuelPrice;
        setFuel(Math.round(fuel));
        setCost(Math.round(tripCost));
    }
    return (
        <div>
            <div className="w-full h-screen mt-16 flex flex-row bg-gray-700">
                <Members />
                <div className="w-2/6 h-full flex flex-row bg-gray-900">
                    <div className="flex flex-col items-center w-full">
                        <div className="rounded-b-2xl w-4/6 h-3/6">
                            <img className="rounded-b-2xl" src="https://avatars.githubusercontent.com/u/54587044?v=4" alt="" />
                        </div>
                        <div className="flex flex-row items-center w-full px-5">
                            <h1 className="mx-2 text-lg font-bold">Name:</h1>
                            <h1>{user && user.name ?
                                <div>

                                    <h1>{user.name}</h1>

                                </div>
                                :
                                <div>

                                    <h1 className="text-gray-500">Please add your name</h1>

                                </div>
                            }</h1>
                        </div>
                        <div className="flex flex-row items-center w-full px-5">
                            <h1 className="mx-2 text-lg font-bold">Email:</h1>
                            <h1>{localStorage.getItem('email')}</h1>
                        </div>
                    </div>
                </div>
                <div className="w-4/6 h-full flex flex-col overflow-y-auto scrollbar-hide">
                    <div className="m-5">
                        <h1 className="font-bold text-lg mb-5">Fuel Cost Calculator</h1>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            <input type="number" value={distance} onChange={(e: any) => setDistance(e.target.value)} className="bg-gray-400 text text-black w-3/6 text-center" /> Km
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="number" value={fuelEfficiency} onChange={(e: any) => setEfficiency(e.target.value)} className="bg-gray-400 text text-black w-3/6 text-center" /> Kmpl
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="number" value={fuelPrice} onChange={(e: any) => setPrice(e.target.value)} className="bg-gray-400 text text-black w-3/6 text-center" /> Rs
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="number" value={tripCost} className="bg-green-400 text text-black w-3/6 text-center" /> Rs
                                        </td>
                                        <td className="px-6 py-4">
                                            <input type="number" value={calculatedFuel} className="bg-yellow-400 text text-black w-3/6 text-center" /> L
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <button onClick={calculate} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Calculate</button>
                            </div>
                        </div>
                    </div>
                    <div className="m-5">
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

                    <div className="m-5">
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
                                            Members
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Registration Started
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

                                    {/* {community.length > 0 && community.map((data: any) => { */}
                                    {/* return ( */}
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {/* {data.groupName} */}
                                        </th>
                                        <td className="px-6 py-4">
                                            {/* {data.members.length} */}
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* {data.events.length} */}
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* {data.rides.length} */}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                {/* <button onClick={() => printMembers(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button> */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                        </td>
                                    </tr>
                                    {/* ) */}
                                    {/* })} */}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="m-5">
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
                                            Members
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Registration Started
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

                                    {/* {community.length > 0 && community.map((data: any) => { */}
                                    {/* return ( */}
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {/* {data.groupName} */}
                                        </th>
                                        <td className="px-6 py-4">
                                            {/* {data.members.length} */}
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* {data.events.length} */}
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* {data.rides.length} */}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                {/* <button onClick={() => printMembers(data._id)} className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900 flex-row">Click</button> */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                        </td>
                                    </tr>
                                    {/* ) */}
                                    {/* })} */}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile