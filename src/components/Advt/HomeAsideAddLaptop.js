import { useState, useEffect, useContext } from 'react';
import Mstyles from '/Styles/advt.module.css'
import Image from 'next/image';
import { useRouter, useParams } from 'next/router'
import { LuInfo } from "react-icons/lu";
import { MediaFilesUrl, AdvtContentfolder, FeedimgFolder } from '/Data/config';
import Skeleton from '@mui/material/Skeleton';

const HomeAsideAddLaptop = ({ bycat, PostData }) => {
    const router = useRouter()
    const [AddData, setAddData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    const GetData = async () => {

        const sendUM = {

        };

        try {
            const data = await fetch("/api/Advt/ad_set", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            });

            if (!data.ok) {
                throw new Error('Failed to fetch data');
            }
            const parsed = await data.json();

            if (parsed.ReqData) {
                console.log(parsed.ReqData.DataList)
                if (parsed.ReqData && parsed.ReqData.DataList) {
                    setAddData(parsed.ReqData.DataList)

                    setTimeout(function () {
                        setLoading(false)
                    }, 1000);
                }

            }

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };
    const ClickAd = async (AdClickData) => {

        console.log(AdClickData)
        const TragetUrl = AdClickData.AdvtList.Adurl
        if (TragetUrl) {
            window.open(`${TragetUrl}?ref=${AdClickData.AdID}`, "_blank");
        }

    };



    useEffect(() => {
        GetData();
    }, [router.query])

    return (
        <div className={Mstyles.AddboxM}>
            <div className={Mstyles.AddboxMOverlay}>
                {Loading ?
                    <div className={Mstyles.AddboxMItem}>

                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                    </div> :
                    <div>
                        <div className={Mstyles.AddboxTop}>
                            <div className={Mstyles.AddboxTopA}>
                                <span>sponsored</span>
                            </div>
                            <div className={Mstyles.AddboxTopB}>
                                <span><LuInfo /></span>
                            </div>
                        </div>
                        {AddData.map((item, index) => {
                            return <div hover key={index} className={Mstyles.AddboxMItem} onClick={() => ClickAd(item)}>
                                <Image
                                    src={`${MediaFilesUrl}${AdvtContentfolder}/${item.AdvtList.MediaItem}`}
                                    alt="image"
                                    placeholder="blur"
                                    blurDataURL={blurredImageData}
                                    layout='responsive'
                                    quality={85}
                                    loading="lazy"
                                    width={0}
                                    height={0}
                                    style={{ objectFit: "center" }}
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

export default HomeAsideAddLaptop
