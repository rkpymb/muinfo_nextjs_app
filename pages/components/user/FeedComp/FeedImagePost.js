import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';
import Mstyles from '/styles/mainstyle.module.css';
import { useRouter } from 'next/router';
import CheckloginContext from '/context/auth/CheckloginContext'
const FeedImgPost = ({ Imgurl, PostData }) => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter();
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const Viewimg = async () => {

        if (Contextdata.AppMode) {
            console.log(PostData.PostData.PostID)
            if (PostData.PostData.PostID) {
                const PostID = PostData.PostData.PostID
                window.open(`/media_view/${PostID}`, '_blank');

            }

        } else {
            window.open(`/Image_view/${Imgurl}`, '_blank');

        }

    };


    return (
        <div className={Mstyles.FeedMediaImgbox} onClick={Viewimg}>
            <img
                src={`${MediaFilesUrl}${FeedimgFolder}/${Imgurl}`}
                alt="image"
                placeholder="blur"
                blurDataURL={blurredImageData}
                quality={100}
                loading="lazy"

            />
        </div>
    );
};

export default FeedImgPost;
