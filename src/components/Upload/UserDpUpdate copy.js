import React, { useState, useEffect, useContext ,useRef} from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'

import Dialog from '@mui/material/Dialog';

import Avatar from '@mui/material/Avatar';
import { useDropzone } from 'react-dropzone';
import Badge from '@mui/material/Badge';
import { LuXCircle, LuSearch, LuChevronRight, LuArrowLeft, LuMinus, } from "react-icons/lu";


import axios from 'axios';

import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Mstyles from '/styles/mainstyle.module.css'
import { FiTrash } from "react-icons/fi";
import { styled } from '@mui/material';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config';

import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const dropzoneStyles = {

    padding: '2px',
    textAlign: 'center',
    borderRadius: '50%'
};


const Demo = ({ SType }) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [OpenEdit, setOpenEdit] = React.useState(false);

    const [Results, setResults] = useState([]);
    const [Loading, setLoading] = useState(false);


    const [UserDp, setUserDp] = useState();


    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState(); // Initial crop aspect and dimensions set to 20% centered
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [erorrUploading, setErorrUploading] = useState(false);
    const [AllDone, setAllDone] = useState(false);
    const [BtnLoading, setBtnLoading] = useState(false);
    const [erorrUploadingMsg, setErorrUploadingMsg] = useState('');
    const [fileTypeNow, setFileTypeNow] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [selectFile, setSelectFile] = useState(false);
    const [fileUpldedFinal, setFileUpldedFinal] = useState(null);
    const imgRef = useRef(null);


    // Handle image file drop
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const fileType = file.type;

        if (fileType.startsWith('image/')) {
            // Convert the file to a URL for cropping
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
          
              
            };
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
        setSelectFile(true);
        setBtnLoading(true);
        try {
            const url = `${MediaFilesUrl}user/UploadFile`;
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
                const NewFile = response.data.filename
                UpdatePicture(NewFile)

            } else {
                setBtnLoading(false);
                Contextdata.ChangeAlertData('Something went wrong 😒', 'warning')
                setErorrUploading(true);
                setErorrUploadingMsg('Something went wrong');
            }

        } catch (error) {
            setBtnLoading(false);
            console.error('File upload error:', error);
        }
    };

    const UpdatePicture = async (FN) => {
        const sendUM = {
            dp: FN,
        }
        const data = await fetch("/api/user/update_user_dp", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                if (parsed.ReqData.done) {
                    Contextdata.ChangeAlertData('Profile Updated Successfully', 'success')
                    setUploadedFile(FN);
                    const fileUrl = `${MediaFilesUrl}${MediaFilesFolder}/${FN}`;
                    setFileUpldedFinal(fileUrl);
                    setBtnLoading(false);
                    setAllDone(true)
                    handleCloseEdit(false);
                    window.location.reload();


                } else {
                    setBtnLoading(false);
                    Contextdata.ChangeAlertData('Something went wrong 😒', 'warning')

                }

            })


    }

    const handleResetUpload = () => {
        const confirmDelete = confirm("Do you really want to delete this file?");
        if (confirmDelete) {
            setUploadProgress(0);
            setSelectFile(false);
            setFileUpldedFinal('');
            setFileTypeNow('');
            setImageSrc(null);
            setCrop({ aspect: 1 });
            setCroppedImageBlob(null);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });


    useEffect(() => {
        if (Contextdata.UserData) {
            setUserDp(Contextdata.UserData.dp)

        }
    }, [Contextdata.UserData]);

    const handleClickOpen = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 32,
        height: 32,
        border: `2px solid ${theme.palette.background.paper}`,
        backgroundColor: 'white',
        cursor: 'pointer',
    }));



  
    return (
        <div>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={

                    <div>

                        <SmallAvatar onClick={handleClickOpen} alt={Contextdata.UserData.name} src="/img/pen.png" />
                    </div>

                }
            >
                <Avatar

                    alt={Contextdata.UserData.name}
                    sx={{ width: 100, height: 100 }}
                    src={`${MediaFilesUrl}${MediaFilesFolder}/${UserDp}`}
                />
            </Badge>

            <Dialog
                fullScreen
                open={OpenEdit}
                onClose={handleCloseEdit}
                TransitionComponent={Transition}
            >

                <div className={Mstyles.DpDiloagContainer}>
                    <div className={Mstyles.DpDiloagHeader}>
                        <div>
                            <IconButton
                                onClick={handleCloseEdit}
                                aria-label="toggle password visibility"
                                style={{ width: 40, height: 40, }}
                            >
                                <LuArrowLeft size={20} />
                            </IconButton>
                        </div>
                        <div>
                            <span>Change Profile Picture</span>
                        </div>

                    </div>
                    <div>
            <div className={Mstyles.SecDevider}></div>
            {!selectFile ? (
                <div className={Mstyles.DpMbox}>
                    <Avatar
                        alt={Contextdata.UserData.name}
                        sx={{ width: 150, height: 150 }}
                        src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.UserData.dp}`}
                    />

                    <div {...getRootProps()} className={Mstyles.dropzoneStyles}>
                        <input {...getInputProps()} />
                        <div className={Mstyles.dropzoneStylesA}>
                            <SmallAvatar alt={Contextdata.UserData.name} src="/img/up-loading.png" />
                        </div>
                        <div className={Mstyles.dropzoneStylesB}>
                            Select File to Upload
                        </div>
                    </div>
                </div>
            ) : (
                <div className={Mstyles.DpMbox}>
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
                                        <div>
                                            <div className="FileItem">
                                                <Avatar
                                                    alt={Contextdata.UserData.name}
                                                    sx={{ width: 100, height: 100 }}
                                                    src={`${fileUpldedFinal}`}
                                                />
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
                <div className={Mstyles.DpMbox}>
                    <div style={{ margin: '10px' }}>Crop Image to set Profile Picture</div>

                    <ReactCrop
                        src={imageSrc}
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onComplete={handleCropComplete}
                    >
                        <img ref={imgRef} src={imageSrc} alt="Source" style={{ maxWidth: '300px' }} />
                    </ReactCrop>

                    {croppedImageBlob &&
                        <div>
                            <div style={{ marginTop: '20px' }}>
                                <LoadingButton
                                    fullWidth
                                    onClick={handleUpload}
                                    endIcon={<FiChevronRight />}
                                    loading={BtnLoading}
                                    disabled={BtnLoading}
                                    loadingPosition="end"
                                    variant="contained"
                                >
                                    Update Profile Picture
                                </LoadingButton>
                                <div className={Mstyles.SecDevider}></div>
                            </div>
                        </div>

                    }


                </div>
            )}
        </div>
                </div>

            </Dialog >

        </div >
    )
};

export default Demo;