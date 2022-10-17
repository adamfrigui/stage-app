import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './Conge.scss'
 
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Conge = () => {

  
  const [phone, setPhone] = useState("")
  const [id, setId] = useState("")
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [superieur, setSuperieur] = useState("");
  const [service, setService] = useState("");
  const [type, setType] = useState("");
  const [debutConge, setDebutConge] = useState("");
  const [finConge, setFinConge] = useState("");
  const [motif, setMotif] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProfileData();
  }, [])

  const token = localStorage.getItem("authToken")
  const getProfileData = () => {
    axios.get('/api/profile', { headers: { 'Authorization': `${token}` } })
      .then((res) => {
        setPhone(res.data.phone)
        setUsername(res.data.username)
        setEmail(res.data.email)
        setSuperieur(res.data.superieur)
        setService(res.data.service)
        setType(res.data.type)
        setId(res.data._id)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    if(debutConge>=finConge){
      window.confirm("debut>fin")
    }else{
    const config = {
      header: {
        "Content-Type": "application/json "
      }
    }
    try {
      const { data } = await axios.post("/api/conge/congeRegister",
        { username, email, superieur, service, type, debutConge, finConge, id, motif, phone }, config)

      navigate("/");
      console.log(data)

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => { setError("") }, 5000)
    }
  }
  }
  return (
    <div className="conge">
      <Sidebar />
      <div className="congeContainer">
        <Navbar />
        <div className="top">
          <h1 style={{ color: 'black' }}>Demande Conge {error?<h6>{error}</h6>:""}</h1>
        </div>
        <div className="bottom">
       
          <div className="right">
            <form onSubmit={registerHandler}>

              <div className="formInput">
                <label>ID :</label>
                <input type="text" value={id} />
              </div>

              <div className="formInput">
                <label>Full Name</label>
                <input type="text" value={username} />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input type="text" value={email} />
              </div>
              <div className="formInput">
                <label>Supérieur immédiat</label>
                <input type="text" value={superieur} />
              </div>
              <div className="formInput">
                <label>Service</label>
                <input type="text" value={service} />

              </div>
              <div className="formInput">
                <label>Type</label>
                <input type="text" required value={type} />
              </div>
              <div className="formInput">
                <label>Debut conge</label>
                <input type="date" name="debutConge" required onChange={(e) => setDebutConge(e.target.value)} />
              </div>

              <div className="formInput">
                <label>Fin conge</label>
                <input type="date" name="finConge" required onChange={(e) => setFinConge(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Motif de Conge</label>
                <input type="text" name="finConge" placeholder='motif ...' required onChange={(e) => setMotif(e.target.value)} autoComplete="off" />
              </div>
              <div className='formInput'>
                <label> Phone </label>
                <input type="number" value={phone}/>
              </div>
    
              <button type='submit'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conge