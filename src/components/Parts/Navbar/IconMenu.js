import React, { useState, useEffect, useContext,memo } from 'react';

import { useRouter, useParams } from 'next/router'
import Mstyles from '/styles/customstyle.module.css'
import IconButton from '@mui/material/IconButton';
import Searchbox from '../../Parts/Searchbox'
import { LuBellDot, } from "react-icons/lu";
const IconMenu = () => {
    const router = useRouter()
    return (
        <div className={Mstyles.IconMenu}>
            <div className={Mstyles.IconMenuItem} >
                <IconButton
                    onClick={() => router.push('/user/notifications')}
                   
                    style={{ width: 40, height: 40, color: '#ff0000' }}
                >
                    <LuBellDot size={40} />
                </IconButton>
            </div>
            <div className={Mstyles.IconMenuItem} >
                <Searchbox SType={1} />
            </div>


        </div>
    )
}

export default memo(IconMenu)
