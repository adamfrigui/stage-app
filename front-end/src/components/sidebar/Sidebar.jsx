import React, { useEffect, useState } from 'react'
import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DoneIcon from '@mui/icons-material/Done';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HouseboatOutlinedIcon from '@mui/icons-material/HouseboatOutlined';
import { Link } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const Sidebar = () => {
     
    const [data, setData] = useState([])
    const [admin,setAdmin] = useState(false)
    useEffect(() => {
        getProfileData();
        const {type} = data;
        console.log(type)
        
        if (data.type ==="Admin"){
            setAdmin(true);
            console.log(admin)
        } 
    }, [data.type])

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




    const handleLogout = () => {
        localStorage.removeItem("authToken")
    }
    return (
        <div className="sidebar" style={{left:"0"}}>

            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Test</span>
                </Link>
            </div>

            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li><DashboardIcon className='icon' /> <span>Dashboard</span></li>
                    </Link>
                    {admin ?<>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li><PersonOutlineIcon className='icon' /><span>Users</span></li>
                    </Link>

                    <p className="title">USEFUL </p>
                    <Link to="/ListeConge" style={{ textDecoration: "none" }}>
                        <li><ListIcon className='icon' /><span>Liste de Conge</span></li>
                    </Link>
                    <Link to="/manageaccept" style={{ textDecoration: "none" }}>
                        <li><ListIcon className='icon' /><span>Liste de Accepte</span></li>
                    </Link>
                    </>:""}
                    {!admin ?<>
                    <p className="title">SERVICE</p>
                    <Link to="/conge" style={{ textDecoration: "none" }}>
                        <li><HouseboatOutlinedIcon className='icon' /><span>Demande Conge</span></li>
                    </Link>
                    <Link to="/Congeaccept" style={{ textDecoration: "none" }}>
                        <li><DoneIcon className='icon' /><span>Conge accepte</span></li>
                    </Link>
                    <Link to="/CongeRefuse" style={{ textDecoration: "none" }}>
                        <li><ClearIcon className='icon' /><span>Conge Refuse</span></li>
                    </Link>
                   </>:""}
                    <p className="title">USER</p>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <li><AccountCircleIcon className='icon' /><span>Profile</span></li>
                    </Link>
                    <Link to="/login" style={{ textDecoration: "none" }} onClick={handleLogout}>
                        <li><LogoutIcon className='icon' /><span>Logout</span></li>
                    </Link>
                </ul>
            </div>
        
        </div>
    )
}

export default Sidebar