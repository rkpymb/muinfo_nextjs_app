import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/mainstyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import Image from 'next/image';
import { MediaFilesUrl, FeedimgFolder, MediaFilesFolder } from '/Data/config'
const VAllGalarylist = ({ Vdata }) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const [RetData, setRetData] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {

        VGalarylist()

    }, []);

    const VGalarylist = async () => {
        const sendUM = { username: Vdata.username }
        const data = await fetch("/api/V3/List/VAllGalarylist", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedFinal) => {
                setRetData(parsedFinal.ReqD.VGalarylist)
                setLoading(false)
            })

    }
    return (
        <div>

            <div >
                {!Loading &&
                    <div className={Mstyles.VGGridItem}>
                        {RetData.map((item, index) => {
                            return <div className={Mstyles.VGGridItemItem} key={index} >
                                <Image

                                    src={`${MediaFilesUrl}${FeedimgFolder}/${item.PostList[0].postData}`}
                                    alt=""
                                    fill
                                    blurDataURL={blurredImageData}
                                    placeholder='blur'
                                    style={{ objectFit: "cover" }}
                                />
                            </div>

                        }

                        )}
                    </div>

                }



            </div>

        </div>
    )
}

export default VAllGalarylist
