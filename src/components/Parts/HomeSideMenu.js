
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'

import { useRouter, useParams } from 'next/router'
import Button from '@mui/material/Button';
import { ShortAbout, AppName, SocialHandles, MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import { Router } from 'next/router';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FiArrowRightCircle } from "react-icons/fi";
const HomeSideMenu = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)

    const [OpenCatBox, setOpenCatBox] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [Catlist, setCatlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingSubmitPost, setLoadingSubmitPost] = useState(false);
    const [PostText, setPostText] = useState('');
    const [Category, setCategory] = useState('');
    const [CategoryText, setCategoryText] = useState('Choose');
    const [Catimg, setCatimg] = useState('categories.png');
    const [Location, setLocation] = useState('New Delhi');
    const [LocationText, setLocationText] = useState('New Delhi');



    useEffect(() => {


    }, [router.query])




    return (
        <div>
            <div style={{ marginTop: 100 }}></div>
            <div className={Mstyles.HomeSideMenu}>
                <div className={Mstyles.HomeSideMenuItem}>
                    <div className={Mstyles.HomeSideMenuItemA}>
                        <Image
                            src={`/img/icon/play.png`}
                            alt=""

                            blurDataURL={blurredImageData}
                            placeholder='blur'
                            width={20}
                            height={20}
                            quality={100}
                        />

                    </div>
                    <div className={Mstyles.HomeSideMenuItemB}>
                        <span>Vendor feeds</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HomeSideMenu
