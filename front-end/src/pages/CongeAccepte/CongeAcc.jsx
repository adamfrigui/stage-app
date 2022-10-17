import { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './CongeAcc.scss'
import axios from 'axios'

const CongeAcc = () => {

    const [accData, setAccData] = useState([])
    useEffect(() => {
        getProfileData();
    }, [])
    const token = localStorage.getItem("authToken")
    

    const getProfileData = () => {
        axios.get('/api/user/accepted', {headers: {'Authorization': `${token}`}})
          .then((res) => {
            setAccData(res.data);
            console.log(accData)
          })
          .catch((error) => {
            console.error(error)
          })
    }



    return (
        <div className="acceptconge">
            <Sidebar />
            <div className="acceptcongeContainer">
                <Navbar />
                <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">User Name</TableCell>
            <TableCell className="tableCell">motif</TableCell>
            <TableCell className="tableCell">DateDebut</TableCell>
            <TableCell className="tableCell">DateFin</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {accData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">{row.motif}</TableCell>
              <TableCell className="tableCell debut">{row.debutConge}</TableCell>
              <TableCell className="tableCell fin">{row.finConge}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            </div>
        </div>
    )
}

export default CongeAcc