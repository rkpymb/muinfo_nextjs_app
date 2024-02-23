import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'
import IconButton from '@mui/material/IconButton';
import { Router } from 'next/router';
import { LuHome, LuListOrdered, LuListPlus, LuHeart, LuChevronRight, LuSettings, LuUserCog2, LuShoppingCart, LuSparkles, LuLineChart, LuX, LuLogOut } from "react-icons/lu";
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
        setOpenMenu(true)
    }
    const HandleCloseMenu = async () => {
        setOpenMenu(false)
    }
    const Logoutbtn = async () => {
        let text = "Do you really want to log out?";
        if (confirm(text) == true) {
            setOpenMenu(false)
            localStorage.clear();
            router.push('/Vendor/VendorLogin')
        }

    }

    return (
        <div style={{ cursor: 'pointer' }}>

            <Avatar
                onClick={HandleOpenMenu}
                alt={Contextdata.VendorData.name}
                src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.VendorData.dp}`}
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
                                alt={Contextdata.VendorData.name}
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.VendorData.dp}`}
                                sx={{ width: 30, height: 30 }}
                            />
                            <div style={{ width: 10 }}></div>
                            <div>
                                <div>  <span>{Contextdata.VendorData.name}</span></div>
                                <div className={Mstyles.unametext}>  <small>@{Contextdata.VendorData.username}</small></div>
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

                    <ThemeSwitch />
                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuHome size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Home
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/Vendor/Dashboard?Tabindex=4')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuHeart size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Followers
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/user/orders')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuShoppingCart size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                My Orders
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>

                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/user/my-bookings')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuListOrdered size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                My Bookings
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.UmenuItemMain} onClick={() => router.push('/Vendor/ProfileSettings')}>
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
                        <div className={Mstyles.VmSmallItem}>
                            <span>• About Flair My Event</span>
                        </div>
                        <div className={Mstyles.VmSmallItem}>
                            <span>• Contact us</span>
                        </div>
                        <div className={Mstyles.VmSmallItem}>
                            <span>• Terms and Conditions</span>
                        </div>
                        <div className={Mstyles.VmSmallItem}>
                            <span>• Privacy Policy</span>
                        </div>


                    </div>




                </div>

                <div className={Mstyles.VmenuFotter}>
                    <div className={Mstyles.Mainbtn} onClick={Logoutbtn}>
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
    );
}


export default MainNavBar;