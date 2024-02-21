import { useState, useEffect, useContext } from 'react';
import { useRouter, useParams } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'
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
import * as animationData from '/Data/Lottie/AnimationLocked.json'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const CommingSoon = () => {
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
                        height={200}
                        isStopped={false}
                        isPaused={false} />
                </div>
                <div>
                   <p>Please login to View This content</p>
                    
                </div>
                <div className={Mstyles.ATbtnsItem}>
                <Button onClick={() => router.push('/Login')} variant="outlined">Login / Signup</Button>
                    
                </div>
            </div>
           
        </div>
    )
}

export default CommingSoon