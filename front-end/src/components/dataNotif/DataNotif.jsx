import './DataNotif.scss'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




const DataNotif = () => {
    const [congeData, setCongeData] = useState([])

    const [tableData, setTableData] = useState([])
    useEffect(() => {
        getUsers();
    }, [])


    const getUsers = async () => {
        const res = await axios.get("/api/users/conge");
        if (res.status === 200) {
            setTableData(res.data);
        }
    }
    const sendEmail = async () => {
        var params = {
            "username": congeData.username,
            "email": congeData.email,
        }
        const res = await axios.post("/mail/sendEmail", params);
        if (res.status === 200) {
            console.log("email sent successfully")
        }
    };

    //1st step get single user on conge
    //2nd step send the user data to acceptedConge table
    //3rd step delete user from Conge table
    const onAcceptConge = async (id) => {
        await axios.get(`/user/conge/${id}`).then(res => {
            setCongeData(res.data)
            console.log(congeData)
        })
            .then(await axios.post("api/accepted/acceptedRegister", congeData))
            .then(await axios.post(`/api/conge/user/${id}`))
            .then(sendEmail())
            .then(getUsers())
            .catch(error => console.log("error : ", error))

    }


    const onDeleteConge = async (id) => {

        if (window.confirm("u sure u wanna do this ?")) {
            await axios.get(`/user/conge/${id}`).then(res => {
                console.log(res.data);
                 axios.post("api/Refused/refusedRegister", res.data)
            }).then(await axios.post(`/api/conge/user/${id}`))
                .then(getUsers())

        }
    }

    return (
        <div className="dataNotif">

            <TableContainer component={Paper} className="data table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">Employee ID</TableCell>
                            <TableCell className="tableCell">Username</TableCell>
                            <TableCell className="tableCell">Email</TableCell>
                            <TableCell className="tableCell" width="50px">Motif Conge</TableCell>
                            <TableCell className="tableCell">Debut Conge</TableCell>
                            <TableCell className="tableCell">Fin Conge</TableCell>
                            <TableCell className="tableCell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow  >
                                <TableCell className="tableCell">{row.id}</TableCell>
                                <TableCell className="tableCell">{row.username}</TableCell>
                                <TableCell className="tableCell">{row.email}</TableCell>
                                <TableCell className="tableCell">{row.motif}</TableCell>
                                <TableCell className="tableCell">{row.debutConge}</TableCell>
                                <TableCell className="tableCell">{row.finConge}</TableCell>
                                <TableCell className="tableCell">{<div className="cellAction">
                                    <Link to={`/users/${row.id}`} style={{ textDecoration: "none" }}>
                                        <div className="viewButton">View</div>
                                    </Link>
                                    <div className="acceptButton" onClick={() => onAcceptConge(row.id)}>Accept</div>
                                    <div className="deleteButton" onClick={() => onDeleteConge(row.id)}>Refuse</div>
                                </div>}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DataNotif