import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCreateSwitchOff } from '../../../../redux/createModal';

const CreateModal = () => {
    const [roomName, setRoom] = useState('');
    const opened = useSelector((state: any) => state.showCreateModal.show);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(setCreateSwitchOff())
    }

    const adminName = localStorage.getItem('email') || ''


    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        axios
            .post(`http://${import.meta.env.VITE_IP_ADD}:3000/api/createGroup/create`, {roomName, adminName})
            .then((res) => console.log("datasend"))
            .catch((err) => console.log(err));

        dispatch(setCreateSwitchOff())
    }

    return (
        <>
            {opened ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex w-full h-6 flex-row justify-end p-5">
                                    <button onClick={closeModal}><HighlightOffIcon className="text-sm text-purple-500 cursor-pointer" /></button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                                        <div className="md:flex md:items-center mb-6">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                    Name:
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <input type="text" onChange={(e) => setRoom(e.target.value)} className="bg-white text-black text-sm border-2" />
                                            </div>
                                        </div>

                                        <div className="md:flex md:items-center">
                                            <div className="md:w-1/3"></div>
                                            <div className="md:w-2/3">
                                                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default CreateModal;