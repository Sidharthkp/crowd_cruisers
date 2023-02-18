import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setSwitchOff } from "../../../redux/members";

const Members = () => {
    const [details, setDetails] = useState([])    

    const dispatch = useDispatch()
    const state = useSelector((state: any) => state.showMembers.show);
    const data = useSelector((state: any) => state.showMembers.data);
    
    useEffect(() => {
        console.log(data);
        axios.post(`${import.meta.env.VITE_SERVER_CONFIG}/api/profile/showMembers`, { data })
            .then((res) => setDetails(res.data.members))
            .catch((err) => console.log(err));
    }, [data])
    const closeButton = () => {
        dispatch(setSwitchOff());
    }
    return (
        <>
            {state ?
                <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                    <div className="relative w-full h-full max-w-2xl md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    All Members
                                </h3>
                                <button onClick={closeButton} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                
                                                <th scope="col" className="px-6 py-3">
                                                    Members
                                                </th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {details && details.length > 0 && details.map((data: any) => {
                                                console.log(data);
                                                return (
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="px-6 py-4">
                                                            {data}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Take Print</button>
                            </div>
                        </div>
                    </div>
                </div> : null
            }
        </>
    )
}

export default Members