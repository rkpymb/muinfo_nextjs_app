import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';

import Image from 'next/image';
import { LuTrendingUp } from "react-icons/lu";
import { FiArrowRightCircle } from "react-icons/fi";
import Mstyles from '/styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Skeleton from '@mui/material/Skeleton';
import {

    useTheme,

} from '@mui/material';

function Categories({ Type }) {

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

        const sendUM = {}
        const data = await fetch("/api/user/category_list", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData.MainCatList) {
                    setRetdata(parsed.ReqData.MainCatList)
                }
                setIsLoading(false)
            })
    }
    useEffect(() => {
        GetData()

    }, [router.query])

    const theme = useTheme();

    return (<>
        <div className={Mstyles.HomeCatbox}>

            <div className={Mstyles.OnlyDesktop}>

                <div className={Mstyles.TTitle}>
                    <div className={Mstyles.TTitleA}>
                        <LuTrendingUp size={20} />
                    </div>
                    <div className={Mstyles.TTitleB}>
                        <span>Read by Interests</span>
                    </div>
                </div>
                <div style={{ height: '10px' }}></div>
            </div>


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
                            <div className={Type == 1 ? Mstyles.HomeCatGridSmall : Mstyles.HomeCatGrid}>
                                {Retdata.map((item, index) => {
                                    return <div className={Mstyles.HomeCatGridItem} key={index} onClick={() => router.push(`/feeds/interests/${item.slug}`)} >
                                        <div className={Mstyles.HomeCatGridItemImageBox}>
                                            <div className={Mstyles.HomeCatGridItemImage}>
                                                <Image
                                                    src={`${MediaFilesUrl}${MediaFilesFolder}${item.image}`}
                                                    alt=""
                                                    fill
                                                    height={'100%'}
                                                    width={'100%'}
                                                    blurDataURL={blurredImageData}
                                                    placeholder='blur'
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={Mstyles.HomeCatGridItemContent}>
                                            <span>{item.title.length > 25 ? `${item.title.slice(0, 20)} ` : item.title}</span>

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

export default Categories;
