import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../../context/auth/CheckloginContext'
import Mstyles from '../../../../Styles/mainstyle.module.css'
import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";
import { useRouter, useParams } from 'next/router'
import Link from 'next/link';
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../../Data/config'
import { Router } from 'next/router';
import LocationboxMain from '../LocationboxMain'
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
            <nav className={`${Mstyles.navbarMain} ${scrolling ? Mstyles.white : Mstyles.transparent}`}>
                <div className={Mstyles.Navbar}>
                    <div className={Mstyles.NavA}>
                        <div className={Mstyles.logo}>
                            <Link href='/'>
                                {scrolling ? <div className={Mstyles.logomain}>
                                    <img src='/logo/fmelogodark.svg' alt='logo' width={'100%'} />
                                </div> : <div className={Mstyles.logomain}>
                                    <img src='/logo/fmelogodark.svg' alt='logo' width={'100%'} />
                                </div>

                                }
                            </Link>
                        </div>

                        <div className={Mstyles.OnlyDesktop}>
                            <LocationboxMain />
                        </div>

                    </div>
                    <div className={Mstyles.NavLeft}>
                        <div className={Mstyles.MainMenuBox}>
                            <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.Colorwhite}`}>
                                <Link href='/Vendors' style={{ textDecoration: 'none' }}>
                                    <li>Vendors</li>
                                </Link>
                            </div>
                            <div className={`${Mstyles.MainMenu} ${scrolling ? Mstyles.ColorBlack : Mstyles.Colorwhite}`}>
                                <Link href='/Feeds' style={{ textDecoration: 'none' }}>
                                    <li>Feeds</li>
                                </Link>
                            </div>
                        </div>
                        <div style={{ width: '20px' }}></div>

                        <div className={Mstyles.loginbtnTopBtns}>
                            {!Contextdata.IsLogin && (
                                <Link href='Login' style={{ textDecoration: 'none' }}>
                                    <div className={`${scrolling ? Mstyles.loginbtnTopMainScroll : Mstyles.loginbtnTopMain}`}>
                                        <span><AiOutlineLogin /></span>
                                        <small>Login</small>
                                    </div>
                                </Link>

                            )}
                            {Contextdata.IsLogin && (
                                <Link href='/dashboards/main' style={{ textDecoration: 'none' }}>
                                    <div className={`${scrolling ? Mstyles.loginbtnTopMainScroll : Mstyles.loginbtnTopMain}`}>
                                        <span><VscAccount /></span>
                                        <small>Dashboard</small>
                                    </div>
                                </Link>

                            )}

                        </div>


                    </div>
                </div>
            </nav>
        </>
    );
};

export default MainNavBar;
