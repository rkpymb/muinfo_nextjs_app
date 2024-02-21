import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'
import { FiShare2, FiXCircle } from "react-icons/fi";
import React, { useState, useEffect, useContext } from 'react';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { LuFlag, LuShare2, LuStar, LuEye } from "react-icons/lu";
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Mstyles from '/Styles/mainstyle.module.css';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {
    Typography,
    Box,
    Card,
    Container,

    styled
} from '@mui/material';

import { ShareSocial } from 'react-share-social'
const Sharebtn = ({ ContentUrl }) => {
    const [ShowShare, setShowShare] = useState(false);
    const [Shareurl, setShareurl] = useState('');
    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    useEffect(() => {
        setShareurl(ContentUrl)
    }, []);


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


    return (
        <div>


            {/* <ListItemIcon onClick={handleOpenEdit('paper')}>
                <LuShare2 />
            </ListItemIcon>
            Share */}

            <div className={Mstyles.FeedBtnitem} onClick={handleOpenEdit('paper')}>
                
                <div className={Mstyles.FeedBtnitemA}>
                    <FiShare2 size={20} />
                </div>
                <div className={Mstyles.FeedBtnitemB}>
                    Share
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
                                    <FiXCircle />
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
