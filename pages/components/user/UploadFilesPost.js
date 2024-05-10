import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useDropzone } from 'react-dropzone';
import Badge from '@mui/material/Badge';

import CheckloginContext from '/context/auth/CheckloginContext'

import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config'
import Mstyles from '/styles/mainstyle.module.css'

import IconButton from '@mui/material/IconButton';

import LinearProgress from '@mui/material/LinearProgress';
import { useRouter, useParams } from 'next/router'

import {
    styled,

    TextField,
    useTheme,
} from '@mui/material';
import { SellTwoTone } from '@mui/icons-material';
const UploadFiles = ({ onFileUpload}) => {
    const router = useRouter()

    const Contextdata = useContext(CheckloginContext)
    const [uploadedFile, setUploadedFile] = useState(null);
    const [ErorrUploading, setErorrUploading] = useState(false);
    const [ErorrUploadingMsg, setErorrUploadingMsg] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);


    const [SelectFile, setSelectFile] = useState(false);


    const [FileUpldedFinal, setFileUpldedFinal] = useState('');
    const [FileTypeNow, setFileTypeNow] = useState('');


    const [progress, setProgress] = React.useState(0);


    const progressRef = React.useRef(() => { });
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);

            } else {
                const diff = Math.random() * 10;

                setProgress(progress + diff);

            }
        };
    });


    const ResetUpload = async (e) => {
        setUploadProgress(0);
        setSelectFile(false)
        setTimeout(function () {
            setUploadedFile(null)
        }, 2000);


    }

    useEffect(() => {

        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);
    React.useEffect(() => {
        setProgress(0);
        setSelectFile(false)
        setFileUpldedFinal('/img/up-loading_red.png')

    }, [router.query]);


    const onDrop = async (acceptedFiles) => {
        let fileFormat = acceptedFiles[0].type;

        if (fileFormat.startsWith('image/') || fileFormat.startsWith('video/') || fileFormat === 'application/pdf') {

            setSelectFile(true)
            setUploadProgress(0)
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
            try {

                const url = MediaFilesUrl + 'user/UploadFile'
                const response = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'folderName': 'feedpost',
                        Authorization: `Bearer ${Contextdata.UserJwtToken}`,

                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setUploadProgress(progress);
                    },
                });

                if (response.data.success == true) {

                    const Filedata = {
                        postData: response.data.filename,
                        postType: fileFormat,

                    }
                    onFileUpload(Filedata);

                    setUploadedFile(response.data.filename);
                    ResetUpload()
                } else {
                    setErorrUploading(true)
                    setErorrUploadingMsg('Something went wrong')
                }

            } catch (error) {
                console.error('File upload error:', error);
            }

        } else {
            alert('Selected file is of an unsupported format.');
        }

    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={Mstyles.FileUploadingbox}>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <div className={Mstyles.Choosefileflex}>

                    <IconButton
                        aria-label="toggle password visibility"
                        style={{ width: 40, height: 40 }}
                    >
                        <img src='/img/up-loading_red.png' width={'100%'} />
                    </IconButton>
                    <span className={Mstyles.ChoosefileText}>attach photo, video or pdf</span>

                </div>

            </div>

            <div className={Mstyles.UploadteUploadDetalisBox}>
                {uploadProgress > 0 &&
                    <div className={Mstyles.Uploadingbox}>

                        {!uploadedFile ?
                            <div>
                                <LinearProgress variant="buffer" value={uploadProgress} valueBuffer={uploadProgress} />
                                <div className={Mstyles.UploadingboxText}>  Uploading {uploadProgress.toFixed(2)}%</div>
                            </div> :
                           null
                        }

                    </div>
                }
                {ErorrUploading &&
                    <div>{ErorrUploadingMsg}</div>
                }


            </div>


        </div>
    );
};

const dropzoneStyles = {

    padding: '2px',
    textAlign: 'center',
    borderRadius: '50%'
};

export default UploadFiles;
