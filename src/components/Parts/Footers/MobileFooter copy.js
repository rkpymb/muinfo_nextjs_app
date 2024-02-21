import { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import Mstyles from '/Styles/mainstyle.module.css';
import { LuHeart, LuSearch, LuLayoutList, LuUsers, LuMessageCircle, LuClapperboard } from "react-icons/lu";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useRouter, useParams } from 'next/router';
import IconButton from '@mui/material/IconButton';

import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '/Data/config';

const FooterMobile = () => {
    const [DarkMode, setDarkMode] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const Contextdata = useContext(CheckloginContext);
    const router = useRouter();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible]);

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('appTheme');
        if (storedTheme) {
            setDarkMode(storedTheme === 'DarkMain');
        }
    }, []);

    return (
        <div>
            <div className={`${Mstyles.FooterMobileBox} ${Mstyles.FNavanimation} ${DarkMode ? Mstyles.bgnavDark : Mstyles.bgnavLight}`}  >
                <div className={Mstyles.FooterMobileMenuBox}>
                    <div className={Mstyles.FooterMobileMenuBoxItem} onClick={() => router.push('/')}>
                        <div className={Mstyles.FooterMobileMenuBoxItemA}>
                            <IconButton aria-label="cart">
                                <StyledBadge color="secondary">
                                    <LuClapperboard />
                                </StyledBadge>
                            </IconButton>
                        </div>
                        <div className={Mstyles.FooterMobileMenuBoxItemB}>
                            <span>Feeds</span>
                        </div>
                    </div>
                    <div className={Mstyles.FooterMobileMenuBoxItem} onClick={() => router.push('/Vendors')}>
                        <div className={Mstyles.FooterMobileMenuBoxItemA}>
                            <IconButton aria-label="cart">
                                <StyledBadge color="secondary">
                                    <LuUsers />
                                </StyledBadge>
                            </IconButton>
                        </div>
                        <div className={Mstyles.FooterMobileMenuBoxItemB}>
                            <span>Top Vendors</span>
                        </div>
                    </div>
                    <div className={Mstyles.FooterMobileMenuBoxItem} onClick={() => router.push('/Category')}>
                        <div className={Mstyles.FooterMobileMenuBoxItemA}>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={Contextdata.ItemsinCart} color="secondary">
                                    <LuLayoutList />
                                </StyledBadge>
                            </IconButton>
                        </div>
                        <div className={Mstyles.FooterMobileMenuBoxItemB}>
                            <span>Category</span>
                        </div>
                    </div>
                    <div className={Mstyles.FooterMobileMenuBoxItem} onClick={() => router.push('/user/my-following')}>
                        <div className={Mstyles.FooterMobileMenuBoxItemA}>
                            <IconButton aria-label="cart">
                                <StyledBadge color="secondary">
                                    <LuHeart />
                                </StyledBadge>
                            </IconButton>
                        </div>
                        <div className={Mstyles.FooterMobileMenuBoxItemB}>
                            <span>My Following</span>
                        </div>
                    </div>
                    <div className={Mstyles.FooterMobileMenuBoxItem} onClick={() => router.push('/inbox')}>
                        <div className={Mstyles.FooterMobileMenuBoxItemA}>
                            <IconButton aria-label="cart">
                                <StyledBadge color="secondary">
                                    <LuMessageCircle />
                                </StyledBadge>
                            </IconButton>
                        </div>
                        <div className={Mstyles.FooterMobileMenuBoxItemB}>
                            <span>Inbox</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterMobile;
