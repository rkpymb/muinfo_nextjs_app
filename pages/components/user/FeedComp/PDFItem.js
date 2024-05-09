import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LuEye, LuDownload } from "react-icons/lu";
import { MediaFilesUrl, FeedimgFolder } from '/Data/config';
import Mstyles from '/styles/mainstyle.module.css';
import Image from 'next/image';
import LoadingButton from '@mui/lab/LoadingButton';

const PDFItem = ({ item }) => {
    // Define the local storage key for the object that stores PDF files
    const LOCAL_STORAGE_KEY = 'downloadedPDFs';
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    // State variables
    const [downloadProgress, setDownloadProgress] = useState(null);
    const [isDownloaded, setIsDownloaded] = useState(false);

    // On component mount, check if the file is already downloaded and saved in local storage
    useEffect(() => {
        const downloadedPDFs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (downloadedPDFs && downloadedPDFs[item?.PostID]) {
            setIsDownloaded(true);
        }
    }, [item?.PostID]);

    const handleDownload = async () => {
        if (!item?.PostList?.[0]?.postData) {
            console.error('Invalid item data');
            return;
        }
        
        try {
            // Construct the URL using imported constants and the item's postData
            const pdfUrl = `${MediaFilesUrl}${FeedimgFolder}/${item.PostList[0].postData}`;

            // Fetch the PDF file as a blob
            const response = await axios.get(pdfUrl, {
                responseType: 'blob',
                onDownloadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setDownloadProgress(progress);
                },
            });

            // Once the download is complete
            setDownloadProgress(100);
            setIsDownloaded(true);

            // Create a Blob and convert it to a Base64 string
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const reader = new FileReader();
            reader.onloadend = function () {
                // Convert the Blob to a Base64 string
                const base64String = reader.result;

                // Retrieve the existing downloaded PDFs object from local storage
                let downloadedPDFs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

                // Update the object with the new Base64 string for the item PostID
                downloadedPDFs[item.PostID] = base64String;

                // Save the updated object back to local storage
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(downloadedPDFs));
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleView = () => {
        const downloadedPDFs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (downloadedPDFs && downloadedPDFs[item?.PostID]) {
            const base64String = downloadedPDFs[item.PostID];

            // Convert the Base64 string back to a Blob
            const base64Parts = base64String.split(',');
            const byteCharacters = atob(base64Parts[1]);
            const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            // Create a URL for the Blob and open the PDF in a new tab or window
            const fileUrl = URL.createObjectURL(blob);
            window.open(fileUrl, '_blank');
        }
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
                            blurDataURL={blurredImageData}
                            placeholder='blur'
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
                <div className={Mstyles.PdfitemCoverB}>
                    {isDownloaded ? (
                        // If the file has been downloaded, show the "View" button
                        <LoadingButton
                            fullWidth
                            onClick={handleView}
                            endIcon={<LuEye />}
                            loading={false}
                            size='small'
                            loadingPosition="end"
                            variant="outlined"
                        >
                            <span>View</span>
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            fullWidth
                            onClick={handleDownload}
                            endIcon={<LuDownload />}
                            size='small'
                            loading={downloadProgress !== null && downloadProgress !== 100}
                            disabled={downloadProgress === 100}
                            loadingPosition="end"
                            variant="outlined"
                        >
                            <span>Download</span>
                        </LoadingButton>
                    )}
                    {downloadProgress !== null && downloadProgress !== 100 && (
                        <p>Progress: {downloadProgress}%</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PDFItem;
