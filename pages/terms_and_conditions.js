import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';

import MainNavBar from '../src/components/Parts/Navbar/MainNavBar'

import { useRouter, useParams } from 'next/router'

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
                <title>Terms and Conditions | Magadh University Info</title>
            </Head>

            <div className={Mstyles.Fullbg}>
                <div className={Mstyles.Container}>
                    <div className={Mstyles.OnlyDesktop}>

                        <div className={Mstyles.SecDevider}></div>
                    </div>
                    <div className={Mstyles.PageSection}>
                        <div>
                            <header>
                                <h1>Terms and Conditions</h1>
                                <p>Last updated: 02/05/2024</p>
                            </header>

                            <section>
                                <h2>Introduction</h2>
                                <p>Welcome to the "Magadh University Info" app. These Terms and Conditions outline the rules and guidelines for using our app. By using our app, you agree to comply with these terms.</p>
                            </section>

                            <section>
                                <h2>Account Registration</h2>
                                <p>Users may be required to create an account to access certain features. You must provide accurate and complete information during registration.</p>
                            </section>

                            <section>
                                <h2>Prohibited Conduct</h2>
                                <p>Users must not engage in any activity that violates laws, regulations, or this agreement, including but not limited to:</p>
                                <ul>
                                    <li>Misusing the app or its content</li>
                                    <li>Engaging in any form of harassment or abuse</li>
                                    <li>Attempting to disrupt the app's operation</li>
                                    <li>Sharing false or misleading information</li>
                                </ul>
                            </section>

                            <section>
                                <h2>Intellectual Property</h2>
                                <p>All content in the app, including text, images, and logos, is owned by us or our licensors. You are not allowed to copy, modify, or distribute our content without permission.</p>
                            </section>

                            <section>
                                <h2>Disclaimer of Warranties</h2>
                                <p>The app is provided "as is" without any warranties of any kind, either express or implied. We do not guarantee the availability, accuracy, or reliability of the app.</p>
                            </section>

                            <section>
                                <h2>Limitation of Liability</h2>
                                <p>We will not be liable for any indirect, incidental, or consequential damages arising from your use of the app.</p>
                            </section>

                            <section>
                                <h2>Termination</h2>
                                <p>We reserve the right to suspend or terminate your access to the app if you violate these terms.</p>
                            </section>

                            <section>
                                <h2>Governing Law</h2>
                                <p>These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved under the exclusive jurisdiction of the courts in [Your Jurisdiction].</p>
                            </section>

                            <section>
                                <h2>Contact Us</h2>
                                <p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
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
