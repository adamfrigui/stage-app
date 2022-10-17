import React from 'react'
import { Link } from 'react-router-dom'
import "./ErrorStyle.scss"

const NotFound = () => {
    return (
        <div className='error-page'>
            <div className="content">
                <h1 className='header'>404</h1>
                <h4>Error 404:Sorry ,Not Found</h4>
                <p>The Page you requested could not be found</p>
                <div className="btns">
                    <Link to="/">Go back to the Home page</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound