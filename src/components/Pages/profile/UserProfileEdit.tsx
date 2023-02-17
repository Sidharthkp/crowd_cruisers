import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEditUserSwitchOff } from "../../../redux/editUser";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from "react";
import { booleanSwitch } from "../../../redux/boolean";
import { toast } from "react-toastify";

const UserProfileEdit = () => {
    const [userName, setUserName] = useState('')

    const dispatch = useDispatch()

    const opened = useSelector((state: any) => state.showEditUserModal.show);
    const details = useSelector((state: any) => state.showEditUserModal.dataSave);

    const closeModal = () => {
        dispatch(setEditUserSwitchOff())
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();


        axios
            .post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/profile/profileEdit`, { details, userName })
            .then((res) => {
                toast.success("Succesfully Updated !", {
                    position: toast.POSITION.TOP_CENTER,
                });
                dispatch(booleanSwitch())
            }
            )
            .catch((err) => console.log(err));

        dispatch(setEditUserSwitchOff())
    }

    return (
        <>
            {opened ? (
                <>
                    <div
                        className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-screen my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg p-4 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex w-full h-6 flex-row justify-end p-5">
                                    <button onClick={closeModal}><HighlightOffIcon className="text-sm text-blue-500 cursor-pointer" /></button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className='flex flex-col w-full py-5'>
                                        <div className='flex flex-row w-full justify-center'>
                                            <h1 className='text-black mb-5 text-4xl font-bold'>Edit User Details</h1>
                                        </div>
                                        <div className='flex flex-row w-full justify-center'>
                                            <div className='flex flex-col w-5/6'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                                                <input
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name..."></input>
                                            </div>
                                        </div>

                                        <div className="flex flex-row justify-center my-4">
                                            <div className="flex flex-col w-5/6">
                                                <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                    Post
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default UserProfileEdit