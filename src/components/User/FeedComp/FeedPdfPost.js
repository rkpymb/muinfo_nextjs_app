import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MediaFilesUrl, FeedimgFolder } from '/Data/config';
import Mstyles from '/styles/mainstyle.module.css';
function FeedImgPost({ PostData }) {
    const router = useRouter();
    const [Pdfurl, setPdfurl] = useState('/mypdffile.pdf');



    useEffect(() => {

        if (PostData) {
            setPdfurl(`${MediaFilesUrl}${FeedimgFolder}/${PostData.PostList[0].postData}`)
        }

    }, [router.query]);


    return (
        <div className={Mstyles.Padfboxiframe}>
            <iframe src={`${Pdfurl}`} title="pdffile">
            </iframe>


        </div>
    );
}

export default FeedImgPost;
