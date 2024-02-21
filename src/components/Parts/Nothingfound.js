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
import * as animationData from '/Data/Lottie/animation_lmiglwqc.json'
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../../Data/config'
const CommingSoon = ({Title,DescData}) => {
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
                    <div style={{fontWeight:700,margin:10}}>{Title}</div>
                    <div style={{fontWeight:500,margin:10, fontSize:12}}>{DescData}</div>
                    
                </div>
                <div className={Mstyles.ATbtnsItem}>
                <Button onClick={() => router.push('/')} variant="outlined">Go to Homepage</Button>
                    
                </div>
            </div>
           
        </div>
    )
}

export default CommingSoon