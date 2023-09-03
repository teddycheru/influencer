import React, { useState } from 'react';
import Footer from './Footer';
import newCase from '../assets/assets/brifcase.png';
import liveChat from '../assets/assets/livechat.png';
import AboutBottom from './AboutBottom';

function UserSupport() {

    return (
        <div className='support-container'>
            <p className='support-header'>For business related queries and legal delegations, please go to Contact Us.</p>
            <div className='user-support'>
                <div className='new-case'>
                    <img src={liveChat} width="100px" alt="Live Chat" />
                    <h3>START A NEW CHAT</h3>
                    <p>Open a new case for any problems and concerns that you might have, including as much detail as possible. We will respond to you via email or our platform within a few days.</p>
                    <button onClick={() => alert("For business related queries and legal delegations, please go to Contact Us")}>Add a New Case</button>
                </div>
                <div className='live-chat'>
                    <img src={newCase} width="100px" alt="New Case" />
                    <h3>LIVE CHAT</h3>
                    <p>Start chatting with our support agents dedicated to help resolve any minor issues or answer general questions for you to properly navigate our platform.</p>
                    <button onClick={() => alert("All our representatives are busy at the moment. Please try again later.")}>Start Chatting</button>
                </div>
            </div>
            <AboutBottom />
            <Footer />
        </div>
    );
}

export default UserSupport;