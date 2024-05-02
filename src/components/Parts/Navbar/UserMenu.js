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

import ThemeSwitch from './ThemeSwitch'
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

import { useRouter, useParams } from 'next/router'

const MainNavBar = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [OpenMenu, setOpenMenu] = React.useState(false);


    const HandleOpenMenu = async () => {


        if(Contextdata.UserLogin){
            setOpenMenu(true)
        }else{
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

                <Avatar
                    onClick={HandleOpenMenu}
                    alt={Contextdata.UserData.name}
                    src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.UserData.dp}`}
                    sx={{ width: 30, height: 30 }}
                />
                <SwipeableDrawer
                    anchor={'right'}
                    open={OpenMenu}
                    onClose={HandleCloseMenu}
                    onOpen={HandleOpenMenu}
                >
                    <div className={Mstyles.OnlyMobile}>
                        <div style={{ height: 10 }}></div>
                    </div>
                    <div className={Mstyles.VmenuHeader}>
                        <div className={Mstyles.VmenuHeaderA}>
                            <div className={Mstyles.Avatarbox}>
                                <Avatar
                                    onClick={HandleOpenMenu}
                                    alt={Contextdata.UserData.name}
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.UserData.dp}`}
                                    sx={{ width: 30, height: 30 }}
                                />
                                <div style={{ width: 10 }}></div>
                                <div>
                                    <div>  <span>{Contextdata.UserData.name}</span></div>
                                    <div className={Mstyles.unametext}>  <small>@{Contextdata.UserData.username}</small></div>
                                    <div style={{ height: 10 }}></div>

                                </div>
                            </div>
                        </div>
                        <div className={Mstyles.VmenuHeaderB} >

                            <IconButton
                                onClick={HandleCloseMenu}
                            >
                                <LuX size={20} />
                            </IconButton>
                        </div>
                    </div>
                    <div className={Mstyles.Vmenu} onClick={HandleCloseMenu}>

                        {/* <ThemeSwitch/> */}

                        <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/feeds')}>
                            <div className={Mstyles.VmenuItem}>
                                <div className={Mstyles.VmenuItemA}>

                                    <div className={Mstyles.DbIcon}>
                                        <LuTrendingUp size={20} />

                                    </div>

                                </div>
                                <div className={Mstyles.VmenuItemB}>
                                    Feeds
                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemMainB}>
                                <LuChevronRight size={20} />

                            </div>
                        </div>
                        <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/notifications')}>
                            <div className={Mstyles.VmenuItem}>
                                <div className={Mstyles.VmenuItemA}>

                                    <div className={Mstyles.DbIcon}>
                                        <LuBellDot size={20} />

                                    </div>

                                </div>
                                <div className={Mstyles.VmenuItemB}>
                                    Notifications
                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemMainB}>
                                <LuChevronRight size={20} />

                            </div>
                        </div>
                        <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/feeds/category')}>
                            <div className={Mstyles.VmenuItem}>
                                <div className={Mstyles.VmenuItemA}>

                                    <div className={Mstyles.DbIcon}>
                                        <LuLayoutGrid size={20} />

                                    </div>

                                </div>
                                <div className={Mstyles.VmenuItemB}>
                                    Categories
                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemMainB}>
                                <LuChevronRight size={20} />

                            </div>
                        </div>
                        <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/feeds')}>
                            <div className={Mstyles.VmenuItem}>
                                <div className={Mstyles.VmenuItemA}>

                                    <div className={Mstyles.DbIcon}>
                                        <LuStar size={20} />

                                    </div>

                                </div>
                                <div className={Mstyles.VmenuItemB}>
                                    My Favourites
                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemMainB}>
                                <LuChevronRight size={20} />

                            </div>
                        </div>


                        <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/user/edit-profile')}>
                            <div className={Mstyles.VmenuItem}>
                                <div className={Mstyles.VmenuItemA}>

                                    <div className={Mstyles.DbIcon}>
                                        <LuUserCog2 size={20} />

                                    </div>

                                </div>
                                <div className={Mstyles.VmenuItemB}>
                                    Edit Profile
                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemMainB}>
                                <LuChevronRight size={20} />

                            </div>
                        </div>

                        <div className={Mstyles.VmenuItemMainC}>
                            <div className={Mstyles.VmSmallItem} onClick={() => router.push('/advertise')}>
                                <span>• Advertise with us</span>
                            </div>
                            <div className={Mstyles.VmSmallItem} onClick={() => router.push('/about_us')}>
                                <span>• About us</span>
                            </div>
                            <div className={Mstyles.VmSmallItem} onClick={() => router.push('/contact_us')}>
                                <span>• Contact us</span>
                            </div>
                            <div className={Mstyles.VmSmallItem} onClick={() => router.push('/terms_and_conditions')}>
                                <span>• Terms and Conditions</span>
                            </div>
                            <div className={Mstyles.VmSmallItem} onClick={() => router.push('/privacy_policy')}>
                                <span>• Privacy Policy</span>
                            </div>


                        </div>




                    </div>

                    <div className={Mstyles.VmenuFotter}>
                        <div className={Mstyles.Mainbtn} onClick={LogoutBtn}>
                            <div className={Mstyles.MainbtnA}>
                                <LuLogOut size={16} />
                            </div>
                            <div className={Mstyles.MainbtnB}>
                                <span>Logout</span>
                            </div>
                        </div>
                    </div>
                </SwipeableDrawer>
            </div>
           
        </div>
    );
}


export default MainNavBar;