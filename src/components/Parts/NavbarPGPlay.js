import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import HeaderMenuLeft from '../Subparts/HeaderMenuLeft'
import Link from 'next/link';
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const Navbar = (props) => {
    const Contextdata = useContext(CheckloginContext)
    return (
        <div className={Mstyles.navbarBoxPGplay}>
            <div className={Mstyles.Navbar}>
                <div className={Mstyles.NavA}>
                    <div className={Mstyles.logo}>
                        <Link href='/'>
                            <div className={Mstyles.logomain}>
                                <img src='/logo/logomain.png' alt='logo' className={Mstyles.NavLogo} />
                            </div>
                        </Link>
                    </div>
                    {/* <div style={{marginLeft:'10px'}}>
                        <HeaderMenuLeft/>
                    </div> */}
                   
                    
                    
                </div>
                <div className={Mstyles.NavLeft}>

                    <div className={Mstyles.ContactTop}>
                        <div className={Mstyles.Contact_icon}>
                            <span><IoIosCall /></span>
                        </div>
                        <div className={Mstyles.Contact_number}>
                            <div className={Mstyles.Contact_number_Text}>
                                <span>Talk to an expert</span>
                            </div>
                            <span>{Contactinfo.MainMobile}</span>
                        </div>
                    </div>
                    <div className={Mstyles.loginbtnTopBtns}>
                        {!Contextdata.IsLogin && (
                            <Link href='Login' style={{ textDecoration: 'none' }}>
                                <div className={Mstyles.loginbtnTop}>
                                    <span><AiOutlineLogin /></span>
                                    <small>Login</small>
                                </div>
                            </Link>

                        )}
                        {Contextdata.IsLogin && (
                            <Link href='/dashboards/main' style={{ textDecoration: 'none' }}>
                                <div className={Mstyles.loginbtnTop}>
                                    <span><VscAccount /></span>
                                    <small>Dashboard</small>
                                </div>
                            </Link>

                        )}

                    </div>

                    {/* <div className={Mstyles.loginbtnTopBtns}>
                        <Link href='/educators' style={{ textDecoration: 'none' }}>
                            <div className={Mstyles.loginbtnTop}>
                                <span><BsFillEmojiSunglassesFill /></span>
                                <small>Become Educator</small>
                            </div>
                        </Link>

                    </div> */}


                </div>
            </div>
        </div >
    )
}

export default Navbar