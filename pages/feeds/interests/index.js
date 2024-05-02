import { useState, useEffect, useContext } from 'react';
import Mstyles from '/styles/customstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import Head from 'next/head';


import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'

import Categories from '../../components/user/Categories'

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
                        <Categories Type={1}/>
                    </div>

                </div>
            </div>

            <div className={Mstyles.SecDevider}></div>

        </div>



    )
}

export default Home;
