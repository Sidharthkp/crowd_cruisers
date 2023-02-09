import { CardBody } from '@material-tailwind/react';
import { CardFooter } from '@material-tailwind/react/components/Card';
import { Card, CardHeader } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setRegisterSwitchOn } from '../../redux/registerPage';
import Navbar_user from '../Navbar/User_side/Navbar'
import RegisterPage from './RegisterModal'

const home = () => {
    const [posts, setPosts] = React.useState([]);
    const dispatch = useDispatch()
    const openRegisterModal = (id: any) => {
        dispatch(setRegisterSwitchOn(id))
    }
    const username = localStorage.getItem("email")
    const saveToWishlist = (id: any) => {
        try {
            axios.post("http://localhost:3000/api/userPosts/wishList", { id, username })
                .then((res) => console.log(res)
                )
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/userPosts");
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPosts()
    }, [])

    return (
        <div className='bg-white z-0 pt-16'>
            <div className='h-screen'>
                {posts.length > 0 ? (

                    <div>
                        <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
                            
                            <div className="carousel-inner relative w-full overflow-hidden">
                                {
                                    posts.map((p: any, index: number) => {
                                        return (
                                            <div className={`carousel-item relative float-left w-full ${index === 0 ? 'active' : ''}`}>
                                                <img
                                                    src={`http://localhost:3000/api/userPosts/image?q=${p.image[0]}`}
                                                    className="block w-full"
                                                    alt="..."
                                                />
                                                <div className="carousel-caption hidden md:block absolute text-center">
                                                    <h5 className="text-xl">Slide label</h5>
                                                    <p>{p.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button
                                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        {/* ride */}
                        <div className='mt-5 w-full bg-white p-10'>
                            <div className='flex flex-row'>
                                {
                                    posts.map((p: any) => {
                                        if (p.eventType === 'ride') {
                                            return (


                                                <div>
                                                    <div className='text-black font-bold p-5 text-3xl'>
                                                        <h1>Rides</h1>
                                                    </div>
                                                    <a href="#" className="group relative block bg-black w-2/6">
                                                        <img
                                                            alt="Developer"
                                                            src={`http://localhost:3000/api/userPosts/image?q=${p.image[0]}`}
                                                            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                                        />

                                                        <div className="relative p-8">
                                                            <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                                                                Developer
                                                            </p>

                                                            <p className="text-2xl font-bold text-white">Tony Wayne</p>

                                                            <div className="mt-64">
                                                                <div
                                                                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                                                >
                                                                    <p className="text-sm text-white">
                                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                                                                        perferendis hic asperiores quibusdam quidem voluptates doloremque
                                                                        reiciendis nostrum harum. Repudiandae?
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>

                                                </div>



                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-screen justify-center items-center flex flex-row'>
                        <div className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center">
                            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>

                            <div className="z-10 flex flex-col justify-center items-center text-white w-full h-screen">
                                <h1 className="text-5xl">We are <b>Almost</b> there!</h1>
                                <p>Stay tuned for something amazing!!!</p>



                            </div>

                        </div>

                    </div>
                )}
            </div>
        </div >
    )
}
export default home


// <div key={p._id} className="flex flex-row">
//                                         <div className='absolute'>
//                                             <RegisterPage />
//                                         </div>
//                                         <div className='w-auto'>
//                                             <img src={`http://localhost:3000/api/userPosts/image?q=${p.image[0]}`} alt="" />
//                                         </div>
//                                         <div className='absolute right-2'>
//                                             <div className="registernow">
//                                                 <button onClick={() => { openRegisterModal(p._id) }} className="ctabtn">
//                                                     <span>Register Now</span>
//                                                     <span>
//                                                         <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
//                                                             <g id="arrow" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
//                                                                 <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
//                                                                 <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
//                                                                 <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
//                                                             </g>
//                                                         </svg>
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                             <div className="registernow">
//                                                 <button className="ctabtn" onClick={() => { saveToWishlist(p._id) }}>
//                                                     <span>Save for later</span>
//                                                     <span>
//                                                         <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
//                                                             <g id="arrow" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
//                                                                 <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
//                                                                 <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
//                                                                 <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
//                                                             </g>
//                                                         </svg>
//                                                     </span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>