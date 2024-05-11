import { useState, useEffect, useContext, memo } from 'react';
import Mstyles from '/styles/customstyle.module.css';
import { useRouter } from 'next/router';

import CheckloginContext from '/context/auth/CheckloginContext';
import MainNavBar from '../../src/components/Parts/Navbar/MainNavBar';
import UserSidemenu from '../../src/components/Parts/UserSidemenu';
import Categories from './user/Categories';
import HomeAsideAddLaptop from './Advt/HomeAsideAddLaptop';
import FloatingBtn from './user/FloatingBtn';

const Layout = ({ children }) => {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();

    useEffect(() => {
      
        const urlParams = new URLSearchParams(window.location.search);
        const appModeParam = urlParams.get('appmode');
        if (appModeParam === 'true') {
            Contextdata.ChangeAppMode(true)
           
        }
    }, []);

    return (
        <div>
            <MainNavBar />
            <div className={Mstyles.Fullbg}>
                <div className={Mstyles.Container}>
                    <div className={Mstyles.OnlyDesktop}>
                        <div className={Mstyles.SecDevider}></div>
                    </div>
                    <div className={Mstyles.FeedSection}>
                        <div className={Mstyles.FeedSectionA}>
                            <Categories />
                            <UserSidemenu />
                            <FloatingBtn />
                        </div>
                        <div className={Mstyles.FeedSectionB}>
                            {children}
                            <div className={Mstyles.FooterDevider}></div>
                        </div>
                        <div className={Mstyles.FeedSectionC}>
                            <HomeAsideAddLaptop />
                            <div style={{ height: '15px' }}></div>
                            <HomeAsideAddLaptop />
                            <div className={Mstyles.SecDevider}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Layout);
