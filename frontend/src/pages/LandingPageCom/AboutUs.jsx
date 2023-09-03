import React from 'react'
import { Link } from "react-router-dom";
import aboutuslogo from '../assets/assets/ARLogo2.png';
import logo from '../assets/assets/affiliatedreferrevertedlogo.png';
import Footer from './Footer'

function AboutUs() {
  return (
    <div className='aboutuspage'>
      <div className='aboutustop'>
        <img src={aboutuslogo} width='150px' alt='about us logo'></img>
        <h3>ABOUT US</h3>
        <p>
          Founded in 2023, affiliatedrefer.com is a place for businesses and influencers to connect and mutually benefit from each other. Our goal is to give every company and content creator a chance to find the right partners, no matter how small or irrelevant they are.
          <br></br><br></br>Millions of small to medium businesses are getting buried by the large whales. On the other hand, there are a lot of small influencers who are struggling to monetize their attention. Naturally, we realized that this was a huge gap in the market. So, we came up with Affiliated Refer, creating a platform for influencers and individual businesses to utilize each other and generate extra revenue for free.
          <br></br><br></br>In respect of user privacy, we barely collect any personal data or store any for the long term from either party. Please read our Privacy Policy for more information.
          <br></br><br></br>We don’t intend to charge anything for most of our resources, and we don’t take any commission from any of the programs that get listed here. We aim to keep it as transparent and fair as possible to deliver a seamless experience.
        </p>
        <img src={logo} width={'480px'} alt='logo' className='inverted'></img>
      </div>
      <div className='about-bottom'>
        <div className='bottom-left'>
          <Link to='/' className='big-link'>Home</Link>
          <Link to='/contact' className='small-links'>CONTACT US</Link>
          <Link to='/support' className='small-links'>USER SUPPORT</Link>
          <Link to='/faqs' className='small-links'>FAQ</Link>
        </div>
        <hr className='horizontall'></hr>
        <div className='bottom-right'>
          <a href='#' className='middle-link'>BLOG POSTS</a>
          <a href='#' className='follow-us'>FOLLOW US</a>
          <div className='icons'>
            <a href="https://www.facebook.com" className='footer-icons'><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.twitter.com" className='footer-icons'><i className="fab fa-twitter"></i></a>
            <a href="https://www.instagram.com" className='footer-icons'><i className="fab fa-instagram"></i></a>
            <a href="https://www.pinterest.com" className='footer-icons'><i className="fab fa-pinterest"></i></a>
            <a href="https://www.youtube.com" className='footer-icons'><i className="fab fa-youtube"></i></a>
            <a href="https://www.linkedin.com/" className='footer-icons'><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs