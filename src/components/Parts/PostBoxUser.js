
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'

import { useRouter, useParams } from 'next/router'
import Button from '@mui/material/Button';
import { ShortAbout, AppName, SocialHandles, MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import { Router } from 'next/router';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';



import LocationboxMain from '../Parts/LocationboxMain'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FiArrowRightCircle } from "react-icons/fi";
const PostBoxUser = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)

    const [OpenCatBox, setOpenCatBox] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [Catlist, setCatlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingSubmitPost, setLoadingSubmitPost] = useState(false);
    const [PostText, setPostText] = useState('');
    const [Category, setCategory] = useState('');
    const [CategoryText, setCategoryText] = useState('Choose');
    const [Catimg, setCatimg] = useState('categories.png');
    const [Location, setLocation] = useState('');


    const convertMetersToKilometers = (meters) => {
        return meters / 1000;
    };


    useEffect(() => {
        if (Contextdata.LocationDone == true) {

            console.log(convertMetersToKilometers(Contextdata.MapRadius))

            setLocation(Contextdata.LocationData.address)
            GetCatlistData()

        }
    }, [Contextdata.LocationDone, Contextdata.MapModal, Contextdata.LocationData]);


    const handleOpenCatBoxCatBox = (scrollType) => () => {
        setOpenCatBox(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpenCatBox(false);
    };
    const CatClick = (e) => {
        setCategory(e.slug)
        setCatimg(e.image)
        setCategoryText(e.title)
        setOpenCatBox(false);
    };

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (OpenCatBox) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [OpenCatBox]);


    const GetCatlistData = async () => {
        setIsLoading(true)
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { dataid }
        const data = await fetch("/api/V3/List/CatList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setCatlist(parsed.ReqD.MainCatList)
                setIsLoading(false)
            })
    }



    const SubmitPost = async (e) => {
        e.preventDefault();
        let Ermsg = 'Please Provide Location , Category and Post Description'

        if (PostText == '') {
            Ermsg = 'Please Write your Post Message '
        }
        if (Category == '') {
            Ermsg = 'Please Choose Post Category'

        }
        if (Location == '') {
            Ermsg = 'Please Choose Post Location'

        }


        if (PostText !== '' && Category !== '' && Location !== '') {
            setLoadingSubmitPost(true)
            const sendUM = {
                JwtToken: Contextdata.UserJwtToken,
                PostText: PostText,
                MainCat: Category,
                SubCat: Category,
                Radius: convertMetersToKilometers(Contextdata.MapRadius),
                Latitude: Contextdata.LocationData.lat,
                Longitude: Contextdata.LocationData.lng
            }
            const data = await fetch("/api/User/CreateUserPost", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setTimeout(function () {
                        setLoadingSubmitPost(false)
                    }, 2000);

                    if (parsed.ReqData.done) {
                        setPostText('')

                        Contextdata.ChangeAlertData('Post Published 😍', 'success')
                    } else {

                        Contextdata.ChangeAlertData('Something Went Wrong  😌', 'warning')
                    }


                })

        } else {

            Contextdata.ChangeAlertData(Ermsg, 'warning')
        }



    }

    const handleTextareaChange = (e) => {
        setPostText(e.target.value);
    };


    return (
        <div>

            <div className={Mstyles.PostBoxUser}>
                <div className={Mstyles.PostBoxUserHeader}>
                    <span>Post Your <span className={Mstyles.MainGradientText}>Requirements</span></span>
                    <small>Your Post Will be Visible to Our Vendors</small>

                </div>
                <div className={Mstyles.PostBoxUserInput}>
                    <textarea
                        placeholder="Write your post here..."
                        value={PostText}

                        onChange={handleTextareaChange}
                    />
                </div>
                <div className={Mstyles.PostAddonItemBox}>

                    <LocationboxMain ShowType={1} />

                    <div className={Mstyles.PostAddonItem} onClick={handleOpenCatBoxCatBox('paper')}>
                        <div className={Mstyles.PostAddonItemA}>
                            <Image
                                src={`${MediaFilesUrl}${MediaFilesFolder}/${Catimg}`}
                                alt="image"

                                placeholder='blur'
                                width={20}
                                height={20}
                                quality={100}
                                blurDataURL={blurredImageData}

                            />

                        </div>
                        <div className={Mstyles.PostAddonItemB}>
                            <span>Category</span>
                            <div style={{ height: '5px' }}></div>
                            <small>{CategoryText}</small>

                        </div>

                    </div>

                </div>



                <div style={{ height: 15 }}></div>

                <div className={Mstyles.PostBoxFotter}>
                    <div className={Mstyles.Postbtn}>
                        <LoadingButton
                            fullWidth
                            onClick={SubmitPost}
                            endIcon={<FiChevronRight />}
                            loading={LoadingSubmitPost}
                            loadingPosition="end"
                            variant="contained"
                            size='small'
                            className={Mstyles.MainBtnActive}
                        >
                            <span>Submit Post</span>
                        </LoadingButton>
                    </div>
                    <div style={{ height: 5 }}></div>
                    <small style={{ fontSize: '10px' }}>You agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>

                </div>


            </div>


            <React.Fragment>

                <Dialog
                    open={OpenCatBox}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Select post Category</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <div>

                            <div className={Mstyles.Modalwidth}></div>
                            <div className={Mstyles.SCatGrid}>
                                {Catlist.map((item, index) => {
                                    return <div className={Mstyles.HomeCatGridItem} key={index} onClick={() => CatClick(item)}  >
                                        <div className={Mstyles.HomeCatGridItemImageBox}>
                                            <div className={Mstyles.HomeCatGridItemImage}>

                                                <Image
                                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.image}`}
                                                    alt=""
                                                    fill
                                                    blurDataURL={blurredImageData}
                                                    placeholder='blur'
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={Mstyles.HomeCatGridItemContent}>
                                            <span className={Mstyles.OnlyDesktop}>{item.title.length > 12 ? `${item.title.slice(0, 12)} ...` : item.title}</span>
                                            <span className={Mstyles.OnlyMobile}>{item.title.length > 10 ? `${item.title.slice(0, 10)} ...` : item.title}</span>
                                        </div>



                                    </div>

                                }

                                )}


                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>

                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default PostBoxUser
