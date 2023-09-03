import React from 'react'
import { Link } from 'react-router-dom'

function AboutBottom() {
    return (
        <div className='about-bottom'>
            <div className='bottom-left'>
                <Link to='/about' className='big-link'>About Us</Link>
                <Link to='/contact' className='small-links'>CONTACT US</Link>
                <Link to='/support' className='small-links'>USER SUPPORT</Link>
                <Link to='/faqs' className='small-links'>FAQ</Link>
            </div>
            <hr className='horizontall'></hr>
            <div className='bottom-right'>
                <Link to='/' className='middle-link'>Home</Link>
                <a href='#' className='follow-us'>BLOG POSTS</a>
                <a href='#' className='follow-us'>FOLLOW US</a>
                <div className='icons'>
                    <a href="#" className='footer-icons'><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className='footer-icons'><i className="fab fa-twitter"></i></a>
                    <a href="#" className='footer-icons'><i className="fab fa-instagram"></i></a>
                    <a href="#" className='footer-icons'><i className="fab fa-pinterest"></i></a>
                    <a href="#" className='footer-icons'><i className="fab fa-youtube"></i></a>
                    <a href="#" className='footer-icons'><i className="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    )
}

export default AboutBottom