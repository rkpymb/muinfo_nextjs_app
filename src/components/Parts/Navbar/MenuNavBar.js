import React, { useState, useEffect, useContext,memo } from 'react';

import CheckloginContext from '../../../../context/auth/CheckloginContext'
import Mstyles from '../../../../styles/mainstyle.module.css'

import { LuFlower, LuGalleryHorizontalEnd, LuLayoutList, LuSearch, LuMessagesSquare, LuMailCheck } from "react-icons/lu";

import { useRouter, useParams } from 'next/router'

const MainNavBar = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [scrolling, setScrolling] = useState(false);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (Contextdata.UserLogin == true) {
            setLoading(false)
        }
    }, [Contextdata.UserLogin]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                console.log(window.scrollY)
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
        <>
          
            <div className={Mstyles.SecondMenuBox}>
                <div className={Mstyles.SecondMenuBoxItembox}>
                    <div className={Mstyles.MainMenuBoxWeb}>
                        <div className={Mstyles.MainMenuBoxWebMainMenu} onClick={() => router.push('/vendors')}>
                            <div className={Mstyles.MainMenuBoxWebMainMenuA}>
                                <LuFlower size={20} />
                            </div>
                            <div className={Mstyles.MainMenuBoxWebMainMenuB}>
                                Top Vendors
                            </div>
                        </div>
                        <div style={{ width: '10px' }}></div>
                        <div className={Mstyles.MainMenuBoxWebMainMenu}>
                            <div className={Mstyles.MainMenuBoxWebMainMenuA}>
                                <LuGalleryHorizontalEnd size={20} />
                            </div>
                            <div className={Mstyles.MainMenuBoxWebMainMenuB}>
                                Trending Feeds
                            </div>
                        </div>
                        <div style={{ width: '10px' }}></div>
                        <div className={Mstyles.MainMenuBoxWebMainMenu}>
                            <div className={Mstyles.MainMenuBoxWebMainMenuA}>
                                <LuLayoutList size={20} />
                            </div>
                            <div className={Mstyles.MainMenuBoxWebMainMenuB}>
                                Category
                            </div>
                        </div>
                        <div style={{ width: '10px' }}></div>
                        <div className={Mstyles.MainMenuBoxWebMainMenu}>
                            <div className={Mstyles.MainMenuBoxWebMainMenuA}>
                                <LuSearch size={20} />
                            </div>
                            <div className={Mstyles.MainMenuBoxWebMainMenuB}>
                                Search
                            </div>
                        </div>
                        <div style={{ width: '10px' }}></div>
                        <div className={Mstyles.MainMenuBoxWebMainMenu}>
                            <div className={Mstyles.MainMenuBoxWebMainMenuA}>
                                <LuMessagesSquare size={20} />
                            </div>
                            <div className={Mstyles.MainMenuBoxWebMainMenuB}>
                                Live Help
                            </div>
                        </div>
                        <div style={{ width: '10px' }}></div>
                        <div className={Mstyles.MainMenuBoxWebMainMenu}>
                            <div className={Mstyles.MainMenuBoxWebMainMenuA}>
                                <LuMailCheck size={20} />
                            </div>
                            <div className={Mstyles.MainMenuBoxWebMainMenuB}>
                                Send Enquiry
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(MainNavBar);
