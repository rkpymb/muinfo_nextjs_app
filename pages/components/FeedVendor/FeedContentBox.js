import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router'


import Avatar from '@mui/material/Avatar';

import { FiArrowRightCircle, FiMoreVertical, FiMessageCircle, FiHeart, FiShare2 } from "react-icons/fi";
import Mstyles from '/Styles/mainstyle.module.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import FeedVideoPost from './FeedVideoPost';
import FeedImagePost from './FeedImagePost';

const FeedContentBox = ({ PostData }) => {
    const [ShowData, setShowData] = useState(false);
    const router = useRouter();
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    useEffect(() => {
        // console.log(PostData)
        setShowData(true)
    }, [router.query]);

    return (
        <div>
            {ShowData &&
                <div className={Mstyles.FeedItemMedium}>
                    <div className={Mstyles.FeedItemMediumTextbox}>
                        {PostData.PostData.PostText}
                    </div>
                    <div className={Mstyles.PostMediabox}>
                        {PostData.PostData.PostList[0].PostType == 'image' &&
                            <FeedImagePost PostData={PostData.PostData} />

                        }
                        {PostData.PostData.PostList[0].PostType == 'video' &&
                            <FeedVideoPost PostData={PostData.PostData} />

                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default FeedContentBox;
