import React, { useState, useEffect, useContext,memo } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/styles/mainstyle.module.css'

import { useRouter, useParams } from 'next/router'
import Skeleton from '@mui/material/Skeleton';

import IconButton from '@mui/material/IconButton';
import { LuArrowLeft } from "react-icons/lu";
import { Router } from 'next/router';


import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

const MainNavBar = ({ Title }) => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 45) {
           
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
        <nav className={`${Mstyles.TopTitleBoxMain} ${scrolling ? Mstyles.TopTitleBoxMainNav : Mstyles.TopTitleBoxMainNav}`}>
            <div className={Mstyles.TopTitleBox}>
                <div className={Mstyles.TopTitleBoxA}>
                    <div>
                        <IconButton
                            onClick={() => router.back()}
                            aria-label="toggle password visibility"
                            style={{ width: 40, height: 40, }}
                        >
                            <LuArrowLeft size={20} />
                        </IconButton>
                    </div>
                    <div>
                        <span>{Title}</span>
                    </div>

                </div>
                <div className={Mstyles.TopTitleBoxB}>

                </div>
            </div>
        </nav>
    );
};

export default memo(MainNavBar);
