import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/customstyle.module.css'
import { AiOutlineLogin } from 'react-icons/ai';
import { LuUserPlus, LuGalleryHorizontalEnd, LuLayoutList, LuSearch, LuMessagesSquare, LuMailCheck } from "react-icons/lu";

import Headroom from 'react-headroom'

import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';

import { useRouter, useParams } from 'next/router'
import Link from 'next/link';
import { LuBell, LuMessageCircle } from "react-icons/lu";

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import UserMenu from './UserMenu'
import MainMenu from './MainMenu'
import IconMenu from './IconMenu'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../../Data/config'
import { Router } from 'next/router';
import LocationboxMain from '../LocationboxMain'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { Main } from 'next/document';

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

export default MainNavBar;
