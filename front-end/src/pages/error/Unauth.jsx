import React from 'react'
import { Link } from 'react-router-dom'
import "./ErrorStyle.scss"

const Unauth = () => {
    return (
        <div className='error-page'>
            <div className="content">
                <h1 className='header'>401</h1>
                <h4>Error 401:Unauthorized</h4>
                <p>You are not authorized to access this page</p>
                <div className="btns">
                    <Link to="/">Go back to the Home page</Link>
                </div>
            </div>
        </div>
    )
}

export default Unauth