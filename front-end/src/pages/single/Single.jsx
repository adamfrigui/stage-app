import './Single.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import logo from './aa.png'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
 

const Single = () => {
  const { userid } = useParams();
  console.log(userid)

  const [data, setData] = useState([])
  useEffect(() => {
    getSingleUser(userid);
  }, [])
  


  const getSingleUser = async (id) => { 
    const res = await axios.get(`/user/${id}`);
    if(res.status ===200){
      setData(res.data);
      console.log(data)
    }
   }
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={logo} alt="" className='itemImg' />
              <div className="details">
                <h1 className="itemTitle">{data.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemKey">{data._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email :</span>
                  <span className="itemKey">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Superieur :</span>
                  <span className="itemKey">{data.superieur}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type :</span>
                  <span className="itemKey">{data.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Service:</span>
                  <span className="itemKey">{data.service}</span>
                </div>
          
              </div>
            </div>
          </div>
        
        </div>
       
      </div>
    </div>
  )
}

export default Single