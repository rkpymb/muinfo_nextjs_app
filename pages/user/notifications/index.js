import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'

import NotificationsList from '../../components/user/NotificationsList'
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle';
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

            <NavbarTitle Title={`Notifications`} />
            <div className={Mstyles.Fullbg}>
                <div className={Mstyles.Container}>
                   
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
