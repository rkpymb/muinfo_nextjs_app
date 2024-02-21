import { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '../../../context/auth/CheckloginContext'
import Mstyles from '../../../Styles/home.module.css'
import Lottie from 'react-lottie'
import Link from 'next/link';
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    styled
} from '@mui/material';
import * as animationData from '../../../Data/Lottie/animation_lmiglwqc.json'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const CommingSoon = (props) => {
    const router = useRouter()
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const Contextdata = useContext(CheckloginContext)
    return (
        <div className={Mstyles.ComingSoonBox}>
            <div>
                <div>
                    <Lottie options={defaultOptions}
                        width='100%'
                        height={400}
                        isStopped={false}
                        isPaused={false} />
                </div>
                <div>
                    <h1>Comming Soon</h1>
                    
                </div>
                <div className={Mstyles.ATbtnsItem}>
                    <Link href='/' style={{ textDecoration: 'none' }}>
                        <Button variant="outlined">Go to Homepage</Button>
                    </Link>
                    
                </div>
            </div>
           
        </div>
    )
}

export default CommingSoon