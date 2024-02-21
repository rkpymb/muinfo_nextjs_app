import React, { useState, useEffect, useContext } from 'react';
import { Typography, Box, Card, Container, Button, styled, Switch } from '@mui/material';
import { ThemeContext } from '../../../theme/ThemeProvider';
import Mstyles from '/Styles/mainstyle.module.css'

import { MdOutlineDarkMode,MdOutlineWbSunny } from "react-icons/md";
import CheckloginContext from '/context/auth/CheckloginContext';
import { LuHome, LuListOrdered, LuListPlus, LuHeart, LuChevronRight, LuSettings, LuUserCog2, LuShoppingCart, LuSparkles, LuLineChart, LuX, LuLogOut } from "react-icons/lu";

const ThemeSwitch = () => {
    const Contextdata = useContext(CheckloginContext);
    const setThemeName = useContext(ThemeContext);
    const [DarkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // Retrieve the theme from localStorage
        const storedTheme = window.localStorage.getItem('appTheme');
        if (storedTheme) {
            if (storedTheme === 'DarkMain') {
                
                setDarkMode(true);
            } else {
                setDarkMode(false);
            }
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        // Toggle between 'DarkMain' and 'GreyGooseTheme' in localStorage
        const newTheme = DarkMode ? 'GreyGooseTheme' : 'DarkMain';
        window.localStorage.setItem('appTheme', newTheme);
        setThemeName(newTheme);
    };

    useEffect(() => {
        Contextdata.ChangeMainLoader(false)
    }, [Contextdata.UserData]);

    return (
        <div className={Mstyles.UmenuItemMain}>
            <div className={Mstyles.VmenuItem}>
                <div className={Mstyles.VmenuItemA}>

                    <div className={Mstyles.DbIcon}>
                      
                        {DarkMode ?<span> <MdOutlineDarkMode size={20} /></span>:<span> <MdOutlineWbSunny size={20} />  </span>}

                    </div>

                </div>
                <div className={Mstyles.VmenuItemB}>
                    {DarkMode ?<span>Dark Mode</span>:<span>Light Mode</span>}
                </div>

            </div>
            <div className={Mstyles.VmenuItemMainB}>
                <Switch checked={DarkMode} onChange={toggleDarkMode} />
            </div>
        </div>
    );
};

export default ThemeSwitch;
