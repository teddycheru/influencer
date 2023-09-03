import React, { useState } from 'react';
import AboutBottom from './AboutBottom'
import Footer from './Footer'
import log from "../assets/assets/ARLogo2.png"
function Faq() {
    const [accordionStates, setAccordionStates] = useState(Array(4).fill(false));

    const toggleAccordion = (index) => {
        const newAccordionStates = [...accordionStates];
        newAccordionStates[index] = !newAccordionStates[index];
        setAccordionStates(newAccordionStates);
    };

    return (
        <>
            <div className='accordion-container'>
                <div className='header-container'>
                    <img src={log} alt='about us logo' width="100px" />
                    <h1 className='faq-header'> Frequently Asked Questions</h1>
                    <h3 className='faq-content'>Here are some questions people ask affiliatedrefer.com</h3>
                </div>
                <ul className="accordion">
                    <li className={accordionStates[0] ? 'open' : ''}>
                        <div className="link" onClick={() => toggleAccordion(0)}>
                            Do you verify the programs before they get enlisted?
                            <i className={`fa ${accordionStates[0] ? 'fa-minus' : 'fa-plus'}`}></i>
                        </div>
                        <ul className="submenu" style={{ display: accordionStates[0] ? 'block' : 'none' }}>
                            <li>
                                <p>
                                    We do not hold them for approval. However, we may check either randomly or upon receiving reports of violation and remove/ban them once we determine that they’re indeed violating the community ethics.
                                </p>
                            </li>
                        </ul>
                    </li>

                    <li className={accordionStates[1] ? 'open' : ''}>
                        <div className="link" onClick={() => toggleAccordion(1)}>
                            Do you ensure safe transactions between each party?
                            <i className={`fa ${accordionStates[1] ? 'fa-minus' : 'fa-plus'}`}></i>
                        </div>
                        <ul className="submenu" style={{ display: accordionStates[1] ? 'block' : 'none' }}>
                            <li>
                                <p>
                                    We’re not in charge of affiliate programs run by separate business entities that get posted on the site. We cannot control how they operate inside their programs. Our platform is built on trust and we have varioussystems in place that prevent fraudulent programs from showing up on the feed to a certain degree.
                                </p>
                            </li>
                        </ul>
                    </li>

                    <li className={accordionStates[2] ? 'open' : ''}>
                        <div className="link" onClick={() => toggleAccordion(2)}>
                            Do you take sponsorships from businesses?
                            <i className={`fa ${accordionStates[2] ? 'fa-minus' : 'fa-plus'}`}></i>
                        </div>
                        <ul className="submenu" style={{ display: accordionStates[2] ? 'block' : 'none' }}>
                            <li>
                                <p>
                                    We may show sponsored posts from certain companies that are verified to be safe. However, even if they’re safe, we would still choose very carefully who we decide to take on. Also, since the slots are limited and we’re often booked, it will be difficult to squeeze one in.
                                </p>
                            </li>
                        </ul>
                    </li>

                    <li className={accordionStates[3] ? 'open' : ''}>
                        <div className="link" onClick={() => toggleAccordion(3)}>
                            Do you allow programs that directly feature adult content?
                            <i className={`fa ${accordionStates[3] ? 'fa-minus' : 'fa-plus'}`}></i>
                        </div>
                        <ul className="submenu" style={{ display: accordionStates[3] ? 'block' : 'none' }}>
                            <li>
                                <p>
                                    No. Currently, we do not allow programs that feature adult or explicit content. Perhaps in the future, we may decide to have them in a restricted form and filters.
                                </p>
                            </li>
                        </ul>
                    </li>

                </ul>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <AboutBottom />
            <Footer />
        </>
    );
};

export default Faq;