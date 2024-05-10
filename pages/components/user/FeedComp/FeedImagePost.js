import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';
import Mstyles from '/styles/mainstyle.module.css';
import { useRouter } from 'next/router';

const FeedImgPost = ({ Imgurl }) => {

    const router = useRouter();
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';



    const Viewimg = async () => {
        const TragetUrl = Imgurl
        if (TragetUrl) {
            // window.open(`${MediaFilesUrl}${FeedimgFolder}/${TragetUrl}`, "_blank");
            console.log(`${MediaFilesUrl}${FeedimgFolder}/${TragetUrl}`, "_blank");
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
