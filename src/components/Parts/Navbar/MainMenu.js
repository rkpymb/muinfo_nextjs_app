import React, { useState, useEffect, useContext,memo } from 'react';
import { useRouter, useParams } from 'next/router'
import Mstyles from '/styles/customstyle.module.css'
const MainMenu = () => {
    const router = useRouter()
    return (
        <div className={Mstyles.MainMenu}>
            <div className={Mstyles.MainMenuItem} onClick={() => router.push('/feeds')}>
                <span>Feeds</span>
            </div>
            <div className={Mstyles.MainMenuItem} onClick={() => router.push('/about_us')}>
                <span>Categories</span>
            </div>
            <div className={Mstyles.MainMenuItem} onClick={() => router.push('/contact_us')}>
                <span>Contact</span>
            </div>

        </div>
    )
}

export default memo(MainMenu)
