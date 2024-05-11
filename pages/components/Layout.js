import { useState, useEffect, useContext,memo } from 'react';
import Mstyles from '/styles/customstyle.module.css'


import MainNavBar from '../../src/components/Parts/Navbar/MainNavBar'

import UserSidemenu from '../../src/components/Parts/UserSidemenu'

import Categories from './user/Categories'
import HomeAsideAddLaptop from './Advt/HomeAsideAddLaptop'
import FloatingBtn from './user/FloatingBtn'


const Layout = ({ children }) => {
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
