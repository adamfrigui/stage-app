import React, { useEffect, useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HouseboatOutlinedIcon from '@mui/icons-material/HouseboatOutlined';
import './Widget.scss'
import axios from 'axios';


const Widget = ({ type }) => {
    useEffect(() => {
        getNumberAcc();
        getNumberusers();
    }, [])
    
const [numberacc, setNumberAcc] = useState("")
const [numberUsers, setNumberUsers] = useState("")

const getNumberAcc = async () => {
    const res = await axios.get("/countAccepted");
    if (res.status === 200) {
      setNumberAcc(res.data);
       
    }
  }
const getNumberusers = async () => {
    const res = await axios.get("/countUser");
    if (res.status === 200) {
        setNumberUsers(res.data);
    }
  }
  

    let data;
 
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                number :`${numberUsers.number}`,
                
                icon: (<PersonOutlineOutlinedIcon className='icon icon-style1' />)
            }
            break;
        case "conge":
            data = {
                title: "USERS ON CONGE",
                number :`${numberacc.number}`,
                 
                icon: (<HouseboatOutlinedIcon className='icon icon-style2' />)
            }
            break;
 
 
        default:
            break;
    }
    return (
        <div className='widget'>
            <div className="left">
                <div className="title">{data.title}</div>
                <div className="counter">{data.number}</div>
            
            </div>
            <div className="right">
                
                {data.icon}
            </div>
        </div>
    )
}

export default Widget