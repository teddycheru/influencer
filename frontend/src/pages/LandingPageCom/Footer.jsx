import React from 'react'
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className='footer-links'>
                <Link to='/terms' className='terms border-right'>TERMS OF USE</Link>
                <Link to='/privacy' className='terms'>PRIVACY POLICY</Link>
            </div>
            <p className='copywrite'>&copy; 2023 affiliatedrefer.com</p>
        </footer>
    )
}

export default Footer