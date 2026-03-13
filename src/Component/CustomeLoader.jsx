import React, { memo } from 'react'
import "./Navbar.css";

const CustomeLoader = ({ text = "Loading Please Wait...!" }) => {
    return (
        <div className="loader-overlay">
            <div className="loader-box">
                <div className="spinner"></div>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default memo(CustomeLoader);




