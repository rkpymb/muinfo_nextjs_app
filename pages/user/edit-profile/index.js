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
import EditProfileData from '/src/components/User/EditProfileData'

import Head from 'next/head';

import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'

import CatlistGrid from '../../components/List/CatlistGrid'


import Footer from '/src/components/Parts/Footer'
import MobileFooter from '/src/components/Parts/Footers/MobileFooter'

import MainMenubox from '/src/components/Parts/MainMenubox'
import NavbarTitle from '/src/components/Parts/Navbar/NavbarTitle'

import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'

function Home() {
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);
    const [PTitle, setPTitle] = useState('Profile Settings');
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
            <div className={Mstyles.NavDevidevendor}></div>
            <NavbarTitle Title={PTitle} />

            {!Loading &&
                <div className={Mstyles.MainVContainer}>
                    <EditProfileData />


                </div>
            }






        </div>
    )
}

export default Home;
