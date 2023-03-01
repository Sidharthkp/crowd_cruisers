import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setUnRegisterSwitchOff } from "../../redux/unregister";
import { booleanSwitch } from "../../redux/boolean";
import { useEffect, useState } from "react";

const Unregister = () => {
    const [saved, setSaved] = useState([{ _id: '' }])
    
    const opened = useSelector((state: any) => state.showUnRegisterPage.show);
    const id = useSelector((state: any) => state.showUnRegisterPage.id);
    const dispatch = useDispatch();
    let showBoolean = false

    for (let i = 0; i < saved?.length; i++) {
        if (saved[i]._id === id) {
            showBoolean = true;
            break;
        } else {
            showBoolean = false
        }
    }

    const boolean = useSelector((state: any) => state.changeBoolean.boolean);
    const username = localStorage.getItem("email");


    const closeModal = () => {
        dispatch(setUnRegisterSwitchOff())
    }

    const savedGet = async () => {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_CONFIG}/api/userPosts/savedItems`, { email: username });
        setSaved(res.data.wishList)
    }

    useEffect(() => {
        savedGet()
    }, [boolean])

    const handleSubmitWish = (e: any) => {
        e.preventDefault();

        axios
            .post(`${import.meta.env.VITE_SERVER_CONFIG}/api/userPosts/removeAndAddInWishlist`, { email: username, id })
            .then((res) => {
                dispatch(booleanSwitch())
                toast.success("Un Registered And Added To Wishlist", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            )
            .catch((err) =>
                toast.warn("Already removed", {
                    position: toast.POSITION.TOP_CENTER
                })
            );

        dispatch(setUnRegisterSwitchOff())
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        axios
            .post(`${import.meta.env.VITE_SERVER_CONFIG}/api/userPosts/remove`, { email: username, id })
            .then((res) => {
                dispatch(booleanSwitch())
                toast.success("Un Registered...", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            )
            .catch((err) =>
                toast.warn("Already removed", {
                    position: toast.POSITION.TOP_CENTER
                })
            );

        dispatch(setUnRegisterSwitchOff())
    }

    return (
        <div>
            <ToastContainer />
            {opened ? (
                <div>
                    <div id="popup-modal" tabIndex={-1} className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                        <div className="relative w-full h-full max-w-md md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Un enroll for this program?</h3>
                                    <button onClick={handleSubmit} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, remove
                                    </button>
                                    {
                                        showBoolean ?
                                            (
                                                null
                                            ) : (
                                                <button onClick={handleSubmitWish} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                                    Add to wishlist and remove
                                                </button>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ) : null}
        </div>
    );
}

export default Unregister;