import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'
import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";
import { useRouter, useParams } from 'next/router'
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { BsBell } from "react-icons/bs";
import IconButton from '@mui/material/IconButton';
import { Router } from 'next/router';
import { LuBell, LuMessageCircle } from "react-icons/lu";

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import VendorMenu from './VendorMenu'
const MainNavBar = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                console.log(window.scrollY)
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <>
            <nav className={`${Mstyles.navbarMainVendorDb} ${scrolling ? Mstyles.whiteDbnav : Mstyles.transparentDbnav}`}>
                <div className={Mstyles.VendorDbBoxNav}>
                    <div className={Mstyles.navbarMainNavA}>
                        <div className={Mstyles.logo}>
                            {scrolling ? <div className={Mstyles.logomain}>
                                <img src='/logo/fmelogodark.svg' alt='logo' width={'100%'} />
                            </div> : <div className={Mstyles.logomain}>
                                <img src='/logo/mainlogo.png' alt='logo' width={'100%'} />
                            </div>

                            }
                        </div>
                        <div className={Mstyles.Vendordbtext}>
                            <span>Vendor Dashboard</span>
                        </div>
                    </div>
                    <div className={Mstyles.NavLeft}>
                        <div className={Mstyles.VendorDbMenuBox}>
                            <div className={`${Mstyles.VendorDbMainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.ColorwhiteVdb}`}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    style={{ width: 40, height: 40, color: scrolling ? 'black' : 'white' }}
                                >
                                    <LuBell />
                                </IconButton>
                                <div style={{ width: '10px' }}></div>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    style={{ width: 40, height: 40, color: scrolling ? 'black' : 'white' }}
                                >
                                    <LuMessageCircle />
                                </IconButton>
                            </div>


                        </div>
                        <div style={{ width: '20px' }}></div>

                        <div className={Mstyles.VendorNavbtnTopBtns}>
                            {Contextdata.VendorLogin && (
                                <div>

                                    <VendorMenu/>
                                </div>

                            )}

                        </div>


                    </div>
                </div>
            </nav>
        </>
    );
};

export default MainNavBar;
