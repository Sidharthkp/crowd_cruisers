import axios from 'axios';
import React from 'react';
import Navbar_user from '../Navbar/User_side/Navbar'

const home = () => {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/userPosts");

                console.log(res.data);

                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPosts()
    }, [])
    
    return (
        <div className='bg-white'>
            <Navbar_user />
            <div>
                {posts.length > 0 && (

                    <div>
                        {
                            posts.map((p: any) => {
                                return (
                                    <div>
                                        {/* {console.log(p.image[0])} */}
                                        
                                        {/* http://localhost:3000/api/userPosts?q=public/Images/2023-01-28T08-18-09.196Zmotorcycle-landing.jpg */}
                                        <img src={`http://localhost:3000/api/userPosts/image?q=${p.image[0]}`} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default home