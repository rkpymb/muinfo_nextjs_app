import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Mstyles from '/Styles/mainstyle.module.css';
import { LuClapperboard, LuFileImage, LuLock, LuStar, LuListTodo, LuMessageCircle, LuAlertCircle, LuPhoneCall, LuFileText, LuDownload } from "react-icons/lu";
import { Router } from 'next/router';
import { useRouter, useParams } from 'next/router'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
const AdboxA = () => {
    const router = useRouter()
    const [Tabindex, setTabindex] = useState(0);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div>




            <div className={Mstyles.Addimg1} onClick={() => router.push('/Vendor/VendorLogin')}>

                <Image
                    src={`/adimg.jpg`}
                    alt=""
                    fill
                    blurDataURL={blurredImageData}
                    placeholder='blur'

                />
                <span className="vendorTag  vendorTag--Sponsored">Sponsored</span>
            </div>

        </div>
    )
}

export default AdboxA
