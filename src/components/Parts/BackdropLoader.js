import { useState, useEffect, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Mstyles from '/styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'
export default function SimpleBackdrop() {
    const router = useRouter()
    const [open, setOpen] = useState(true);
    const Contextdata = useContext(CheckloginContext)

    return (
        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={Contextdata.MainLoader}
              
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
