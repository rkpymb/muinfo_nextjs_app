import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'


import Avatar from '@mui/material/Avatar';

import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import FeedVideoPost from './FeedVideoPost';
import FeedImagePost from './FeedImagePost';
import PDFItem from './PDFItem';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const FeedContentBox = ({ PostData }) => {
    const [ShowData, setShowData] = useState(false);
    const [PData, setPData] = useState([]);
    const router = useRouter();
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    useEffect(() => {
        setPData(PostData.PostData.PostList)
        console.log(PostData.PostData.PostList)
        setShowData(true)
    }, [PostData]);

    return (
        <div>
            {ShowData &&
                <div className={Mstyles.FeedItemMedium}>
                    <div className={Mstyles.FeedItemMediumTextbox} dangerouslySetInnerHTML={{ __html: PostData.PostData.PostText }} />
                    <Swiper
                        className={Mstyles.PostMediabox}
                        breakpoints={{
                            768: {
                                slidesPerView: 1,
                            },
                            992: {
                                slidesPerView: 1, // Display 3 slides on desktop (992px or more)
                            },
                        }}
                        slidesPerView={1}
                        spaceBetween={10}
                        centeredSlides={false}

                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                    >

                        {PData.map((item, index) => {
                            return <SwiperSlide key={index}>

                                {item.postType.startsWith('image/') &&
                                    <FeedImagePost Imgurl={item.postData} />

                                }
                                {item.postType.startsWith('application/pdf') &&
                                    <PDFItem item={item}  />

                                }
                                {item.postType.startsWith('video/') &&
                                    <FeedVideoPost item={item} />

                                }
                            </SwiperSlide>

                        }

                        )}


                    </Swiper>
                </div>
            }
        </div>
    );
};

export default FeedContentBox;
