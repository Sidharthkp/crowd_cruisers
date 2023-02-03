import NavBar from "../../Navbar/User_side/Navbar"

const Profile = () => {

    return (
        <div>
            <NavBar />
            <div className="w-full h-screen flex flex-row bg-gray-700">
                <div className="w-2/6 h-full flex flex-row bg-gray-900">
                    <div className="flex flex-col items-center w-full">
                        <div className="rounded-b-2xl w-4/6 h-3/6">
                            <img className="rounded-b-2xl" src="https://avatars.githubusercontent.com/u/54587044?v=4" alt="" />
                        </div>
                        <div className="flex flex-row items-center">
                            <h1 className="mx-2 text-lg font-bold">Name:</h1>
                            <h1>{localStorage.getItem('email')}</h1>
                        </div>
                    </div>
                </div>
                <div className="w-4/6 h-full flex flex-row">

                </div>
            </div>
        </div>
    )
}

export default Profile