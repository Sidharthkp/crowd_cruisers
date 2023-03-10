import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from "react-redux";
import { setSwitchOff } from "../../../../redux/joinModal";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { booleanSwitch } from '../../../../redux/boolean';
import { toast, ToastContainer } from 'react-toastify';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../firebase/config';

const JoinModalPage = () => {
    const [groups, setGroup] = useState([]);
    const [selection, setSelection] = useState('');
    const [search, setSearch] = useState("");
    const opened = useSelector((state: any) => state.showModal.show);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(setSwitchOff())
    }
    const boolean = useSelector((state: any) => state.changeBoolean.boolean);

    const username = localStorage.getItem('email');

    const searchData = (data: any) => {
        return search === ""
            ? data
            : data.groupName.toLowerCase().includes(search)
    }

    const getGroups = async () => {
        try {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const token = await getIdToken(user);
                    const res = await axios.post(`${import.meta.env.VITE_SERVER_CONFIG}/api/createGroup/getGroup`, { username }, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        }
                    })
                    setGroup(res.data)
                }
            })
        } catch (err: any) {
            toast.warn(err.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    useEffect(() => {
        getGroups()
    }, [boolean, search])

    const submitAction = (e: any) => {
        e.preventDefault()
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await getIdToken(user);
                axios
                    .post(`${import.meta.env.VITE_SERVER_CONFIG}/api/createGroup/join`, { selection, username }, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        }
                    })
                    .then((res) => {
                        toast.success("Joined Group successfully !", {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    })
                    .catch((err) => {
                        toast.warn(err.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    });

                dispatch(setSwitchOff())
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
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                        Search Room:
                                    </label>
                                    <div className="relative text-gray-600 mb-5 flex flex-row">
                                        <input onChange={(e: any) => {
                                            let searchValue = e.target.value.toLocaleLowerCase();
                                            setSearch(searchValue)
                                        }} type="search" name="search" placeholder="Enter key words and click on select" className="bg-gray-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none z-50" />
                                    </div>
                                    <form className="w-full max-w-sm" onSubmit={submitAction}>
                                        <div className="md:flex md:items-center mb-6">
                                            <div className="md:w-1/3">
                                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                    Room:
                                                </label>
                                            </div>
                                            <div className="md:w-3/3">
                                                <select className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                                                    value={selection}
                                                    onChange={(e: any) => setSelection(e.target.value)}>
                                                    <option className='hidden' value="">Select your room</option>
                                                    {groups?.filter(searchData).map((p: any) =>
                                                    (
                                                        <option value={p?._id} key={p?._id}>{p?.groupName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {/* <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************" />
                                                </div>
                                            </div> */}
                                        <div className="md:flex md:items-center w-full flex flex-row justify-center">
                                            <div className="">
                                                <button className="shadow bg-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                    Join
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

export default JoinModalPage;