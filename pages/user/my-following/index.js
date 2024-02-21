import { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    styled
} from '@mui/material';


import Mstyles from '/Styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'


import Head from 'next/head';

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'

import MyFollowings from '../../components/List/MyFollowings'

import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'
import Footer from '/src/components/Parts/Footer'
import MobileFooter from '/src/components/Parts/Footers/MobileFooter'


function Home() {
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        if (Contextdata.UserLogin) {
            setLoading(false);
        }
    }, [Contextdata.UserData]);
    return (
        <div>

            <MainNavBar />
            <NavbarTitle Title={'My Followings'} />
            <div className={Mstyles.SecDevider}></div>
            {!Loading &&
                <div className={Mstyles.Fullbg}>
                    <div className={Mstyles.MainBox}>
                        <MyFollowings />

                    </div>
                </div>

            }

            <MobileFooter />

        </div>
    )
}

export default Home;
