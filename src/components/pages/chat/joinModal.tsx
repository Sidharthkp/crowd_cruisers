import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from "react-redux";
import { setSwitchOff } from "../../../redux/joinModal";

const Modal = ({ room, setRoom, socket }: any) => {
    const opened = useSelector((state: any) => state.showModal.show);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(setSwitchOff())
    }

    const username = localStorage.getItem('email')

    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }
    };

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
                                    <form action="">
                                        <form className="w-full max-w-sm">
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                        Room Id:
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <select onChange={(e) => setRoom(e.target.value)} className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' name="" id="">
                                                        <option value="">Select your room 👇</option>
                                                        <option value='javascript'>JavaScript</option>
                                                        <option value='node'>Node</option>
                                                        <option value='express'>Express</option>
                                                        <option value='react'>React</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************" />
                                                </div>
                                            </div>
                                            <div className="md:flex md:items-center">
                                                <div className="md:w-1/3"></div>
                                                <div className="md:w-2/3">
                                                    <button onClick={joinRoom} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                                        Join
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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

export default Modal;