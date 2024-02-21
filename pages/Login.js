import React, { useState, useEffect, useContext } from 'react';
import {
    Typography,
    Box,
    Card,
    Container,
    Button,
    styled
} from '@mui/material';
import Image from 'next/image';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import InputAdornment from '@mui/material/InputAdornment';
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'

import Head from 'next/head';
import Lottie from 'react-lottie'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import LoginVideo from '/src/components/Parts/VideoPlayer/LoginVideo'


import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import * as animationData from '/Data/Lottie/loginone.json'
import * as animationData2 from '/Data/Lottie/AnimationOtp.json'
import * as animationData3 from '/Data/Lottie/AnimationOtp.json'
import CryptoJS from "crypto-js";


import { AppDesc, AppName } from '/Data/config'
import { useRouter, useParams } from 'next/router'






function Overview() {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Loading, setLoading] = React.useState(true);
    const [usermobile, setMob] = useState('');
    const [sot, setSot] = useState('');
    const [isalert, setIsalert] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [LoadingSignupbtn, setLoadingSignupbtn] = React.useState(false);
    const [IsReadonly, setIsReadonly] = useState(false);
    const [mobilebox, setMobilebox] = useState(true);
    const [Otpbox, setOtpbox] = useState(false);
    const [UserType, setUserType] = useState('');

    const [Password, setPassword] = useState('');

    const [PasswordShowtype, setPasswordShowtype] = useState('password');

    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
    const handleClickShowPassword = async () => {
        if (showPassword == true) {
            setShowPassword(false)
            setPasswordShowtype('text')
        } else {
            setPasswordShowtype('password')
            setShowPassword(true)
        }

    }


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const defaultOptions3 = {
        loop: false,
        autoplay: true,
        animationData: animationData3,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const handleChangePassword = () => {
        setIsalert(false);
        const PasswordA = document.querySelector('#Password').value
        setPassword(PasswordA)

    }

    const handleChangeMob = () => {
        setIsalert(false);
        const mobA = document.querySelector('#userm').value
        if (mobA.length <= 10) {
            setMob(mobA)
        }

    }
    // On submit mobile
    const CheckLogin = async (e) => {
        e.preventDefault();
        if (usermobile.length == 10) {
            setLoadingSignupbtn(true)
            const sendUM = { mobile: usermobile, PassKey: Password }
            const data = await fetch("/api/User/Auth/UserLogin", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsedFinal) => {

                    if (parsedFinal.ReqD.LoginStatus == true) {
                        localStorage.setItem('UserToken', parsedFinal.ReqD.token)

                        setTimeout(function () {
                            router.push('/');

                        }, 2000);

                    }

                    if (parsedFinal.ReqD.Notregistered == true) {

                        Contextdata.ChangeAlertData('Register your account 😊 ', 'warning')
                        setTimeout(function () {
                            router.push(`/Register?mobile=${usermobile}`);
                        }, 1000);

                    }
                    if (parsedFinal.ReqD.InvalidCredentials == true) {
                        setLoadingSignupbtn(false)

                        Contextdata.ChangeAlertData('Invalid Credentials 😒 ', 'warning')

                    }
                    if (parsedFinal.ReqD.error == true) {
                        setLoadingSignupbtn(false)

                        Contextdata.ChangeAlertData('😣 Something went wrong ', 'warning')

                    }


                })

        } else {

            setIsalert(true);
            Contextdata.ChangeAlertData('😣 Invalid Mobile Number or Password', 'warning')


        }


    }

    const handleChangeOTP = () => {
        setIsalert(false);
        const otpin = document.querySelector('#otpinput').value
        if (otpin.length <= 6) {
            setSot(otpin)
        }
    }

    const verifyOTPBTN = async (e) => {
        e.preventDefault();
        if (sot !== '') {
            setLoading(true)
            const sendUM = { usermobile: usermobile, EnterText: sot }
            const data = await fetch("/api/V2/auth/CheckMobileOTP", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();


            })
                .then((parsedFinal) => {
                    if (parsedFinal.ReqD.Ls == true) {
                        localStorage.setItem('UserToken', parsedFinal.ReqD.token)
                        Contextdata.ChangeAlertData('Login Successful 😍', 'success')
                        setTimeout(function () {
                            router.back();
                        }, 2000);

                    } else {
                        setLoading(false)
                        Contextdata.ChangeAlertData('Invalid OTP 😒', 'warning')

                    }

                })


        } else {

            Contextdata.ChangeAlertData(`Please Enter OTP 🤦‍♀️`, 'warning')

        }
    }



    const ShowMobile = async () => {
        setOtpbox(false)
        setMobilebox(true)
    }

    useEffect(() => {
        if (localStorage.getItem('UserToken')) {
            router.push('/')
        } else {
            Contextdata.ChangeMainLoader(false)
            setLoading(false)
        }
    });
    return (
        <>
            <Head>
                <title>Flair My Event : Login</title>
            </Head>
            {!Loading &&
                <div>
                    <div className={Mstyles.LoginFull}>
                        <div className={Mstyles.LoginBoxVendorCover}>
                            <div className={Mstyles.OnlyDesktop}>
                                <div style={{ height: '70px' }}></div>
                            </div>
                            <div className={Mstyles.LoginBoxVendor}>
                                <div className={Mstyles.LoginBoxVendorA}>

                                    <LoginVideo />
                                </div>
                                <div className={Mstyles.LoginBoxVendorB}>

                                    {mobilebox && (
                                        <div className={Mstyles.LoginBoxItem}>
                                            <div className={Mstyles.logomainBox}>

                                                <div style={{ height: '10px' }}> </div>
                                                <div className={Mstyles.LogoVendorLogin}>
                                                    <img src='/logo/fmelogodark.svg' alt='logo' />
                                                </div>
                                                <div><h2>Login to your Account </h2>
                                                    <div style={{ height: '10px' }}> </div>
                                                    <small>Enter your Registerd Mobile Number and password to login into your Account !</small>
                                                </div>
                                                <div style={{ height: '20px' }}> </div>
                                                <form onSubmit={CheckLogin}>
                                                    <div className={Mstyles.LoginBox_input}>
                                                        <TextField fullWidth label="Enter Mobile Number" id="userm" type="number" onChange={handleChangeMob} value={usermobile} />
                                                    </div>
                                                    <div style={{ height: '20px' }}> </div>
                                                    <div className={Mstyles.LoginBox_input}>
                                                        <TextField fullWidth label="Enter Password" id="Password" type={`${PasswordShowtype}`} onChange={handleChangePassword} value={Password}
                                                            InputProps={{ // <-- This is where the toggle button is added.
                                                                readOnly: IsReadonly,
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}

                                                                        >
                                                                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}

                                                        />
                                                    </div>
                                                </form>

                                                <div style={{ height: '20px' }}> </div>
                                                {isalert && (
                                                    <Stack sx={{ width: '100%' }} spacing={2}>

                                                        <Alert severity="warning">Please enter correct Mobile Number</Alert>

                                                    </Stack>
                                                )}
                                                <div className={Mstyles.Loginbtnbox}>
                                                    <LoadingButton
                                                        fullWidth
                                                        onClick={CheckLogin}
                                                        endIcon={<FiChevronRight />}
                                                        loading={LoadingSignupbtn}
                                                        loadingPosition="end"
                                                        className={Mstyles.MainBtnActive}
                                                    >
                                                        <span>Proceed to Login</span>
                                                    </LoadingButton>
                                                    <div style={{ height: '15px' }}> </div>

                                                    <small>By signing up, you agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>

                                                </div>





                                            </div>

                                        </div>
                                    )}


                                    {/* Otp box */}
                                    {Otpbox && (
                                        <div className={Mstyles.LoginBoxItem}>
                                            <div className={Mstyles.LoginBoxItemLottie}>
                                                <Lottie options={defaultOptions2}
                                                    height={null}
                                                    width={'100%'}

                                                    isStopped={false}
                                                    isPaused={false} />
                                            </div>
                                            <div className={Mstyles.logomainBox}>

                                                <div style={{ height: '10px' }}> </div>

                                                <div><h3>Enter OTP </h3>
                                                    <span>OTP Succesfully Sent on +91{usermobile}</span> <span style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }} onClick={ShowMobile}><FiEdit /></span>
                                                </div>
                                                <form onSubmit={verifyOTPBTN}>
                                                    <div className={Mstyles.LoginBox_input}>
                                                        <TextField fullWidth label="Enter OTP" id="otpinput" type="number" onChange={handleChangeOTP} autoFocus />
                                                    </div>
                                                </form>

                                                <div style={{ height: '20px' }}> </div>
                                                {isalert && (
                                                    <Stack sx={{ width: '100%' }} spacing={2}>

                                                        <Alert severity="warning">Invalid OTP</Alert>

                                                    </Stack>
                                                )}
                                                <div style={{ height: '20px' }}> </div>

                                                <LoadingButton
                                                    fullWidth
                                                    onClick={verifyOTPBTN}
                                                    endIcon={<FiChevronRight />}
                                                    loading={LoadingSignupbtn}
                                                    loadingPosition="end"
                                                    className={Mstyles.MainBtnActive}
                                                >
                                                    <span>Verify OTP</span>
                                                </LoadingButton>

                                                <div style={{ height: '10px' }}> </div>

                                            </div>
                                        </div>
                                    )}



                                </div>



                            </div>
                        </div>
                    </div>
                    <div className={Mstyles.OnlyDesktop}>
                        <div style={{ minHeight: '50px' }}></div>
                    </div>
                </div>

            }





        </>
    );
}

export default Overview;

