import { useState, useEffect } from 'react'
import './Profile.scss'
import axios from 'axios'
import img1 from './aa.png'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const Profile = () => {
    const [data, setData] = useState("")
    useEffect(() => {
        getProfileData();
    }, [])

    const token = localStorage.getItem("authToken")
    

    const getProfileData = () => {
        axios.get('/api/profile', {headers: {'Authorization': `${token}`}})
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            console.error(error)
          })
    }



    return (
        <div className="profile">
            <Sidebar />
            <div className="profileContainer">
                <Navbar />
                <div className="normalContainer">
                    <div className="left">
                        <img src={img1} alt="user" width="100" />
                        <h5>{data.username}</h5>
                        <p>{data.type}</p>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Information</h3>
                            <div className="info_data">
                                <div className="data">
                                    <h5>username</h5>
                                    <p>{data.username}</p>
                                </div>
                                <div className="data">
                                    <h5>ID</h5>
                                    <p className='id-hid'>{data._id}</p>
                                </div>
                            </div>
                            <div className="info_data">
                                <div className="data">
                                    <h5>Email</h5>
                                    <p>{data.email}</p>
                                </div>
                                <div className="data">
                                    <h5>Phone</h5>
                                    <p>{data.phone}</p>
                                </div>
                            </div>
                            <div className="info_data">
                                <div className="data">
                                    <h5>superieur</h5>
                                    <p>{data.superieur}</p>
                                </div>
                                <div className="data">
                                    <h5>service</h5>
                                    <p>{data.service}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile