import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useDropzone } from 'react-dropzone';
import Badge from '@mui/material/Badge';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { FiTrash } from "react-icons/fi";
import { styled } from '@mui/material';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config';
import CheckloginContext from '/context/auth/CheckloginContext';

const UploadFiles = () => {
    const Contextdata = useContext(CheckloginContext);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 });
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [erorrUploading, setErorrUploading] = useState(false);
    const [erorrUploadingMsg, setErorrUploadingMsg] = useState('');
    const [fileTypeNow, setFileTypeNow] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [selectFile, setSelectFile] = useState(false);
    const [fileUpldedFinal, setFileUpldedFinal] = useState(null);
    const imgRef = useRef(null);

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 32,
        height: 32,
        border: `2px solid ${theme.palette.background.paper}`,
        backgroundColor: 'white',
        cursor: 'pointer',
    }));

    // Handle image file drop
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const fileType = file.type;

        if (fileType.startsWith('image/')) {
            // Convert the file to a URL for cropping
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result);
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    };

    // Handle crop complete
    const handleCropComplete = (crop) => {
        if (imgRef.current && crop.width && crop.height) {
            const canvas = document.createElement('canvas');
            const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
            const ctx = canvas.getContext('2d');

            const pixelCrop = {
                x: crop.x * scaleX,
                y: crop.y * scaleY,
                width: crop.width * scaleX,
                height: crop.height * scaleY,
            };

            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            ctx.drawImage(
                imgRef.current,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            // Convert the canvas to a blob
            canvas.toBlob((blob) => {
                setCroppedImageBlob(blob);
            });
        }
    };

    // Handle image upload
    const handleUpload = async () => {
        if (!croppedImageBlob) return;
        const formData = new FormData();
        formData.append('file', croppedImageBlob);

        try {
            const url = MediaFilesUrl + 'user/UploadFile';
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

            if (response.data.success) {
                setUploadedFile(response.data.filename);
                const fileUrl = `${MediaFilesUrl}${MediaFilesFolder}/${response.data.filename}`;
                setFileUpldedFinal(fileUrl);
                setSelectFile(true);
            } else {
                setErorrUploading(true);
                setErorrUploadingMsg('Something went wrong');
            }
        } catch (error) {
            console.error('File upload error:', error);
        }
    };

    const handleResetUpload = () => {
        const confirmDelete = confirm("Do you really want to delete this file?");
        if (confirmDelete) {
            setUploadProgress(0);
            setSelectFile(false);
            setFileUpldedFinal('');
            setFileTypeNow('');
            setImageSrc(null);
            setCrop({ aspect: 1 / 1 });
            setCroppedImageBlob(null);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="FileUploadingbox">
            {!selectFile ? (
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
                            src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.UserData.dp}`}
                        />
                    </Badge>
                </div>
            ) : (
                <div className="UploadteUploadDetalisBox">
                    {uploadProgress > 0 && (
                        <div className="Uploadingbox">
                            {!uploadedFile ? (
                                <div>
                                    <LinearProgress variant="buffer" value={uploadProgress} valueBuffer={uploadProgress} />
                                    <div className="UploadingboxText">Uploading {uploadProgress.toFixed(2)}%</div>
                                </div>
                            ) : (
                                <div>
                                    <div className="UploadedBox">
                                        {fileTypeNow === 'video' ? (
                                            <div>
                                                <div className="FileItem">
                                                    <video muted>
                                                        <source src={fileUpldedFinal} type='video/mp4' />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    <div className="FileItemOverlay">
                                                        <IconButton
                                                            onClick={handleResetUpload}
                                                            aria-label="toggle password visibility"
                                                            style={{ color: 'white', cursor: 'pointer' }}
                                                        >
                                                            <FiTrash size={20} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="FileItem">
                                                    <img src={fileUpldedFinal} width={'100px'} />
                                                    <div className="FileItemOverlay">
                                                        <IconButton
                                                            onClick={handleResetUpload}
                                                            aria-label="toggle password visibility"
                                                            style={{ color: 'white', cursor: 'pointer' }}
                                                        >
                                                            <FiTrash size={20} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {erorrUploading && (
                        <div>{erorrUploadingMsg}</div>
                    )}
                </div>
            )}

            {imageSrc && (
                <div style={{ marginTop: '10px' }}>
                    <ReactCrop
                        src={imageSrc}
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onComplete={handleCropComplete}
                    >
                        <img
                            ref={imgRef}
                            src={imageSrc}
                            alt="Source"
                            style={{ width: '400px' }}
                        />
                    </ReactCrop>

                    <div style={{ marginTop: '10px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                            disabled={!croppedImageBlob}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const dropzoneStyles = {
    padding: '2px',
    textAlign: 'center',
    borderRadius: '50%',
};

export default UploadFiles;
