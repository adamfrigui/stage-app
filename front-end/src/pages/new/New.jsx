import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './New.scss'

import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios"

const New = ({ title }) => {

  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [superieur, setSuperieur] = useState("");
  const [service, setService] = useState("R&D");
  const [type, setType] = useState("Software Developer");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json "
      }
    }
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => { setError("") }, 5000)
      return setError("passwords do not match")
    }

    try {
      const { data } = await axios.post("/api/auth/register", { username, email, password, superieur, service, type, phone }, config)
      navigate("/");


    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => { setError("") }, 5000)
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}
            {error ? <h6>{error}</h6> : ""}
          </h1>
        </div>
        <div className="bottom">
        
          <div className="right">
            <form onSubmit={registerHandler}>    
              <div className="formInput">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" required onChange={(e) => setUsername(e.target.value)} />
              </div>
              

              <div className="formInput">
                <label>Email</label>
                <input type="text" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="formInput">
                  <label>Phone number</label>
                  <input type="number" placeholder="Enter your phone number" required onChange={(e) => setPhone(e.target.value)} />
                </div>
              <div className="formInput">
                <label>Supérieur immédiat</label>
                <input type="text" placeholder="Enter name..." required onChange={(e) => setSuperieur(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Service</label>
                <select id="service" name="service" className='dropdown' value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="R&D">R&D</option>
                  <option value="Prod">Prod</option>
                </select>
              </div>
              <div className="formInput">
                <label>Type</label>
                <select id="type" name="type" className='dropdown' value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Administration">Admin</option>
                  <option value="Security">Security</option>
                  <option value="Mecatronic">Mecatronics</option>
                  <option value="Design Product">Design Produit</option>
                  <option value="Ai">Ai</option>
                  <option value="Design Product">Financial</option>
                  <option value="Design Product">Commercial</option>
                </select>
              </div>
              <div className="formInput">
                <label>password</label>
                <input type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="formInput abc">
                <label>confirm password</label>
                <input type="password" placeholder="confirm your password" required onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New