import React, { useState, useEffect, useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { RiVerifiedBadgeFill } from "react-icons/ri";

import { MediaFilesUrl, FeedimgFolder, MediaFilesFolder } from '/Data/config'
import Mstyles from '/Styles/mainstyle.module.css'
const VerifiedBadge = ({ VData }) => {
    const [IsVerified, setIsVerified] = useState(false);
    useEffect(() => {
        CheckData()
    }, []);

    const CheckData = async () => {
        const sendUM = {
            username: VData.username

        }
        const data = await fetch("/api/Vendor/CheckVerified", {
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
                    setIsVerified(true)
                }else{
                    setIsVerified(false)
                }

            })
    }
    return (
        <div>
            {IsVerified &&
                <Tooltip title="Accounts with a verified badge have been authenticated and can be FME Verified subscribers or notable persons or brands.">
                    <IconButton>
                        <RiVerifiedBadgeFill size={15} className={Mstyles.NameboxBIcon} />
                    </IconButton>
                </Tooltip>

            }

        </div>
    )
}

export default VerifiedBadge
