import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';

import Image from 'next/image';
import { FiArrowRightCircle } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Skeleton from '@mui/material/Skeleton';
import {

    useTheme,

} from '@mui/material';

function RecentOrders() {

    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }
        ,
        {
            id: 5
        },
        {
            id: 4
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 5
        }
        ,
        {
            id: 5
        }
    ]

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetData = async () => {
        setIsLoading(true)
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { dataid }
        const data = await fetch("/api/V3/List/MainCatListAll", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqD.MainCatList) {
                    setRetdata(parsed.ReqD.MainCatList)
                }
                setIsLoading(false)
            })
    }
    useEffect(() => {
        GetData()

    }, [router.query])

    const theme = useTheme();

    return (<>
        <div>
            <div style={{ height: '10px' }}></div>
            {isLoading ? <div className={Mstyles.HomeCatGrid}>

                {Dummydta.map((item, index) => {
                    return <div className={Mstyles.HomeCatGridItem} key={index} >
                        <div className={Mstyles.CatGridItemA}>
                            <Skeleton variant="rounded" width={40} height={40} />
                        </div>
                        <div style={{ minHeight: '20px' }}></div>
                    </div>

                }

                )}
            </div> :
                <div>
                    {Retdata.length > 0 &&

                        <div>
                            <div className={Mstyles.HomeCatGrid}>
                                {Retdata.map((item, index) => {
                                    return <div className={Mstyles.HomeCatGridItem} key={index} onClick={() => router.push(`/Category/${item.slug}`)} >
                                        <div className={Mstyles.HomeCatGridItemImageBox}>
                                            <div className={Mstyles.HomeCatGridItemImage}>
                                                <Image
                                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.image}`}
                                                    alt=""
                                                    fill
                                                    blurDataURL={blurredImageData}
                                                    placeholder='blur'
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={Mstyles.HomeCatGridItemContent}>
                                            <span className={Mstyles.OnlyDesktop}>{item.title.length > 25 ? `${item.title.slice(0, 25)} ` : item.title}</span>
                                            <span className={Mstyles.OnlyMobile}>{item.title.length > 25 ? `${item.title.slice(0, 20)} ` : item.title}</span>
                                        </div>
                                    </div>

                                }

                                )}


                            </div>
                        </div>

                    }


                </div>

            }

        </div>




    </>
    );
}

export default RecentOrders;
