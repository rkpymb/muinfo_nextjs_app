import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import { AiOutlineLogin } from 'react-icons/ai';
import { VscAccount, VscVerified } from "react-icons/vsc";
import { IoIosCall } from "react-icons/io";

import Link from 'next/link';
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const Navbar = (props) => {
    const Contextdata = useContext(CheckloginContext)
    return (
        <div className={Mstyles.navbarBox}>
            <div className={Mstyles.Navbar}>
                <div className={Mstyles.NavA}>
                    <div className={Mstyles.logo}>
                        <Link href='/'>
                            <div className={Mstyles.logomain}>
                                <img src='/img/mainlogo.svg' alt='logo' width={'100%'}/>
                            </div>
                        </Link>
                    </div>
                    {/* <div style={{marginLeft:'10px'}}>
                        <HeaderMenuLeft/>
                    </div> */}
                    <div className={Mstyles.MainMenu}>
                        <Link href='/Courses' style={{ textDecoration: 'none' }}>
                            <li>Courses</li>
                        </Link>
                    </div>
                    <div className={Mstyles.MainMenu}>
                        <Link href='/TestSeries' style={{ textDecoration: 'none' }}>
                            <li>Tests Series</li>
                        </Link>
                    </div>
                    <div className={Mstyles.MainMenu}>
                        <Link href='/StudyMaterials' style={{ textDecoration: 'none' }}>
                            <li>Materials</li>
                        </Link>
                    </div>
                    <div className={Mstyles.MainMenu} >
                        <Link href='/DoubtsCenter' style={{ textDecoration: 'none' }}>
                            <li>Ask Doubts</li>
                        </Link>
                    </div>
                </div>
                <div className={Mstyles.NavLeft}>

                    <div className={Mstyles.ContactTop}>
                        <div className={Mstyles.Contact_icon}>
                            <span><IoIosCall size={30} /></span>
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