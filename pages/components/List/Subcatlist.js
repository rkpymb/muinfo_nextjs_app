import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import { FiArrowRightCircle } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import Chip from '@mui/material/Chip';
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
    ]

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const GetData = async () => {
        setIsLoading(true)
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { dataid }
        const data = await fetch("/api/V3/List/CatList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setRetdata(parsed.ReqD.MainCatList)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        GetData()

    }, [router.query])

    const theme = useTheme();

    return (<>
        <div>
            {isLoading ? <div className={Mstyles.MainCatGrid}>

                {Dummydta.map((item,index) => {
                    return <div className={Mstyles.MainCatGridItem} key={index} >
                        <div className={Mstyles.CatGridItemA}>
                            <Skeleton variant="circular" width={40} height={40} />
                        </div>
                        <div style={{ minHeight: '10px' }}></div>
                        <div className={Mstyles.CatGridItemB}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem', width: 100 }} />
                        </div>



                    </div>

                }

                )}
            </div> :
                <div>
                    {Retdata.length > 0 &&

                        <div>


                            <div className={Mstyles.SubcatGrid}>
                                {Retdata.map((item, index) => {
                                    return <div key={index}
                                    className={Mstyles.SubcatGridItem}

                                    >
                                        <Chip
                                            avatar={<Avatar alt={item.title}   src={`${MediaFilesUrl}${MediaFilesFolder}/${item.image}`} />}
                                            label={item.title}
                                            variant="outlined"
                                        />
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
