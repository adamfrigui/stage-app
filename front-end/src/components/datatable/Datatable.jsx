import './Datatable.scss'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';




const Datatable = () => {
    const [tableData, setTableData] = useState([])

    const getUsers = async () => {
        const res = await axios.get("api/users");
        if (res.status === 200) {
            setTableData(res.data);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteUser = async (id) => {

        if (window.confirm("u sure u wanna do this ?")) {
            const res = await axios.delete(`/api/auth/user/${id}`);
            if (res.status === 200) {
                getUsers();
            }
        }
    }
 
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to="/users/new" className="link">
                    Add New
                </Link>
            </div>
            <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">Employee ID</TableCell>
                            <TableCell className="tableCell">Username</TableCell>
                            <TableCell className="tableCell">Email</TableCell>
                            <TableCell className="tableCell">Superieur</TableCell>
                            <TableCell className="tableCell">Service</TableCell>
                            <TableCell className="tableCell">Type</TableCell>
                            <TableCell className="tableCell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell className="tableCell">{row._id}</TableCell>
                                <TableCell className="tableCell">{row.username}</TableCell>
                                <TableCell className="tableCell">{row.email}</TableCell>
                                <TableCell className="tableCell">{row.superieur}</TableCell>
                                <TableCell className="tableCell">{row.service}</TableCell>
                                <TableCell className="tableCell">{row.type}</TableCell>
                                <TableCell className="tableCell">{<div className="cellAction">
                                    <Link to={`/users/${row._id}`} style={{ textDecoration: "none" }}>
                                        <div className="viewButton">View</div>
                                    </Link>
                                    <div className="deleteButton" onClick={()=>onDeleteUser(row._id)}>Delete</div>
                                </div>}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Datatable