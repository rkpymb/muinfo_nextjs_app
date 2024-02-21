import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'

import Skeleton from '@mui/material/Skeleton';
import Mstyles from '/Styles/mainstyle.module.css'
import VendorItem from '../ListParts/VendorItem'


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
function RecentOrders() {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [limit, setlimit] = useState(5);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const GetSliders = async () => {
      
        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            page: page,
            limit: limit,
            Latitude: Contextdata.LocationData.lat,
            Longitude: Contextdata.LocationData.lng,
            MaxDistance: Contextdata.MapRadius
           

        }
        const data = await fetch("/api/V3/List/VendorsList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqData.ListData)
                setRetdata(parsed.ReqData.ListData)
                setIsLoading(false)
                setHasMore(false);
            })
    }
    useEffect(() => {
        if(Contextdata.LocationData){
            GetSliders()
        }
       
    }, [router.query])
    return (<div>
        {isLoading ?
            <div>
            </div> :
            <div>
                <div>
                    <Swiper
                        breakpoints={{
                            768: {
                                slidesPerView: 1.5, // Display 2 slides on tablets (768px or more)
                            },
                            992: {
                                spaceBetween: 10,
                                slidesPerView: 2.5, // Display 3 slides on desktop (992px or more)
                            },
                        }}

                        spaceBetween={0}
                        centeredSlides={false}
                        autoplay={{
                            delay: 5500000,
                            disableOnInteraction: true,
                        }}
                      
                        navigation={true}
                        modules={[Autoplay, Navigation]}


                    >
                        {Retdata.map((item, index) => {
                            return <SwiperSlide key={index} onClick={() => router.push(`/v/${item.VendorData.username}`)}>
                                <VendorItem MData={item} />

                            </SwiperSlide>



                        }

                        )}


                    </Swiper>
                </div>
            </div>

        }

    </div>
    );
}

export default RecentOrders;
