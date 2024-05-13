
import React, { useState, useEffect, useContext } from 'react';

import IconButton from '@mui/material/IconButton';
import { LuFlag, LuShare2, LuStar, LuEye } from "react-icons/lu";
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';

import Mstyles from '/styles/mainstyle.module.css';
import DialogContent from '@mui/material/DialogContent';

import CheckloginContext from '/context/auth/CheckloginContext'
import Badge from '@mui/material/Badge';

import {

    styled
} from '@mui/material';
import { ShareSocial } from 'react-share-social'
const Sharebtn = ({ ShareFeed }) => {
    const Contextdata = useContext(CheckloginContext)
    const [ShowShare, setShowShare] = useState(false);
    const [Shareurl, setShareurl] = useState('');
    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

   

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };


    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (OpenEdit) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [OpenEdit]);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));


    const style = {
        root: {
            background: 'transparent',


        },


    };


    const handleOpenEdit = () => () => {
        setOpenEdit(true);

    };

    const handleShareClick = async () => {
        if (Contextdata.AppMode === true) {
            window.open(`https://sharepost.com/?url=${ShareFeed.url}`, '_blank');
        }
        try {
            await navigator.share({
                title: ShareFeed.title,
                text: ShareFeed.text,
                url: `${ShareFeed.url}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }

    };

    return (
        <div>





            <div className={Mstyles.FeedBtnitem} >
                <div className={Mstyles.FeedBtnitemA}>

                    <LoadingButton
                        fullWidth
                        size='small'
                        onClick={handleShareClick}
                        startIcon={<LuShare2 />}
                        loading={false}
                        loadingPosition="end"
                        variant='text'
                    >
                        <span>Share</span>
                    </LoadingButton>
                </div>

            </div>

            <Dialog
                open={OpenEdit}
                onClose={handleCloseEdit}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >

                <DialogContent dividers={scroll === 'paper'}>
                    <div className={Mstyles.ShareBoxHeader}>
                        <div className={Mstyles.ShareBoxHeaderA}>
                            <h3>Share Post</h3>
                        </div>
                        <div className={Mstyles.ShareBoxHeaderB}>
                            <IconButton aria-label="cart" onClick={handleCloseEdit}>
                                <StyledBadge color="secondary" >
                                    <LuShare2 />
                                </StyledBadge>
                            </IconButton>
                        </div>
                    </div>
                    <ShareSocial
                        style={style}
                        url={Shareurl}
                        socialTypes={['whatsapp', 'facebook', 'twitter', 'telegram']}
                    />

                </DialogContent>

            </Dialog>


        </div>
    )
}

export default Sharebtn
