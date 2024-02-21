import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'
import IconButton from '@mui/material/IconButton';
import { Router } from 'next/router';
import { LuHome, LuListOrdered, LuListPlus, LuChevronRight, LuSettings, LuShoppingCart, LuSparkles, LuLineChart, LuX, LuLogOut } from "react-icons/lu";
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import LoadingButton from '@mui/lab/LoadingButton';
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
    const LogutBtn = async () => {
        let text = "Do you really want to log out?";
        if (confirm(text) == true) {
            setOpenMenu(false)
            localStorage.clear();
            router.push('/')
        }

    }

    return (
        <div style={{ cursor: 'pointer' }}>

            <Avatar
                onClick={HandleOpenMenu}
                alt={Contextdata.VendorData.name}
                src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.VendorData.dp}`}
                sx={{ width: 40, height: 40 }}
            />
            <SwipeableDrawer
                anchor={'right'}
                open={OpenMenu}
                onClose={HandleCloseMenu}
                onOpen={HandleOpenMenu}
            >

                <div className={Mstyles.VmenuHeader}>
                    <div className={Mstyles.VmenuHeaderA}>
                        <span>Main Menu</span>
                    </div>
                    <div className={Mstyles.VmenuHeaderB} >

                        <IconButton
                            onClick={HandleCloseMenu}
                            aria-label="toggle password visibility"
                            style={{ width: 40, height: 40, color: 'black' }}
                        >
                            <LuX size={20} />
                        </IconButton>
                    </div>
                </div>
                <div className={Mstyles.Vmenu}>
                    <div className={Mstyles.VmenuItemMain} onClick={() => router.push('/Vendor/Dashboard')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuHome size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Dashboard
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.VmenuItemMain} onClick={() => router.push('/Vendor/ProfileSettings')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuSettings size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Profile Settings
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.VmenuItemMain} onClick={() => router.push('/Vendor/Bookings')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuListOrdered size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Bookings
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.VmenuItemMain} onClick={() => router.push('/Vendor/BookingsPlans')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuListPlus size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Bookings Plans
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>
                    <div className={Mstyles.VmenuItemMain} onClick={() => router.push('/Vendor/Orders')}>
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
                    <div className={Mstyles.VmenuItemMain} onClick={() => router.push('/Vendor/memberships')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuSparkles size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Memberships
                            </div>

                        </div>
                        <div className={Mstyles.VmenuItemMainB}>
                            <LuChevronRight size={20} />

                        </div>
                    </div>

                    <div className={Mstyles.VmenuItemMain} onClick={() => router.push('/Vendor/BookingsPlans')}>
                        <div className={Mstyles.VmenuItem}>
                            <div className={Mstyles.VmenuItemA}>

                                <div className={Mstyles.DbIcon}>
                                    <LuLineChart size={20} />

                                </div>

                            </div>
                            <div className={Mstyles.VmenuItemB}>
                                Profile Analytics
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
                    <LoadingButton
                        fullWidth
                        onClick={LogutBtn}

                        endIcon={<LuLogOut />}
                        loading={false}
                        loadingPosition="end"
                        variant="outlined"
                    >
                        <span>Logout</span>
                    </LoadingButton>
                </div>
            </SwipeableDrawer>
        </div>
    );
}


export default MainNavBar;