import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';
import Mstyles from '/Styles/mainstyle.module.css';
import { useRouter } from 'next/router';

const FeedImgPost = ({ PostData }) => {
    const [Imgurl, setImgurl] = useState('');
    const router = useRouter();
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    useEffect(() => {
        setImgurl(PostData.PostList[0].postData);
    }, [router.query]);

    return (
        <div>
            <div className={Mstyles.FeedMediaImgbox}>
                <Image
                    src={`${MediaFilesUrl}${FeedimgFolder}/${Imgurl}`}
                    alt="image"
                    placeholder="blur"
                    blurDataURL={blurredImageData}
                    layout='responsive'
                    quality={60}
                    loading="lazy"
                    width={0}
                    height={0}
                    style={{ objectFit: "cover" }}
                />



            </div>

        </div>
    );
};

export default FeedImgPost;
