
import React, { useState, useEffect, useContext } from 'react';

import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/styles/mainstyle.module.css'
import Skeleton from '@mui/material/Skeleton';
import { useRouter, useParams } from 'next/router'

import { ShortAbout, AppName, SocialHandles, MediaFilesFolder, MediaFilesUrl } from '/Data/config'
import { Router } from 'next/router';
import { FiMessageCircle, FiChevronRight } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';

import Avatar from '@mui/material/Avatar';
import EditComment from './EditComment';

import Badge from '@mui/material/Badge';

import {

    styled
} from '@mui/material';

const PostBoxUser = ({ PostData }) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)

    const [OpenModal, setOpenModal] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [Cmtlist, setCmtlist] = useState([]);
    const [CmtText, setCmtText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [LoadingSubmitBtn, setLoadingSubmitBtn] = useState(false);




    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }

    ]



    const handleClickOpen = (scrollType) => () => {
        if (Contextdata.UserLogin) {

            GetCmtlistData()
            setOpenModal(true);
            setScroll(scrollType);
        } else {
            router.push('/account/user_login')
        }


    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const descriptionElementRef = React.useRef(null);

    useEffect(() => {

        if (Contextdata.UserLogin) {
            GetCmtlistData()
        }
    }, [router.query, Contextdata.UserData]);


    const GetCmtlistData = async () => {

        setIsLoading(true)

        const sendUM = {
            JwtToken: Contextdata.UserJwtToken,
            PostData: PostData
        }
        const data = await fetch("/api/user/post_cmt", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {

                setCmtlist(parsed.ReqData.CmtAllList)

                setTimeout(function () {
                    setIsLoading(false)

                }, 2000);
            })
    }



    const SubmitPost = async (e) => {
        e.preventDefault();

        if (CmtText !== '') {
            setLoadingSubmitBtn(true)
            const sendUM = {

                CmtText: CmtText,
                PostData: PostData,

            }
            const data = await fetch("/api/user/add_post_cmt", {
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
                        setLoadingSubmitBtn(false)
                    }, 2000);
                    if (parsed.ReqData.done) {
                        GetCmtlistData()
                        setCmtText('')
                        Contextdata.ChangeAlertData('Comment Added 😍', 'success')

                    } else {
                        Contextdata.ChangeAlertData('Something Went Wrong 😣', 'warning')


                    }


                })

        } else {
            Contextdata.ChangeAlertData(`Can't post Empty Comment 😣`, 'warning')
        }



    }

    const handleTextareaChange = (e) => {
        setCmtText(e.target.value);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

    const ClickEdit = (index) => {

        setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    };


    const updateComment = (updatedComment) => {

        // Find the index of the comment to be updated
        const index = Cmtlist.findIndex(comment => comment.CmtData._id == updatedComment._id);

        if (index !== -1) {

            // If the comment is found, update it in the comment list
            setCmtlist(prevCmtlist => {
                const newCmtlist = [...prevCmtlist];
                newCmtlist[index] = {
                    ...newCmtlist[index],
                    CmtData: {
                        ...newCmtlist[index].CmtData,
                        Text: updatedComment.CmtData.Text // Update the Text property
                    }
                };


                return newCmtlist;
            });
        } else {
            console.log('Unable to update item');
        }
    };



    const DeleteItem = async (deletedComment) => {
        const _id = deletedComment.CmtData._id;
        let text = "Do you really want to delete This Comment ?";
        if (confirm(text) == true) {
            const sendUM = {
                _id: _id
            };
            const data = await fetch("/api/user/delete_cmt", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            }).then((parsed) => {
                if (parsed.ReqData.done) {
                    // Remove the deleted comment from the Cmtlist array
                    setCmtlist(prevCmtlist => prevCmtlist.filter(item => item.CmtData._id !== _id));
                    Contextdata.ChangeAlertData(`Comment Deleted`, 'success');
                } else {
                    alert('Something went wrong');
                }
            });
        }
    };




    return (
        <div className={Mstyles.Cmtmainbox}>
            {Contextdata.UserLogin ?

                <div>
                    <div>
                        <div className={Mstyles.PostBoxUserHeader}>
                            <span>Add Your <span className={Mstyles.RedColor}>Comment</span></span>
                            <small>Your Comment Will be Visible in Public</small>

                        </div>
                        <div className={Mstyles.PostBoxUserInput}>
                            <textarea
                                placeholder="Write your comment here..."
                                value={CmtText}
                                autoFocus
                                onChange={handleTextareaChange}
                            />
                        </div>

                        <div style={{ marginTop: 20 }}></div>

                        <div className={Mstyles.PostBoxFotter}>
                            <LoadingButton
                                fullWidth
                                onClick={SubmitPost}
                                endIcon={<FiChevronRight />}
                                loading={LoadingSubmitBtn}
                                loadingPosition="end"
                                className={Mstyles.MainBtn}
                                variant='outlined'
                            >
                                <span>Post Comment</span>
                            </LoadingButton>


                            <div style={{ marginTop: 10 }}></div>


                            <small style={{ fontSize: '10px' }}>You agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>
                            <div style={{ marginTop: 20 }}></div>
                        </div>


                    </div>


                    <div>
                        {isLoading ? <div>
                            {Dummydta.map((item, index) => {
                                return <div key={index} style={{ marginBottom: '20px' }}>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
                                    <div style={{ height: '5px' }}></div>
                                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '50%' }} />
                                </div>

                            }

                            )}
                        </div> :
                            <div>
                                {Cmtlist.map((item, index) => {
                                    return <div className={Mstyles.CmtlistItem} key={index} >
                                        <div className={Mstyles.CmtlistItemA}>
                                            <Avatar
                                                alt={item.UserData.name}
                                                src={`${MediaFilesUrl}${MediaFilesFolder}/${item.UserData.dp}`}
                                                sx={{ width: 30, height: 30 }}
                                            />
                                        </div>
                                        <div className={Mstyles.CmtlistItemB}>
                                            <div className={Mstyles.CmttextboxUser}>
                                                <span>{item.UserData.name}</span>
                                                <div className={Mstyles.linedevider}>|</div>
                                                <small>{item.formattedDate}</small>
                                            </div>

                                            <div className={Mstyles.Cmttextbox}>
                                                <span>{item.CmtData.Text || item.CmtData.CmtData.Text}</span>
                                            </div>
                                            {Contextdata.UserLogin &&
                                                <div>
                                                    {Contextdata.UserData.Role === 1 &&
                                                        <div className={Mstyles.CmtEditDeletebox}>
                                                            {Contextdata.UserData.mobile == item.CmtData.UserData.mobile &&

                                                                <div className={Mstyles.CmtEditDeleteitem} onClick={() => ClickEdit(index)}>
                                                                    <span>Edit</span>
                                                                </div>

                                                            }
                                                            <div className={Mstyles.CmtEditDeleteitem} onClick={() => DeleteItem(item)}>
                                                                <span>Delete</span>
                                                            </div>
                                                        </div>
                                                    }
                                                    {Contextdata.UserData.Role === 2 && Contextdata.UserData.mobile == item.CmtData.UserData.mobile &&
                                                        <div className={Mstyles.CmtEditDeletebox}>
                                                            <div className={Mstyles.CmtEditDeleteitem} onClick={() => ClickEdit(index)}>
                                                                <span>Edit</span>

                                                            </div>
                                                            <div className={Mstyles.CmtEditDeleteitem} onClick={() => DeleteItem(item)}>
                                                                <span>Delete</span>
                                                            </div>
                                                        </div>
                                                    }

                                                    <div>
                                                        <EditComment
                                                            isOpen={openCategoryIndex === index}
                                                            item={item}
                                                            handleClose={() => setOpenCategoryIndex(null)}
                                                            updateComment={updateComment}
                                                        />
                                                    </div>
                                                </div>
                                            }



                                        </div>



                                    </div>

                                }

                                )}
                            </div>

                        }

                    </div>
                </div> : <div>
                    <div>


                        <div className={Mstyles.PostBoxFotter}>
                            <LoadingButton
                                fullWidth
                                onClick={() => router.push('/account/user_login')}
                                endIcon={<FiChevronRight />}
                                loading={false}
                                loadingPosition="end"
                                className={Mstyles.MainBtn}
                                variant='outlined'
                            >
                                <span>Login to View Comments</span>
                            </LoadingButton>


                        </div>


                    </div>

                </div>


            }

        </div>
    )
}

export default PostBoxUser
