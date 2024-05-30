import { useState, useEffect, useContext, memo } from 'react';
import Mstyles from '/styles/chat.module.css';
import { useRouter } from 'next/router';

import CheckloginContext from '/context/auth/CheckloginContext';
import AsideTop from './AsideTop';
import CreateGroup from './CreateGroup';
import GroupLists from './GroupLists';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const Layout = ({ children }) => {
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();

    const handleMenuClick = (path) => {
        router.push(path);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const appModeParam = urlParams.get('appmode');
        if (appModeParam === 'true') {
            Contextdata.ChangeAppMode(true);
            localStorage.setItem('appMode', 'true');
        }
    }, [Contextdata]);

    return (
        <div>
            <div className={Mstyles.Fullbg}>
                <div className={Mstyles.Container}>
                    <div className={Mstyles.ChatSection}>
                        <div className={Mstyles.ChatSectionA}>
                            <AsideTop />
                            <CreateGroup />
                            <GroupLists />
                            {/* <ul>
                                <li onClick={() => handleMenuClick('/groups')}>groups</li>
                                <li onClick={() => handleMenuClick('/groups/chats')}>chats page</li>
                                <li onClick={() => handleMenuClick('/groups/profile')}>profile Page</li>
                            </ul> */}
                        </div>
                        <div className={Mstyles.ChatSectionB}>
                            {children}
                            <div className={Mstyles.FooterDevider}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Layout);
