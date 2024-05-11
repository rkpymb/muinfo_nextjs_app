import React, { useState, useEffect, useContext,memo } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/styles/customstyle.module.css'

import Skeleton from '@mui/material/Skeleton';

import { useRouter, useParams } from 'next/router'


import UserMenu from './UserMenu'
import MainMenu from './MainMenu'
import IconMenu from './IconMenu'


import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


const MainNavBar = () => {

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)


    return (
        <>
            <div className={Mstyles.navbarMain}>
                <div className={Mstyles.NavBarbox}>
                    <div className={Mstyles.NavBarboxA}>
                        <div className={Mstyles.NavLogo} onClick={() => router.push('/')}>
                            <img src='/logo/mu_logo.png' width='100%' />
                        </div>
                    </div>
                    <div className={Mstyles.NavBarboxB}>

                        <div className={Mstyles.NavLeftBox}>
                           <div style={{width:'20px'}}></div>
                            <IconMenu />
                            <div style={{width:'20px'}}></div>
                            <UserMenu />
                        </div>
                    </div>

                </div>
            </div>



        </>
    );
};

export default memo(MainNavBar);
