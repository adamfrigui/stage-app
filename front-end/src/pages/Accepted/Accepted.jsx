import React from 'react'
import DataNotif from '../../components/dataNotif/DataNotif'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import List from '../../components/table/table'
import './Accepted.scss'

const Accepted = () => {
    return (
        <div className="accepted">
            <Sidebar />
            <div className="acceptedContainer">
                <Navbar />
                <List action={"action"}/>
            </div>
        </div>
    )
}

export default Accepted