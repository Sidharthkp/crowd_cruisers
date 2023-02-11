import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import {useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEditGrpDpSwitchOff } from '../../../../redux/editGrpDp';

const UpdateGrpProfile = () => {
    const [image, setImage] = useState<Blob | null>(null)

    const dispatch = useDispatch()

    const opened = useSelector((state: any) => state.showEditGrpDpModal.show);
    const details = useSelector((state: any) => state.showEditGrpDpModal.dataSave);
    

    const fileInput = useRef<HTMLInputElement>(null);

    const closeModal = () => {
        dispatch(setEditGrpDpSwitchOff())
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();


        const formData = new FormData()

        if (image) {
            formData.append('postImage', image)
        }

        formData.append('id', details)

        axios
            .post("http://localhost:3000/api/createGroup/editImage", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => console.log("datasend")
            )
            .catch((err) => console.log(err));

        dispatch(setEditGrpDpSwitchOff())
    }


    return (
        <>
            {opened ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-screen my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex w-full h-6 flex-row justify-end p-5">
                                    <button onClick={closeModal}><HighlightOffIcon className="text-sm text-blue-500 cursor-pointer" /></button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className='flex flex-col w-full py-5'>
                                        <div className='flex flex-row w-full justify-center'>
                                            <h1 className='text-black mb-5 text-4xl font-bold'>Edit Your Group Profile Picture</h1>
                                        </div>

                                        <div className='flex flex-row justify-center my-6'>
                                            <div className='flex flex-col w-5/6'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Upload banner</label>
                                                {image ?
                                                    <img src={image ? URL.createObjectURL(image) : ''} width="200px" height="200px" alt='' /> : null
                                                }
                                                <input ref={fileInput} name="postImage" onChange={(e: any) => setImage(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-center my-4">
                                            <div className="flex flex-col w-5/6">
                                                <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                                    Update
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

export default UpdateGrpProfile