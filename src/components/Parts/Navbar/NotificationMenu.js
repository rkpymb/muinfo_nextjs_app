import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'
import IconButton from '@mui/material/IconButton';
import { Router } from 'next/router';
import { LuHome, LuArrowRight, LuBellDot, LuLayoutGrid, LuTrendingUp, LuStar, LuChevronRight, LuSettings, LuUserCog2, LuClipboardList, LuSparkles, LuLineChart, LuX, LuLogOut } from "react-icons/lu";
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LoadingButton from '@mui/lab/LoadingButton';
import NotificationsList from '/src/components/User/NotificationsList'
import ThemeSwitch from './ThemeSwitch'
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

import { useRouter, useParams } from 'next/router'

const MainNavBar = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [OpenMenu, setOpenMenu] = React.useState(false);


    const HandleOpenMenu = async () => {


        if (Contextdata.UserLogin) {
            setOpenMenu(true)
        } else {
            router.push('/account/user_login')
        }


    }
    const HandleCloseMenu = async () => {
        setOpenMenu(false)
    }
    const removeCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        Contextdata.ChangeAlertData('Logout Succesfully', 'success');
        router.push('/account/user_login')
    };

    const LogoutBtn = async () => {

        let text = "Do you Really want to log out?";
        if (confirm(text) == true) {
            removeCookie('jwt_token');

        }
    };




    return (
        <div>

            <div style={{ cursor: 'pointer' }}>


                <IconButton
                    onClick={HandleOpenMenu}
                    aria-label="toggle password visibility"
                    style={{ width: 40, height: 40, }}
                >
                    <LuBellDot size={20} />
                </IconButton>

                <SwipeableDrawer
                    anchor={'right'}
                    open={OpenMenu}
                    onClose={HandleCloseMenu}
                    onOpen={HandleOpenMenu}
                >
                    <div className={Mstyles.Notimenu}>

                        <div className={Mstyles.NotiHeader}>
                            <div className={Mstyles.NotiHeaderA}>
                                <span>Notifications</span>

                            </div>
                            <div className={Mstyles.NotiHeaderB}>

                                <IconButton
                                    onClick={HandleCloseMenu}
                                >
                                    <LuX size={20} />
                                </IconButton>
                            </div>

                        </div>
                    </div>

                    <div className={Mstyles.DeviderBorder}></div>
                    <div className={Mstyles.NotiLbox}>
                    <NotificationsList />
                    </div>

                </SwipeableDrawer>
            </div>

        </div>
    );
}


export default MainNavBar;