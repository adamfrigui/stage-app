import { useEffect ,useState} from "react"
import { useNavigate, Outlet } from "react-router-dom"
import axios from "axios"

const AdminRoutes = () => {
     
  const navigate = useNavigate()
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
    const {type} = data
    
    return (
        type ==="Admin" ? <Outlet/> : navigate('/unauthorized')

    )
}

export default AdminRoutes