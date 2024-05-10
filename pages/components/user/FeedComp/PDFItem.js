import React, { useState } from 'react';
import axios from 'axios';
import { LuEye, LuDownload } from "react-icons/lu";
import { MediaFilesUrl, FeedimgFolder } from '/Data/config';
import Mstyles from '/styles/mainstyle.module.css';
import Image from 'next/image';
import LoadingButton from '@mui/lab/LoadingButton';

const PDFItem = ({ item }) => {
    // State variables
    const [downloadProgress, setDownloadProgress] = useState(null);

    const handleDownload = async () => {
        if (!item?.postData) {
            console.error('Invalid item data');
            return;
        }

        try {
            // Construct the URL using imported constants and the item's postData
            const pdfUrl = `${MediaFilesUrl}${FeedimgFolder}/${item.postData}`;

            // Fetch the PDF file as a blob
            const response = await axios.get(pdfUrl, {
                responseType: 'blob',
                onDownloadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setDownloadProgress(progress);
                },
            });

            // Create a Blob from the PDF response
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a URL for the Blob
            const fileUrl = URL.createObjectURL(blob);

            // Create a link element and trigger the download
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = item.postData;
            link.click();

            // Clean up the created URL
            URL.revokeObjectURL(fileUrl);

            // Reset the download progress
            setDownloadProgress(null);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleView = async () => {
        if (!item?.postData) {
            console.error('Invalid item data');
            return;
        }

        // Construct the URL using imported constants and the item's postData
        const pdfUrl = `${MediaFilesUrl}${FeedimgFolder}/${item.postData}`;

        // Open the PDF in a new tab or window
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className={Mstyles.Pdfitem}>
            <div className={Mstyles.PdfitemCover}>
                <div className={Mstyles.PdfitemCoverA}>
                    <div className={Mstyles.pdfimg}>
                        <Image
                            src={'/img/pdf.png'}
                            alt=''
                            fill
                            height={'100%'}
                            width={'100%'}
                            size='small'
                            blurDataURL={'/img/pdf.png'}
                            placeholder='blur'
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
                <div className={Mstyles.downloadPgbox}>
                {downloadProgress !== null && downloadProgress !== 100 && (
                        <p>Downloading: {downloadProgress}%</p>
                    )}
                </div>
                <div className={Mstyles.PdfitemCoverB}>
                    <LoadingButton
                        fullWidth
                        onClick={handleDownload}
                        startIcon={<LuDownload />}
                        size='small'
                        loading={downloadProgress !== null && downloadProgress !== 100}
                        loadingPosition="end"
                        variant="outlined"
                    >
                        <span>Download</span>
                    </LoadingButton>

                    <div style={{ width: '20px' }}></div>
                    <LoadingButton
                        fullWidth
                        onClick={handleView}
                        startIcon={<LuEye />}
                        size='small'
                        loading={false}
                        loadingPosition="end"
                        variant="outlined"
                    >
                        <span>View</span>
                    </LoadingButton>

                   
                </div>
            </div>
        </div>
    );
};

export default PDFItem;
