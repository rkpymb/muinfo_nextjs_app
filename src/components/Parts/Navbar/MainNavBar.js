import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'
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
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../../Data/config'
import { Router } from 'next/router';
import LocationboxMain from '../LocationboxMain'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const MainNavBar = () => {
    const [DarkMode, setDarkMode] = useState(true);
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [Loading, setLoading] = useState(true);
    const [TopLogo, setTopLogo] = useState('');


    useEffect(() => {
        const storedTheme = window.localStorage.getItem('appTheme');
        if (storedTheme) {
            if (storedTheme === 'DarkMain') {
                setDarkMode(true);
                setTopLogo('/logo/mainlogo.png')

            } else {
                setTopLogo('/logo/fmelogodark.svg')
                setDarkMode(false);

            }

        } else {
            setDarkMode(true);
            setTopLogo('/logo/mainlogo.png')

        }

        setLoading(false)
    }, [router.query, Contextdata.UserData]);

    return (
        <>
            <div className={Mstyles.navbarMain}>
                <BrowserView>
                    {!Loading &&
                        <div className={`${Mstyles.Navbar} ${DarkMode ? Mstyles.bgnavDark : Mstyles.bgnavLight}`}>
                            {Loading ?
                                <div>
                                    <Skeleton variant="text" sx={{ fontSize: '2rem', width: 100 }} />
                                </div> :
                                <div className={Mstyles.NavA}>
                                    <div className={Mstyles.logo} onClick={() => router.push('/')}>
                                        <div className={Mstyles.logomain}>
                                            <img src={TopLogo} alt='logo' width={'100%'} />
                                        </div>
                                    </div>

                                    <div className={Mstyles.LocationboxMainMian}>
                                        {Contextdata.UserLogin &&
                                            <LocationboxMain ShowType={2} />
                                        }
                                    </div>
                                </div>
                            }

                            <div className={Mstyles.NavLeft}>
                                <div className={Mstyles.VendorDbMenuBox}>
                                    <div className={`${Mstyles.VendorDbMainMenu}`}>
                                        <IconButton>
                                            <LuBell />
                                        </IconButton>
                                        <div className={Mstyles.TopmenuWith}></div>
                                        <div className={Mstyles.OnlyDesktop}>
                                            <IconButton>
                                                <LuMessageCircle />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                                <div className={Mstyles.TopmenuWith}></div>
                                <div className={Mstyles.VendorNavbtnTopBtns}>
                                    {Loading ?
                                        <div>
                                            <Skeleton variant="text" sx={{ fontSize: '2rem', width: 100 }} />
                                        </div> :
                                        <div>
                                            {!Contextdata.UserLogin ?
                                                <div className={Mstyles.Mainbtn} onClick={() => router.push('/Login')} >
                                                    <div className={Mstyles.MainbtnA}>
                                                        <LuUserPlus size={20} />
                                                    </div>
                                                    <div className={Mstyles.MainbtnB}>
                                                        <span>Login</span>
                                                    </div>
                                                </div> :
                                                <div>
                                                    <UserMenu />
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }


                </BrowserView>
            </div>

            <div>
                <MobileView>
                    <Headroom
                        style={{
                            webkitTransition: 'all .5s ease-in-out',
                            mozTransition: 'all .5s ease-in-out',
                            oTransition: 'all .5s ease-in-out',
                            transition: 'all .5s ease-in-out',
                          
                        }}
                    >
                        <nav className={`${DarkMode ? Mstyles.bgnavDark : Mstyles.bgnavLight}`}>
                            <div className={Mstyles.Navbar}>
                                <div className={Mstyles.NavA}>
                                    <div className={Mstyles.logo} onClick={() => router.push('/')}>
                                        <div className={Mstyles.logomain}>
                                            <img src={TopLogo} alt='logo' width={'100%'} />
                                        </div>
                                    </div>

                                    <div className={Mstyles.LocationboxMainMian}>
                                        {Contextdata.UserLogin &&
                                            <LocationboxMain ShowType={2} />
                                        }
                                    </div>
                                </div>
                                <div className={Mstyles.NavLeft}>
                                    <div className={Mstyles.VendorDbMenuBox}>
                                        <div className={`${Mstyles.VendorDbMainMenu}`}>
                                            <IconButton>
                                                <LuBell />
                                            </IconButton>
                                            <div className={Mstyles.TopmenuWith}></div>
                                            <div className={Mstyles.OnlyDesktop}>
                                                <IconButton>
                                                    <LuMessageCircle />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Mstyles.TopmenuWith}></div>
                                    <div className={Mstyles.VendorNavbtnTopBtns}>
                                        {Loading ?
                                            <div>
                                                <Skeleton variant="text" sx={{ fontSize: '2rem', width: 100 }} />
                                            </div> :
                                            <div>
                                                {!Contextdata.UserLogin ?
                                                    <div className={Mstyles.Mainbtn} onClick={() => router.push('/Login')} >
                                                        <div className={Mstyles.MainbtnA}>
                                                            <LuUserPlus size={20} />
                                                        </div>
                                                        <div className={Mstyles.MainbtnB}>
                                                            <span>Login</span>
                                                        </div>
                                                    </div> :
                                                    <div>
                                                        <UserMenu />
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </Headroom>
                </MobileView>
            </div>

        </>
    );
};

export default MainNavBar;
