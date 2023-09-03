import React from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFax } from 'react-icons/fa';
import AboutBottom from "./AboutBottom"
function ContactUs() {
  return (
    <div className='cc'>
      <div className='contactus-page'>
        <div className="contact-top">
          <div className="contact-red">

            <h3>Contact Info</h3>
            <div className='new'>
              <div>
                <FaMapMarkerAlt />
                <p className='red-text'>7700, Rajbari Sadar, Bangladesh</p>
              </div>
              <div>
                <FaEnvelope />
                <p>info@affiliatedrefer.com</p>
              </div>
              <div>
                <FaPhone />
                <p className='red-text'>+8801576448378</p>
              </div>
              <div>
                <FaFax />
                <p className='red-text'>---------------------</p>
              </div>
            </div>
          </div>
          <div className="contact-white">
            <div>
              <h2>Get in Direct Contact</h2>
              <p>If you're seeking support as a user, please go to User Support.</p>
            </div>
            <input type="text" name="name" id="" placeholder='Your Name' />
            <input type="email" name="email" id="" placeholder='Your Email' />
            <textarea name="message" id="" cols="30" rows="8" placeholder='Please state your concerns and add necessary details here…'></textarea>
            <button type="submit">SEND</button>
          </div>
        </div>
      </div>
      <AboutBottom />
      <Footer />
    </div>
  )
}

export default ContactUs