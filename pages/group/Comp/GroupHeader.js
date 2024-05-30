import React from 'react'
import Mstyles from '/styles/chat.module.css'
import Image from 'next/image';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import { LuMoreVertical, LuPlus, LuUsers2 } from "react-icons/lu";

import IconButton from '@mui/material/IconButton';
const GroupHeader = ({ GroupData }) => {

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    return (
        <div className={Mstyles.GroupHeader}>
            <div className={Mstyles.GroupHeaderMain}>
                <div className={Mstyles.GroupHeaderA}>
                    <div className={Mstyles.GroupTop}>
                        <div className={Mstyles.GroupItemToA}>
                            <div className={Mstyles.GroupItemLogoSmall}>
                                <Image
                                    src={`${MediaFilesUrl}${MediaFilesFolder}${GroupData.GroupLogo}`}
                                    alt=""
                                    fill
                                    height={'100%'}
                                    width={'100%'}
                                    blurDataURL={blurredImageData}
                                    placeholder='blur'
                                    style={{ objectFit: "cover", borderRadius: '5px' }}
                                />
                            </div>

                        </div>
                        <div className={Mstyles.GroupTopB}>
                            <div className={Mstyles.GroupItemDetails}>
                                <span>{GroupData.GroupName}</span>

                                <div className={Mstyles.GrouCountItemB}>
                                    200K + Members
                                </div>
                                <div className={Mstyles.OnlineText}>
                                    4533 online
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Mstyles.GroupHeaderB}>
                    <IconButton
                        style={{ width: 35, height: 35, }}
                    >
                        <LuMoreVertical />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default GroupHeader
