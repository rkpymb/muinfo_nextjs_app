import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Mstyles from '/Styles/mainstyle.module.css';
import { LuClapperboard, LuHeart, LuLock, LuLayoutList, LuUsers, LuUser, LuMessageCircle, LuAlertCircle, LuPhoneCall, LuFileText, LuDownload } from "react-icons/lu";
import { useRouter, useParams } from 'next/router'

import { MediaFilesUrl, SocialHandles } from '/Data/config'
const AdboxA = ({TabindexNow}) => {
    const router = useRouter()
    const [Tabindex, setTabindex] = useState(0);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    useEffect(() => {
       if(TabindexNow){
        setTabindex(TabindexNow);
       }
    
      }, [router.query]);
    return (
        <div>


            <div className={Mstyles.UserSidemenuBox}>

                <div className={Mstyles.VPboxAMenuItemBox}>
                    <div className={Tabindex == 1 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => router.push('/feeds')} >
                        <div className={Mstyles.VPboxAMenuItemA}>

                            <div className={Mstyles.DbIcon}>
                                <LuClapperboard size={20} />

                            </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                            <span>Feeds</span>
                        </div>
                    </div>
                    <div className={Tabindex == 2 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() =>  router.push('/Vendors')}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                            <div className={Mstyles.DbIcon}>
                                <LuUsers size={20} />

                            </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                            <span>Top Vendors</span>
                        </div>
                    </div>
                    <div className={Tabindex == 3 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => router.push('/Category')}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                            <div className={Mstyles.DbIcon}>
                                <LuLayoutList size={20} />

                            </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                            <span>Category</span>
                        </div>
                    </div>
                    <div className={Tabindex == 4 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => router.push('/user/my-following')}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                            <div className={Mstyles.DbIcon}>
                                <LuHeart size={20} />

                            </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                            <span>My Following</span>
                        </div>
                    </div>

                   
                    <div className={Tabindex == 5 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => router.push('/inbox')}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                            <div className={Mstyles.DbIcon}>
                                <LuMessageCircle size={20} />

                            </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                            <span>Inbox</span>
                        </div>
                    </div>
                </div>

            </div>
            <div style={{ height: '20px' }}></div>
            <div className={Mstyles.Addimg1}>

                <Image
                    src={`/img/rfimg.jpg`}
                    alt=""
                    fill
                    blurDataURL={blurredImageData}
                    placeholder='blur'

                />
            </div>
            <div style={{ height: '20px' }}></div>
            <div className={Mstyles.TextmenItemGrid}>
                <div className={Mstyles.TextmenItem} onClick={() => router.push(`${SocialHandles.Playstore}`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuDownload />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Get App</span>
                    </div>

                </div>


                <div className={Mstyles.TextmenItem} onClick={() => router.push(`/contact`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuPhoneCall />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Contact us</span>
                    </div>

                </div>
                <div className={Mstyles.TextmenItem} onClick={() => router.push(`/about-us`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuAlertCircle />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>About us</span>
                    </div>

                </div>
                <div className={Mstyles.TextmenItem} onClick={() => router.push(`/privacy-policy`)}>
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
                    <div className={Mstyles.TextmenItemA} onClick={() => router.push(`/terms-and-conditions`)}>
                        <span>
                            <LuFileText />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Terms & Co...</span>
                    </div>

                </div>
                <div className={Mstyles.TextmenItem} onClick={() => router.push(`/Vendor/VendorLogin`)}>
                    <div className={Mstyles.TextmenItemA}>
                        <span>
                            <LuLock />
                        </span>
                    </div>
                    <div className={Mstyles.TextmenItemB}>
                        <span>Vendor Login</span>
                    </div>

                </div>


            </div>
            <div style={{ height: '20px' }}></div>
            <div className={Mstyles.Copyrighttext}>
                <span>© 2022 - 2024 flairmyevent.com - All rights reserved.</span>
            </div>
            <div style={{ height: '10px' }}></div>
        </div>
    )
}

export default AdboxA
