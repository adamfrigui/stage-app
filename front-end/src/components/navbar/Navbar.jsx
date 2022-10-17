import React, { useState } from 'react'
import './Navbar.scss' 
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import logo from './aa.png'
import { DarkModeContext } from '../../context/darkModeContext'
import { useContext } from 'react';
import {Link } from 'react-router-dom'
 
 

const Navbar = () => {
const [hlal, setHlal] = useState(true)
  const { dispatch } = useContext(DarkModeContext)
 const dispatchDark = () => { dispatch({ type: "TOGGLE" });setHlal(!hlal) }
 
  
  return (
    <div className='navbar'>
      <div className="wrapper">
        
        <div className="items">
          
          <div className="item" onClick={() => dispatchDark()} style={{ cursor: "pointer" }}>
          { hlal ? <DarkModeOutlinedIcon className='icon' /> : <DarkModeIcon className='icon' style={{color:"#ffc20e"}}/> }
          </div>

       
        <Link to="/profile">
          <div className="item">
            <img src={logo} alt="" className='avatar' />
          </div>
          </Link>
        </div>
      </div>
     
    </div>
  )
}

export default Navbar