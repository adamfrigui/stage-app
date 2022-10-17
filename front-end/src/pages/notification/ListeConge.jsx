import React from 'react'
import DataNotif from '../../components/dataNotif/DataNotif'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './ListeConge.scss'

const ListeConge = () => {
    return (
        <div className="notification">
            <Sidebar/>
            <div className="notifContainer">
                <Navbar />
                <DataNotif/>
            </div>
        </div>
    )
}

export default ListeConge