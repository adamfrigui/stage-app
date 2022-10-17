
import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";



const List = ({ action }) => {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    getUsers()
  }, [])


  const getUsers = async () => {
    const res = await axios.get("/api/users/Accepted");
    if (res.status === 200) {
      setTableData(res.data);
    }
  }
  
  const onDeleteAccept = async (id) => {

    if (window.confirm("u sure u wanna do this ?")) {
      console.log(id)
        const res = await axios.post(`/api/accepted/user/${id}`);
        if (res.status === 200) {
            getUsers();
        }
    }
}
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">User Name</TableCell>
            <TableCell className="tableCell">motif</TableCell>
            <TableCell className="tableCell">DateDebut</TableCell>
            <TableCell className="tableCell">DateFin</TableCell>
            {action ? <TableCell className="tableCell">Action</TableCell> : ""}

          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">{row.motif}</TableCell>
              <TableCell className="tableCell debut">{row.debutConge}</TableCell>
              <TableCell className="tableCell fin">{row.finConge}</TableCell>
              {action ? <TableCell className="tableCell justifybtn">
                <div className="deleteButton" onClick={() => onDeleteAccept(row._id)}>Delete</div></TableCell> : ""}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default List