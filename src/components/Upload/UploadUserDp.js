import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useDropzone } from 'react-dropzone';
import Badge from '@mui/material/Badge';

import CheckloginContext from '/context/auth/CheckloginContext'

import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config'
import Mstyles from '/styles/mainstyle.module.css'

import IconButton from '@mui/material/IconButton';
import { FiImage, FiTrash } from "react-icons/fi";


import LinearProgress from '@mui/material/LinearProgress';
import { useRouter, useParams } from 'next/navigation'

import {
    styled,

    TextField,
    useTheme,
} from '@mui/material';
const UploadFiles = () => {
    const router = useRouter()

    const Contextdata = useContext(CheckloginContext)
    const [uploadedFile, setUploadedFile] = useState(null);
    const [ErorrUploading, setErorrUploading] = useState(false);
    const [ErorrUploadingMsg, setErorrUploadingMsg] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const [LoadDp, setLoadDp] = useState(true);


    const [UserDp, setUserDp] = useState(Contextdata.UserData.dp);

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 32,
        height: 32,
        border: `2px solid ${theme.palette.background.paper}`,
        backgroundColor: 'white',
        cursor: 'pointer',
    }));
    useEffect(() => {

    }, [LoadDp]);

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
        let text = "Do you really want to delete this file";
        if (confirm(text) == true) {
            setProgress(0);
            setSelectFile(false)
            setFileUpldedFinal('')
            setFileTypeNow('')
        }



    }

   
    React.useEffect(() => {
        setProgress(0);
        setSelectFile(false)
        setFileUpldedFinal('/img/upload.png')

    }, [router.query]);


    const onDrop = async (acceptedFiles) => {
        const fileFormat = acceptedFiles[0].type;


        if (fileFormat.startsWith('image/') || fileFormat.startsWith('video/')) {
            setFileTypeNow(fileFormat)
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

                    setUploadedFile(response.data.filename);
                    document.getElementById("UploadFilename").value = response.data.filename;
                    const Fimg = MediaFilesUrl + MediaFilesFolder + '/' + response.data.filename
                    setFileUpldedFinal(Fimg)


                    if (fileFormat.startsWith('image/')) {
                        setFileTypeNow('image')


                    }
                    if (fileFormat.startsWith('video/')) {
                        setFileTypeNow('video')

                    }

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
            {!SelectFile ?
                <div>
                 <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={

                            <div {...getRootProps()} style={dropzoneStyles}>
                                <input {...getInputProps()} />
                                <SmallAvatar alt={Contextdata.UserData.name} src="/img/up-loading.png" />
                            </div>

                        }
                    >
                        <Avatar

                            alt={Contextdata.UserData.name}
                            sx={{ width: 100, height: 100 }}
                            src={`${MediaFilesUrl}${MediaFilesFolder}/${UserDp}`}
                        />
                    </Badge>

                </div> :
                <div className={Mstyles.UploadteUploadDetalisBox}>
                    {uploadProgress > 0 &&
                        <div className={Mstyles.Uploadingbox}>

                            {!uploadedFile ?
                                <div>
                                    <LinearProgress variant="buffer" value={uploadProgress} valueBuffer={uploadProgress} />
                                    <div className={Mstyles.UploadingboxText}>  Uploading {uploadProgress.toFixed(2)}%</div>
                                </div> :
                                <div>

                                    <div className={Mstyles.UploadedBox}>
                                        {FileTypeNow == 'video' ?
                                            <div>
                                                <div className={Mstyles.FileItem}>
                                                    <video muted>
                                                        <source src={FileUpldedFinal} type='video/mp4'></source>
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    <div className={Mstyles.FileItemOverlay}>

                                                        <IconButton
                                                            onClick={ResetUpload}
                                                            aria-label="toggle password visibility"
                                                            style={{ color: 'white', cursor: 'pointer' }}
                                                        >
                                                            <FiTrash size={20} />
                                                        </IconButton>
                                                    </div>
                                                </div>

                                            </div> :
                                            <div>

                                                <div className={Mstyles.FileItem}>
                                                    <img src={FileUpldedFinal} />
                                                    <div className={Mstyles.FileItemOverlay}>

                                                        <IconButton
                                                            onClick={ResetUpload}
                                                            aria-label="toggle password visibility"
                                                            style={{ color: 'white', cursor: 'pointer' }}
                                                        >
                                                            <FiTrash size={20} />
                                                        </IconButton>
                                                    </div>
                                                </div>

                                            </div>

                                        }
                                    </div>


                                </div>
                            }

                        </div>
                    }
                    {ErorrUploading &&
                        <div>{ErorrUploadingMsg}</div>
                    }


                </div>

            }

        </div>
    );
};

const dropzoneStyles = {

    padding: '2px',
    textAlign: 'center',
    borderRadius: '50%'
};

export default UploadFiles;
