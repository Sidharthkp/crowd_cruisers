import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../../../../firebase/config';
import { booleanSwitch } from '../../../../redux/boolean';
import { setEditGrpNameSwitchOff } from '../../../../redux/grpName';

const EditGrpName = () => {
    const [grpName, setGrpName] = useState('');
    const opened = useSelector((state: any) => state.showEditGrpName.show);
    const id = useSelector((state: any) => state.showEditGrpName.dataSave);
    
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(setEditGrpNameSwitchOff())
    }

    const adminName = localStorage.getItem('email') || '';


    const handleSubmit = (e: any) => {
        e.preventDefault();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await getIdToken(user);
                axios
                    .post(`${import.meta.env.VITE_SERVER_CONFIG}/api/createGroup/editGroupName`, { id, grpName }, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        }
                    })
                    .then((res) => {
                        toast.success("Edited group name successfully !", {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    })
                    .catch((err) => {
                        toast.warn(err.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    });

                dispatch(setEditGrpNameSwitchOff())
                dispatch(booleanSwitch())
            }
        })
    }

    return (
        <>
            <ToastContainer />
            {opened ? (
                <>
                    <div
                        className="justify-center items-center w-full h-screen flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative">
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
                                                    Edit Name:
                                                </label>
                                            </div>
                                            <div className="md:w-2/3">
                                                <input type="text" onChange={(e) => setGrpName(e.target.value)} className="bg-white text-black text-sm border-2" />
                                            </div>
                                        </div>

                                        <div className="md:flex md:items-center w-full flex flex-row justify-center">
                                            <div className="md:w-2/3">
                                                <button className="shadow bg-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                    Edit
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

export default EditGrpName;