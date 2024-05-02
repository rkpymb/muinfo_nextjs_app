import { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';
import EditProfileData from '/src/components/User/EditProfileData'

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'

import NotificationsList from '/src/components/User/NotificationsList'

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

    }, [Contextdata.UserData]);




    return (
        <div>
            <MainNavBar />

            <div className={Mstyles.Fullbg}>
                <div className={Mstyles.Container}>
                    <div className={Mstyles.SecDevider}></div>
                    <div className={Mstyles.ContainerContent}>
                        <NotificationsList Type={1}/>
                    </div>

                </div>
            </div>

            <div className={Mstyles.SecDevider}></div>

        </div>



    )
}

export default Home;
