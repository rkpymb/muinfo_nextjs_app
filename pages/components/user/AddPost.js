import React, { useState, useEffect, useContext } from 'react';
import Skeleton from '@mui/material/Skeleton';
import {
    Typography,
    Box,

    Button,
    styled
} from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import IconButton from '@mui/material/IconButton';

import EditCategoryForm from './EditCategoryForm';
import EditCollegeForm from './EditCollegeForm';
const ariaLabel = { 'aria-label': 'description' };
import { LuPlus, LuX, LuPencilLine, LuTrash2 } from "react-icons/lu";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import Image from 'next/image';


import Switch from '@mui/material/Switch';

import Avatar from '@mui/material/Avatar';
import CheckloginContext from '/context/auth/CheckloginContext'


import Mstyles from '/styles/mainstyle.module.css'

import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import { useRouter, useParams } from 'next/router'


import UploadFilesPost from './UploadFilesPost'
import Uploadimg from './Uploadimg'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

const PostBox = () => {

    const router = useRouter()
    const [Loading, setLoading] = useState(true);
    const [LoadingSubmitPost, setLoadingSubmitPost] = useState(false);
    const [DesabledButon, setDesabledButon] = useState(true);
    const [PostText, setPostText] = useState();
    const [EditorContent, setEditorContent] = useState('');
    const [CatTitle_new, setCatTitle_new] = useState(null);
    const [CollegeName_new, setCollegeName_new] = useState(null);
    const [CatTitle_edit, setCatTitle_edit] = useState(null);
    const [LoadingCatadd, setLoadingCatadd] = useState(false);
    const [tags, setTags] = useState('xyz');
    const [Category, setCategory] = useState(null);
    const [College, setCollege] = useState(null);
    const [CategoryText, setCategoryText] = useState('Select Post Category *');
    const [CollegeText, setCollegeText] = useState('Select Post College');
    const [Catlist, setCatlist] = useState([]);
    const [CollegeList, setCollegeList] = useState([]);

    const [AddCatBox, setAddCatBox] = useState(false);
    const [AddCollgebox, setAddCollgebox] = useState(false);
    const [OpenCatBox, setOpenCatBox] = useState(false);
    const [OpenCollege, setOpenCollege] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [Catimg, setCatimg] = useState('categories.png');
    const [Collegeimg, setCollegeimg] = useState('college.png');
    const [College_img, setCollege_img] = useState(null);
    const Contextdata = useContext(CheckloginContext)
    const [SendTelegram, setSendTelegram] = useState(true);
    const [EditCatBox, setEditCatBox] = useState(true);
    const [SendOneSignal, setSendOneSignal] = useState(false);
    const [showEditBox, setShowEditBox] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [PostDate, setPostDate] = useState(null);
    const [PostTime, setPostTime] = useState(null);
    const [PostDatetimeOpen, setPostDatetimeOpen] = useState(false);
    const [ForCollege, setForCollege] = useState(false);
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const [openCategoryIndex, setOpenCategoryIndex] = useState(null);
    const [openCollegeIndex, setOpenCollegeIndex] = useState(null);

    const handleCategoryClick = (index) => {
        setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    };

    const handleSendTelegram = (event) => {
        setSendTelegram(event.target.checked);
    };
    const handlePostDatetimebox = (event) => {
        setPostDatetimeOpen(event.target.checked);
    };
    const CollageSwitch = (event) => {

        if (!event.target.checked) {
            setForCollege(false);
            setCollegeText('Select Post College')
            setCollege(null)
        } else {
            setForCollege(event.target.checked);
            if (College == null) {

                setOpenCollege(true)
                GetCollegeList()

            }
        }


    };
    const handleSendOneSignal = (event) => {
        setSendOneSignal(event.target.checked);
    };


    const handleEditorChange = (content) => {
        setEditorContent(content);
        setPostText(content);
    };
    const HandleAddCatBox = () => {
        if (AddCatBox === true) {

            setAddCatBox(false);
        } else {
            setAddCatBox(true);
        }

    };
    const HandleAddCollegeBox = () => {
        if (AddCollgebox === true) {

            setAddCollgebox(false);
        } else {
            setAddCollgebox(true);
        }

    };

    const [clickedIndex, setClickedIndex] = useState(null);

    const toggleEditBox = (item) => {
        setEditItem(item);
        setShowEditBox(!showEditBox);
    };

    useEffect(() => {
        if (Contextdata.UserLogin == true) {
            setLoading(false)
        }
    }, [router.query, Contextdata.UserLogin]);



    const handleOpenCatBoxCatBox = (scrollType) => () => {

        setOpenCatBox(true);
        setScroll(scrollType);
        GetCatList()
    };
    const handleOpenCollege = (scrollType) => () => {

        setOpenCollege(true);
        setScroll(scrollType);
        GetCollegeList()
    };

    const handleClose = () => {
        setOpenCatBox(false);
        setOpenCollege(false);
    };
    const CatClick = (e) => {
        setCategory(e.slug)

        setCategoryText(e.title)
        setOpenCatBox(false);
    };
    const CollegeClick = (e) => {
        setCollege(e)

        console.log(e)
        setCollegeText(e.title)

        setOpenCollege(false);
        setForCollege(true);
    };

    const descriptionElementRef = React.useRef(null);

    useEffect(() => {

        if (OpenCatBox) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [OpenCatBox]);



    const SubmitPost = async (e) => {
        console.log(uploadedFiles)
        e.preventDefault();

        if (Category == null) {
            Contextdata.ChangeAlertData(`Please Select Post Category`, 'warning');
        }
       
        if (PostText == '') {
            Contextdata.ChangeAlertData(`Can't Publish Empty Post `, 'warning');
        }
        if (Category !== null && PostText !== '') {
            let d = PostDate
            let t = PostTime
            console.log(d)
            console.log(t)
            if (!PostDatetimeOpen) {
                d = null,
                    t = null
            }
            setLoadingSubmitPost(true)
            const sendUM = {
                PostList: uploadedFiles,
                PostText: PostText,
                tags: tags,
                category: Category,
                date: d,
                time: t,
                College:College

            }
            const data = await fetch("/api/user/create_post", {
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
                        if (parsed.ReqData.done) {
                            setPostText('')
                            setUploadedFiles([])
                            setCategory(null)
                            document.getElementById("ConentMedia").value = '';
                            Contextdata.ChangeAlertData(`${parsed.ReqData.msg}`, 'success');



                            if (SendOneSignal === true) {
                                SendOneSignalMsg(parsed.ReqData.postdata)
                            }
                            if (SendTelegram === true) {
                                SendTelegramMsg(parsed.ReqData.postdata)
                            }

                            router.push('/feeds')
                        }

                        if (!parsed.ReqData.done && parsed.ReqData.msg) {
                            Contextdata.ChangeAlertData(`${parsed.ReqData.msg}`, 'warning');
                        }
                        if (parsed.ReqData.error) {
                            Contextdata.ChangeAlertData(`${parsed.ReqData.error}`, 'warning');
                        }
                        setLoadingSubmitPost(false)
                    }, 2000)


                })
        }




    }

    const SendTelegramMsg = async (PD) => {
        const PostUrl = `https://magadhuniversityinfo.com/p/${PD.PostID}`
        const title = PD.MetaTagData.og_description
        const message = PostUrl
        const sendUM = {
            title: title,
            message: message
        }
        const data = await fetch("/api/user/send_to_telegram_channel", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed)
            })
    }
    const SendOneSignalMsg = async (PD) => {
        const imageUrl = `https://api.magadhuniversityinfo.com/content/${PD.MetaTagData.og_image}`
        const buttonUrl = `https://magadhuniversityinfo.com/p/${PD.PostID}`
        const message = PD.MetaTagData.og_description
        const sendUM = {
            imageUrl: imageUrl,
            buttonUrl: buttonUrl,
            message: message,
        }
        const data = await fetch("/api/user/send_onesignal_notification", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed)
            })
    }
    const AddCategory = async () => {
        if (CatTitle_new !== null && CatTitle_new !== '') {
            setLoadingCatadd(true)

            const sendUM = {
                title: CatTitle_new,
                image: 'catimg7.png',

            }
            const data = await fetch("/api/user/add_category", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setLoadingCatadd(false)
                    if (parsed.ReqData.done) {
                        Contextdata.ChangeAlertData(`Category Added`, 'success');

                        GetCatList()
                        setCatTitle_new(null)
                    } else {
                        Contextdata.ChangeAlertData(`Something Went Wrong`, 'warning');
                    }
                })
        }
    }
    const AddCollege = async () => {
        if (CollegeName_new !== null && CollegeName_new !== '' && College_img !== null && College_img !== '') {
            setLoadingCatadd(true)

            const sendUM = {
                title: CollegeName_new,
                image: College_img,

            }
            const data = await fetch("/api/user/add_college", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setLoadingCatadd(false)
                    if (parsed.ReqData.done) {
                        Contextdata.ChangeAlertData(`College Added`, 'success');

                        GetCollegeList()
                        setCollegeName_new(null)
                    } else {
                        Contextdata.ChangeAlertData(`Something Went Wrong`, 'warning');
                    }
                })
        }
    }



    const GetCatList = async () => {
        setLoading(true)

        const sendUM = {}
        const data = await fetch("/api/user/category_list", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData.MainCatList) {
                    setCatlist(parsed.ReqData.MainCatList)
                }
                setLoading(false)
            })
    }
    const GetCollegeList = async () => {
        setLoading(true)

        const sendUM = {}
        const data = await fetch("/api/user/college_list", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqData.CollegeList) {
                    console.log(CollegeList)
                    setCollegeList(parsed.ReqData.CollegeList)
                }
                setLoading(false)
            })
    }
    const DeleteMediaItem = async (DeleteItem, index) => {
        console.log(DeleteItem, index);


        const updatedFiles = uploadedFiles.filter((item, idx) => {

            return !(item.postData === DeleteItem.postData && idx === index);
        });


        setUploadedFiles(updatedFiles);
    };




    const handleFileUpload = (Filedata) => {
        setUploadedFiles([...uploadedFiles, Filedata]);
        console.log([...uploadedFiles, Filedata])
    };
    const onImageUpload = (Filedata) => {
        if (Filedata) {
            console.log(Filedata.postData)
            setCollege_img(Filedata.postData)
        } else {
            setCollege_img(null)
        }


    };


    const DeleteItem = async (e) => {
        let text = "Do you really want to delete This Category ?";
        if (confirm(text) == true) {
            const sendUM = {
                slug: e.slug
            }
            const data = await fetch("/api/user/delete_category", {
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


                        Contextdata.ChangeAlertData(`Category Deleted successfully`, 'success');
                        GetCatList()
                    } else {
                        alert('Something went wrong')
                    }



                })
        }



    };
    const DeleteCollege = async (e) => {
        let text = "Do you really want to delete This College ?";
        if (confirm(text) == true) {
            const sendUM = {
                slug: e.slug
            }
            const data = await fetch("/api/user/delete_college", {
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


                        Contextdata.ChangeAlertData(`College Deleted successfully`, 'success');
                        GetCollegeList()
                    } else {
                        alert('Something went wrong')
                    }



                })
        }



    };

    return (
        <div>

            {Contextdata.UserData && Contextdata.UserData.Role === 1 &&

                <div>
                    <div className={Mstyles.PostBoxVendor}>
                        <div className={Mstyles.PostBoxMainA}>
                            <div className={Mstyles.PostUserbox}>
                                <div className={Mstyles.PostUserboxA}>
                                    {Loading ?
                                        <div>
                                            <Skeleton variant="circular" width={40} height={40} />

                                        </div> : <Avatar
                                            alt={Contextdata.UserData.name}
                                            src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.UserData.dp}`}
                                            sx={{ width: 40, height: 40 }}
                                        />


                                    }


                                </div>
                                <div className={Mstyles.PostUserboxB}>
                                    <div>
                                        {Loading ?
                                            <div>

                                                <Skeleton variant="text" sx={{ fontSize: '1rem', width: 150 }} />
                                            </div> : <span className={Mstyles.Createptitle}>Create A Post</span>
                                        }


                                    </div>
                                    <div>
                                        {Loading ?
                                            <div>

                                                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />
                                            </div> : <small className={Mstyles.CreatepUsername}>post as <span className={Mstyles.primaryColor}> @{Contextdata.UserData.username}</span></small>
                                        }


                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className={Mstyles.PostBoxMainB}>
                            <form onSubmit={SubmitPost}>
                                <div className={Mstyles.PostTextBox}>

                                    <ReactQuill
                                        theme="snow" // You can change the theme as per your preference
                                        value={PostText}
                                        placeholder='write your post here ...'
                                        onChange={handleEditorChange}
                                    />

                                </div>
                                <input type='hidden' id='ConentMedia' />
                            </form>

                        </div>
                        <div className={Mstyles.CatboxPost}>
                            <div className={Mstyles.PostAddonItem} onClick={handleOpenCatBoxCatBox('paper')}>
                                <div className={Mstyles.PostAddonItemA}>
                                    <Image
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${Catimg}`}
                                        alt="image"

                                        placeholder='blur'
                                        width={30}
                                        height={30}
                                        quality={100}
                                        blurDataURL={blurredImageData}

                                    />

                                </div>
                                <div className={Mstyles.PostAddonItemB}>
                                    <span>Category</span>
                                    <small>{CategoryText}</small>

                                </div>

                            </div>
                        </div>
                        <div className={Mstyles.CatboxPost}>
                            <div className={Mstyles.PostAddonItem} >
                                <div className={Mstyles.PostAddonItemA} onClick={handleOpenCollege('paper')}>
                                    <Image
                                        src={`${MediaFilesUrl}${MediaFilesFolder}/${Collegeimg}`}
                                        alt="image"

                                        placeholder='blur'
                                        width={30}
                                        height={30}
                                        quality={100}
                                        blurDataURL={blurredImageData}

                                    />

                                </div>
                                <div className={Mstyles.CoolageTe}>
                                    <div className={Mstyles.PostAddonItemB} onClick={handleOpenCollege('paper')}>
                                        <span>Only College Mode

                                            {ForCollege ? <span style={{ color: 'blue', fontSize: '10px' }}> ON</span> : <span style={{ color: 'red', fontSize: '10px' }}> OFF</span>}
                                        </span>
                                        <small>{CollegeText}</small>

                                    </div>
                                    <Switch
                                        checked={ForCollege}
                                        onChange={CollageSwitch}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className={Mstyles.PostBoxMainC}>

                            <div className={Mstyles.PostFooterbox}>
                                <div className={Mstyles.PostFooterboxA}>
                                    {Loading ?
                                        <div>
                                            <Skeleton variant="text" style={{ height: 60, width: 100 }} />
                                        </div> :
                                        <div>
                                            <UploadFilesPost onFileUpload={handleFileUpload} />
                                            <div className={Mstyles.FileGrid}>
                                                {uploadedFiles.map((item, index) => {
                                                    return (
                                                        <div className={Mstyles.FileGridItem}>
                                                            {item.postType.startsWith('image/') &&
                                                                <div className={Mstyles.FileGridItemimg}>
                                                                    <Image
                                                                        src={`${MediaFilesUrl}${MediaFilesFolder}${item.postData}`}
                                                                        alt=""
                                                                        fill
                                                                        height={'100%'}
                                                                        width={'100%'}
                                                                        blurDataURL={blurredImageData}
                                                                        placeholder='blur'
                                                                        style={{ objectFit: "cover" }}
                                                                    />
                                                                </div>
                                                            }
                                                            {item.postType.startsWith('application/pdf') &&
                                                                <div className={Mstyles.FileGridItemimg}>

                                                                    <Image
                                                                        src={`/img/pdf.png`}
                                                                        alt=""
                                                                        fill
                                                                        height={'100%'}
                                                                        width={'100%'}
                                                                        blurDataURL={blurredImageData}
                                                                        placeholder='blur'
                                                                        style={{ objectFit: "cover" }}
                                                                    />
                                                                </div>
                                                            }
                                                            {item.postType.startsWith('video/') &&
                                                                <div className={Mstyles.FileGridItemimg}>
                                                                    <Image
                                                                        src={`/img/video.png`}
                                                                        alt=""
                                                                        fill
                                                                        height={'100%'}
                                                                        width={'100%'}
                                                                        blurDataURL={blurredImageData}
                                                                        placeholder='blur'
                                                                        style={{ objectFit: "cover" }}
                                                                    />
                                                                </div>
                                                            }

                                                            <div className={Mstyles.FileGridItemOverlay}>
                                                                <IconButton
                                                                    onClick={() => DeleteMediaItem(item, index)}
                                                                    aria-label="toggle password visibility"
                                                                    style={{ width: 40, height: 40, color: 'white' }}
                                                                >
                                                                    <LuX size={20} />
                                                                </IconButton>
                                                            </div>
                                                        </div>


                                                    );
                                                })}
                                            </div>
                                        </div>

                                    }
                                </div>
                                <div className={Mstyles.NotificationItemBox}>
                                    {Loading ?
                                        <div className={Mstyles.NotificationItem}>
                                            <Skeleton variant="text" style={{ height: 60, width: 100 }} />
                                        </div> :
                                        <div>
                                            <div className={Mstyles.NotificationItem}>
                                                <div className={Mstyles.NotificationItemA}>
                                                    <span>App Notification</span>
                                                    <small>Send App Notification using OneSignal to all Users.</small>
                                                </div>
                                                <div className={Mstyles.NotificationItemB}>
                                                    <Switch
                                                        checked={SendOneSignal}
                                                        onChange={handleSendOneSignal}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className={Mstyles.NotificationItem}>
                                                <div className={Mstyles.NotificationItemA}>
                                                    <span>Telegram Channel Notification</span>
                                                    <small>Send Telegram Channel Notification uning bot API.</small>
                                                </div>
                                                <div className={Mstyles.NotificationItemB}>
                                                    <Switch
                                                        checked={SendTelegram}
                                                        onChange={handleSendTelegram}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ height: '20px' }}></div>
                                            <div className={Mstyles.NotificationItem}>
                                                <div className={Mstyles.NotificationItemA}>
                                                    <span>Set Post Date and Time</span>
                                                    <small>Set post Date and time (optional)</small>

                                                    {PostDatetimeOpen &&

                                                        <div className={Mstyles.MidComp}>
                                                            <div className={Mstyles.Datetimebox}>
                                                                <div className={Mstyles.DatetimeboxItem}>
                                                                    <TextField
                                                                        fullWidth
                                                                        value={PostDate}
                                                                        onInput={e => setPostDate(e.target.value)}
                                                                        type="date"
                                                                        size='small'
                                                                    />
                                                                </div>
                                                                <div style={{ height: '15px' }}></div>
                                                                <div className={Mstyles.DatetimeboxItem}>
                                                                    <TextField
                                                                        fullWidth
                                                                        value={PostTime}
                                                                        onInput={e => setPostTime(e.target.value)}
                                                                        type="time"
                                                                        size='small'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className={Mstyles.NotificationItemB}>
                                                    <Switch
                                                        checked={PostDatetimeOpen}
                                                        onChange={handlePostDatetimebox}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    }
                                </div>
                                <div className={Mstyles.PostFooterboxB}>

                                    {Loading ?
                                        <div>
                                            <Skeleton variant="text" style={{ height: 60, width: 100 }} />
                                        </div> :
                                        <LoadingButton
                                            fullWidth
                                            onClick={SubmitPost}
                                            endIcon={<FiChevronRight />}
                                            loading={LoadingSubmitPost}
                                            loadingPosition="end"
                                            variant="outlined"

                                        >
                                            <span>Publish Post</span>
                                        </LoadingButton>

                                    }




                                </div>


                            </div>


                        </div>



                    </div>

                    <React.Fragment>

                        <Dialog
                            fullScreen={isMobile ? true : false}
                            open={OpenCatBox}
                            onClose={handleClose}
                            scroll={scroll}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                        >
                            <DialogTitle id="scroll-dialog-title">Select Post Category</DialogTitle>
                            <DialogContent dividers={scroll === 'paper'}>
                                <div>

                                    <div className={Mstyles.Modalwidth}></div>
                                    <div>

                                        {Loading ?
                                            <div>
                                                <Skeleton variant="text" style={{ height: 20, width: '100%' }} />
                                                <div style={{ height: '5px' }}></div>
                                                <Skeleton variant="text" style={{ height: 20, width: '50%' }} />

                                            </div> :
                                            <div
                                                className={Mstyles.SCatGrid}
                                            >
                                                {Catlist.map((item, index) => {
                                                    return <div >
                                                        <div className={Mstyles.HomeCatGridItem}  >
                                                            <div className={Mstyles.HomeCatGridItemTitle} onClick={() => CatClick(item)} >
                                                                <span>{item.title}</span>

                                                            </div>

                                                            <div className={Mstyles.EditDeleteBox}>
                                                                <div className={Mstyles.EditDeleteItem}>
                                                                    <div className={Mstyles.EditDeleteItemA} >
                                                                        <div className={Mstyles.EditDeleteItemA} >

                                                                            <IconButton
                                                                                onClick={() => handleCategoryClick(index)}
                                                                                aria-label="toggle password visibility"
                                                                                style={{ width: 35, height: 35, color: 'black' }}
                                                                            >
                                                                                {openCategoryIndex === index ? <LuX size={30} /> : <LuPencilLine size={40} />}
                                                                            </IconButton>

                                                                        </div>
                                                                        <div className={Mstyles.EditDeleteItemB}>
                                                                            <IconButton
                                                                                onClick={() => DeleteItem(item)}
                                                                                aria-label="toggle password visibility"
                                                                                style={{ width: 35, height: 35, color: 'black' }}
                                                                            >
                                                                                <LuTrash2 size={40} />
                                                                            </IconButton>
                                                                        </div>

                                                                    </div>

                                                                    <div className={Mstyles.EditDeleteItemB}>

                                                                        <LoadingButton
                                                                            fullWidth
                                                                            size='small'
                                                                            endIcon={<FiChevronRight />}
                                                                            loading={false}
                                                                            loadingPosition="end"
                                                                            variant="outlined"
                                                                            onClick={() => CatClick(item)}

                                                                        >
                                                                            <span>Select</span>
                                                                        </LoadingButton>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <EditCategoryForm
                                                                isOpen={openCategoryIndex === index}
                                                                item={item}

                                                                GetCatList={GetCatList}
                                                                handleClose={() => setOpenCategoryIndex(null)}
                                                            />
                                                        </div>

                                                    </div>

                                                }

                                                )}
                                            </div>

                                        }



                                    </div>

                                    {!Loading &&

                                        <div className={Mstyles.AddCatBoxMain}>
                                            <LoadingButton
                                                fullWidth
                                                onClick={HandleAddCatBox}
                                                startIcon={AddCatBox ? <LuX /> : <LuPlus />}
                                                loading={LoadingSubmitPost}
                                                loadingPosition="end"
                                                variant="text"

                                            >
                                                <span>{AddCatBox ? 'Close' : 'Add New'}</span>
                                            </LoadingButton>

                                            {AddCatBox &&
                                                <div className={Mstyles.AddCatBox}>
                                                    <form onSubmit={AddCategory} className={Mstyles.fadeinAnimation}>

                                                        <div className={Mstyles.LoginBox_input}>
                                                            <TextField
                                                                required
                                                                label="Category Title"
                                                                fullWidth
                                                                value={CatTitle_new}
                                                                onInput={e => setCatTitle_new(e.target.value)}

                                                            />
                                                        </div>
                                                        <div style={{ height: '20px' }}></div>
                                                        <div className={Mstyles.Loginbtnbox}>
                                                            <LoadingButton

                                                                size='small'
                                                                onClick={AddCategory}
                                                                endIcon={<FiChevronRight />}
                                                                loading={LoadingCatadd}
                                                                desabled={LoadingCatadd}
                                                                loadingPosition="end"
                                                                variant='contained'
                                                            >
                                                                <span>Save Category</span>
                                                            </LoadingButton>


                                                        </div>

                                                    </form>

                                                </div>
                                            }

                                        </div>

                                    }



                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>

                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                    <React.Fragment>

                        <Dialog
                            fullScreen={isMobile ? true : false}
                            open={OpenCollege}
                            onClose={handleClose}
                            scroll={scroll}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                        >
                            <DialogTitle id="scroll-dialog-title">Select Post Collage</DialogTitle>
                            <DialogContent dividers={scroll === 'paper'}>
                                <div>

                                    <div className={Mstyles.Modalwidth}></div>
                                    <div>

                                        {Loading ?
                                            <div>
                                                <Skeleton variant="text" style={{ height: 20, width: '100%' }} />
                                                <div style={{ height: '5px' }}></div>
                                                <Skeleton variant="text" style={{ height: 20, width: '50%' }} />

                                            </div> :
                                            <div
                                                className={Mstyles.SCatGrid}
                                            >
                                                {CollegeList.map((item, index) => {
                                                    return <div >
                                                        <div className={Mstyles.HomeCatGridItem}  >
                                                            <div className={Mstyles.CoolegitemA} onClick={() => CatClick(item)} >

                                                                <div className={Mstyles.Collageimg}>
                                                                    <Image
                                                                        src={`${MediaFilesUrl}${MediaFilesFolder}${item.image}`}
                                                                        alt=""
                                                                        fill
                                                                        height={'100%'}
                                                                        width={'100%'}
                                                                        blurDataURL={blurredImageData}
                                                                        placeholder='blur'
                                                                        style={{ objectFit: "cover", borderRadius: '10px' }}
                                                                    />
                                                                </div>
                                                                <div className={Mstyles.CollageText}>
                                                                    <span>{item.title}</span>
                                                                </div>


                                                            </div>

                                                            <div className={Mstyles.EditDeleteBox}>
                                                                <div className={Mstyles.EditDeleteItem}>
                                                                    <div className={Mstyles.EditDeleteItemA} >
                                                                        <div className={Mstyles.EditDeleteItemA} >

                                                                            <IconButton
                                                                                onClick={() => handleCategoryClick(index)}
                                                                                aria-label="toggle password visibility"
                                                                                style={{ width: 35, height: 35, color: 'black' }}
                                                                            >
                                                                                {openCategoryIndex === index ? <LuX size={30} /> : <LuPencilLine size={40} />}
                                                                            </IconButton>

                                                                        </div>
                                                                        <div className={Mstyles.EditDeleteItemB}>
                                                                            <IconButton
                                                                                onClick={() => DeleteCollege(item)}
                                                                                aria-label="toggle password visibility"
                                                                                style={{ width: 35, height: 35, color: 'black' }}
                                                                            >
                                                                                <LuTrash2 size={40} />
                                                                            </IconButton>
                                                                        </div>

                                                                    </div>

                                                                    <div className={Mstyles.EditDeleteItemB}>

                                                                        <LoadingButton
                                                                            fullWidth
                                                                            size='small'
                                                                            endIcon={<FiChevronRight />}
                                                                            loading={false}
                                                                            loadingPosition="end"
                                                                            variant="outlined"
                                                                            onClick={() => CollegeClick(item)}

                                                                        >
                                                                            <span>Select</span>
                                                                        </LoadingButton>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <EditCollegeForm
                                                                isOpen={openCategoryIndex === index}
                                                                item={item}

                                                                GetCollegeList={GetCollegeList}
                                                                handleClose={() => setOpenCollegeIndex(null)}
                                                            />
                                                        </div>

                                                    </div>

                                                }

                                                )}
                                            </div>

                                        }



                                    </div>

                                    {!Loading &&

                                        <div className={Mstyles.AddCatBoxMain}>
                                            <LoadingButton
                                                fullWidth
                                                onClick={HandleAddCollegeBox}
                                                startIcon={AddCollgebox ? <LuX /> : <LuPlus />}
                                                loading={LoadingSubmitPost}
                                                loadingPosition="end"
                                                variant="text"

                                            >
                                                <span>{AddCollgebox ? 'Close' : 'Add New'}</span>
                                            </LoadingButton>

                                            {AddCollgebox &&
                                                <div className={Mstyles.AddCatBox}>
                                                    <form onSubmit={AddCollege} className={Mstyles.fadeinAnimation}>

                                                        <div className={Mstyles.LoginBox_input}>
                                                            <TextField
                                                                required
                                                                label="College Name"
                                                                fullWidth
                                                                value={CollegeName_new}
                                                                onInput={e => setCollegeName_new(e.target.value)}

                                                            />
                                                        </div>
                                                        <div style={{ height: '20px' }}></div>
                                                        <div className={Mstyles.LoginBox_input}>
                                                            <Uploadimg onImageUpload={onImageUpload} />
                                                        </div>
                                                        <div style={{ height: '20px' }}></div>
                                                        <div className={Mstyles.Loginbtnbox}>
                                                            <LoadingButton

                                                                size='small'
                                                                onClick={AddCollege}
                                                                endIcon={<FiChevronRight />}
                                                                loading={LoadingCatadd}
                                                                desabled={LoadingCatadd}
                                                                loadingPosition="end"
                                                                variant='contained'
                                                            >
                                                                <span>Save College</span>
                                                            </LoadingButton>


                                                        </div>

                                                    </form>

                                                </div>
                                            }

                                        </div>

                                    }



                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>

                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </div>

            }


        </div>
    )
}

export default PostBox
