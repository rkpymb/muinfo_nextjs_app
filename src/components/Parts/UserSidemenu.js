import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Mstyles from '/styles/mainstyle.module.css';
import { LuClapperboard, LuRocket, LuLock, LuLayoutList, LuUsers, LuUser, LuMessageCircle, LuAlertCircle, LuPhoneCall, LuFileText, LuDownload } from "react-icons/lu";
import { useRouter, useParams } from 'next/router'

import { MediaFilesUrl, SocialHandles } from '/Data/config'
const AdboxA = ({ TabindexNow }) => {
    const router = useRouter()
    const [Tabindex, setTabindex] = useState(0);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    useEffect(() => {
        if (TabindexNow) {
            setTabindex(TabindexNow);
        }

    }, [router.query]);
    return (
        <div className={Mstyles.OnlyDesktop}>
<div style={{ height: '20px' }}></div>
            <div className={Mstyles.TextmenItemGrid}>
                <div className={Mstyles.TextmenItem} onClick={() => router.push(`${SocialHandles.Playstore}`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuDownload />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Download App</span>
                    </div>

                </div>
                <div className={Mstyles.TextmenItem} onClick={() => router.push(`/advertise`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuRocket />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Advertise with is</span>
                    </div>

                </div>


                <div className={Mstyles.TextmenItem} onClick={() => router.push(`/contact_us`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuPhoneCall />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Contact us</span>
                    </div>

                </div>
                <div className={Mstyles.TextmenItem} onClick={() => router.push(`/about_us`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuAlertCircle />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>About us</span>
                    </div>

                </div>
                <div className={Mstyles.TextmenItem} onClick={() => router.push(`/privacy_policy`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuFileText />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Privacy Policy</span>
                    </div>

                </div>
                <div className={Mstyles.TextmenItem}>
                    <div className={Mstyles.TextmenItemA} onClick={() => router.push(`/terms_and_conditions`)}>
                        <span>
                            <LuFileText />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Terms & Conditions</span>
                    </div>

                </div>
                


            </div>
            <div style={{ height: '20px' }}></div>
            <div className={Mstyles.Copyrighttext}>
                <span>© 2024 magadhuniversityinfo.com - All rights reserved.</span>
            </div>
            <div className={Mstyles.SecDevider}></div>
            <div style={{ minHeight: '90px' }}></div>
        </div>
    )
}

export default AdboxA
