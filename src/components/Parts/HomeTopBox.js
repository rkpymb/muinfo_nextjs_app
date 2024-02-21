import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from '@mui/material/Skeleton';
import Mstyles from '../../../Styles/mainstyle.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import {

    useTheme,
} from '@mui/material';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
function RecentOrders() {

    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


    const GetSliders = async () => {

        const sendUM = { PType: 'Website' }
        const data = await fetch("/api/V3/List/PostersliderlistWebsite", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.PosterSliders)
                setRetdata(parsed.ReqD.PosterSliders)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        GetSliders()
    }, [router.query])
    return (<div>

        <div className={Mstyles.context}>
            <div className={Mstyles.HomeTopBox}>
                <div className={Mstyles.HomeTopBoxA}>
                    <h1>Discover everything you need to plan <span style={{ color: 'blue' }}>your big day</span> 💐</h1>
                    <div className={Mstyles.HomeTopBoxASubtext}>
                        <div style={{ height: '20px' }}></div>
                        <span>Search over 73,000 local professionals with reviews, pricing, and more.</span>
                    </div>


                    <div>
                        <div style={{ height: '20px' }}></div>
                        <form className="searcher app-searcher">

                            <div className="searcher__category app-filter-searcher-field" data-bound-classes=",.searcher__category">
                                <i className="svgIcon svgIcon__search searcher__categoryIcon"><svg viewBox="0 0 74 77"><path d="M49.35 48.835l23.262 23.328a2.316 2.316 0 11-3.28 3.27L45.865 51.901a28.534 28.534 0 01-17.13 5.683C12.867 57.584.014 44.7.014 28.8.014 12.896 12.865.015 28.735.015 44.593.015 57.446 12.9 57.446 28.8a28.728 28.728 0 01-8.097 20.035zM52.813 28.8c0-13.345-10.782-24.153-24.079-24.153-13.31 0-24.089 10.805-24.089 24.153 0 13.344 10.782 24.152 24.09 24.152 13.294 0 24.078-10.811 24.078-24.152z" fill-rule="nonzero"></path></svg></i>        <input className="searcher__input app-filter-searcher-input app-searcher-category-input-tracking" type="text" value="" name="txtStrSearch" data-last-value="" data-placeholder-default="Search for" data-placeholder-focused="Search for" aria-label="Search for" placeholder="Search for" autocomplete="off" aria-expanded="true" />
                                <span data-href="" className="searcher__categoryReset app-searcher-reset-category">
                                    <i className="svgIcon svgIcon__close searcher__categoryResetIcon"><svg viewBox="0 0 26 26"><path d="M12.983 10.862L23.405.439l2.122 2.122-10.423 10.422 10.423 10.422-2.122 2.122-10.422-10.423L2.561 25.527.439 23.405l10.423-10.422L.439 2.561 2.561.439l10.422 10.423z" fill-rule="nonzero"></path></svg></i>            </span>

                            </div>
                            <div className="searcher__location">
                                <span className="searcher__locationFixedText">in</span>
                                <input className="searcher__input app-searcher-location-input app-searcher-location-input-tracking" type="text" data-last-value="" data-placeholder-default="(E.g. Delhi)" placeholder="(E.g. Delhi)" data-placeholder-focused="Where" aria-label="Where" value="" name="txtLocSearch" autocomplete="off" />
                                <span data-href="" className="searcher__locationReset app-searcher-reset-location">
                                    <i className="svgIcon svgIcon__close searcher__locationResetIcon"><svg viewBox="0 0 26 26"><path d="M12.983 10.862L23.405.439l2.122 2.122-10.423 10.422 10.423 10.422-2.122 2.122-10.422-10.423L2.561 25.527.439 23.405l10.423-10.422L.439 2.561 2.561.439l10.422 10.423z" fill-rule="nonzero"></path></svg></i>            </span>

                            </div>
                            <button type="submit" className="searcher__submit app-searcher-submit-tracking">
                                Find        </button>
                        </form>

                    </div>


                </div>
                <div className={Mstyles.HomeTopBoxB}>
                    <img src='/img/s1.jpg' alt='img' />
                </div>
            </div>
        </div>


        <div className={Mstyles.area} >
            <ul className={Mstyles.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div >


    </div>

    );
}

export default RecentOrders;
