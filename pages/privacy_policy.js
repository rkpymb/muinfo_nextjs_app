import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';

import MainNavBar from '../src/components/Parts/Navbar/MainNavBar'
import UserSidemenu from '../src/components/Parts/UserSidemenu'
import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'
import AddPost from './components/user/AddPost'
import Feedlist from './components/user/FeedList'
import Categories from './components/user/Categories'
import HomeAsideAddLaptop from './components/Advt/HomeAsideAddLaptop'

function Home() {
    const router = useRouter();
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        Contextdata.ChangeMainLoader(false)

    }, []);




    return (
        <div>
            <MainNavBar />
            <Head>
                <title>Privacy Policy | Magadh University Info</title>
            </Head>


            <div className={Mstyles.Fullbg}>
                <div className={Mstyles.Container}>
                    <div className={Mstyles.OnlyDesktop}>

                        <div className={Mstyles.SecDevider}></div>
                    </div>
                    <div className={Mstyles.PageSection}>
                        <div >

                            <header>
                                <h1>Privacy Policy</h1>
                                <p>Last updated: 01/05/2024</p>
                            </header>

                            <section>
                                <h2>Introduction</h2>
                                <p>Welcome to the "Magadh University Info" app. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our app.</p>
                            </section>

                            <section>
                                <h2>Information We Collect</h2>
                                <p>We may collect personal information such as:</p>
                                <ul>
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Usage data and app activity</li>
                                </ul>
                            </section>

                            <section>
                                <h2>How We Use Your Information</h2>
                                <p>Your personal information may be used for purposes such as:</p>
                                <ul>
                                    <li>Providing and maintaining our app's services</li>
                                    <li>Communicating important updates and announcements</li>
                                    <li>Improving the app based on user feedback</li>
                                    <li>Complying with legal and regulatory requirements</li>
                                </ul>
                            </section>

                            <section>
                                <h2>Data Protection</h2>
                                <p>We take data security seriously and use various measures to protect your information. However, no data transmission over the internet is entirely secure, and we cannot guarantee complete security.</p>
                            </section>

                            <section>
                                <h2>Third-Party Services</h2>
                                <p>We may work with third-party services for specific purposes. These third parties may have access to your information, and their privacy policies will govern how they handle it.</p>
                            </section>

                            <section>
                                <h2>Your Choices</h2>
                                <p>You have the right to access, update, or delete your personal information at any time. Contact us at contact@magadhuniversityinfo.com for any requests.</p>
                            </section>

                            <section>
                                <h2>Contact Us</h2>
                                <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                                <p>Email: contact@magadhuniversityinfo.com</p>
                             
                            </section>
                        </div>

                    </div>


                </div>
            </div>


            <div className={Mstyles.SecDevider}></div>

        </div>



    )
}

export default Home;
