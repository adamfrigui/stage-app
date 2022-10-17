
import React from 'react'
import { useEffect, useState } from 'react'
import "./Login.scss"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import PropagateLoader from "react-spinners/PropagateLoader";

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])
 

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json "
      }
    }
    try {
      const { data } = await axios.post("/api/auth/login", { email, password }, config)
      localStorage.setItem("authToken", data.token)
      navigate("/");
 

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => { setError("error") }, 5000)
    }
  }
  return (
    <div>
      {loading ? <div className='splash'>
        <h1 className='fade-in' ><PropagateLoader color={"#71b7e6"} loading={loading} className="yeet" size={30} /> </h1>
      </div> :
      <div className='login'> 
      <h1>Login 
      {error ? <h6 style={{color:"red"}}>{error}</h6> :""}
      </h1>
      
      <form onSubmit={loginHandler}>
        <div className="txt_field">
          <input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
          <span></span>
          <label>email</label>
        </div>
        <div className="txt_field">
          <input type="password" required    onChange={(e) => setPassword(e.target.value)} value={password}/>
          <span></span>
          <label>Password</label>
        </div>
      
        <input type="submit" value="Login" className='button-log' />
      
      </form>
      </div>}
    </div>

  )
}

export default Login