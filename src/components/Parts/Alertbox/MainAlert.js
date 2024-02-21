
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import CheckloginContext from '/context/auth/CheckloginContext'
import Snackbar from '@mui/material/Snackbar';

import Slide from '@mui/material/Slide';
import { useRouter, useParams } from 'next/router'
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
const MainAlert = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [state, setState] = useState();


    const OpenAlert = () => () => {

    };
    useEffect(() => {
        setState({
            open: Contextdata.AlertData.AlertStatus,
            vertical: 'top',
            horizontal: 'center',
            Transition: Slide,
            AlertMsg: Contextdata.AlertData.TextMsg,
            severity: Contextdata.AlertData.severity
        })
    }, [Contextdata.AlertData]);


    const handleCloseAlert = () => {
        setState({
            ...state,
            open: false,
        });
    };


    return (
        <div>
            {Contextdata.AlertData.AlertStatus == true && 
            <Snackbar
                open={state.open}
                autoHideDuration={5000}
                TransitionComponent={state.Transition}
                key={state.Transition.name}
                onClose={handleCloseAlert}
            >
                <Alert
                    sx={{ width: '100%' }}
                    severity={state.severity}
                   
                >
                    {state.AlertMsg}
                </Alert>
            </Snackbar>
}
        </div>
    )
}

export default MainAlert
