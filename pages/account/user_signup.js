import React, { useState, useEffect, useContext } from 'react';

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import InputAdornment from '@mui/material/InputAdornment';
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/styles/customstyle.module.css'

import Head from 'next/head';
import Lottie from 'react-lottie'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Image from 'next/image';

import * as animationData from '/Data/Lottie/loginone.json'

import { useRouter, useParams } from 'next/router'

function Overview() {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [Loading, setLoading] = React.useState(true);
    const [mobile, setMobile] = useState(null);
    const [name, setName] = useState(null);
    const [referralCode, setReferralCode] = useState(null);
    const [email, setEmail] = useState(null);
    const [otp, setOtp] = useState(null);
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [LoadingSignupbtn, setLoadingSignupbtn] = useState(false);

    const [mobilebox, setMobilebox] = useState(true);
    const [OtpBox, setOtpBox] = useState(false);



    const [PasswordShowtype, setPasswordShowtype] = useState('password');


    const handleClickShowPassword = async () => {
        if (showPassword == true) {
            setShowPassword(false)
            setPasswordShowtype('text')
        } else {
            setPasswordShowtype('password')
            setShowPassword(true)
        }

    }




    // On submit mobile
    const CreateAccount = async (e) => {
        e.preventDefault();
        if (mobile !== null && name !== null && email !== null && password !== null) {
            setLoadingSignupbtn(true)
            const sendUM = {
                mobile,
                name,
                email,
                password,
                referralCode
            }
            const data = await fetch("/api/user/user_signup", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsedFinal) => {

                    setTimeout(function () {
                        setLoadingSignupbtn(false);

                        if (parsedFinal.ReqData.done) {

                            setMobilebox(false)
                            setOtpBox(true)
                        }

                        if (parsedFinal.ReqData.msg) {

                            Contextdata.ChangeAlertData(`${parsedFinal.ReqData.msg}`, 'warning')


                        }
                    }, 2000);


                })



        } else {
            setLoadingSignupbtn(false)
            Contextdata.ChangeAlertData('😣 All Fields are required', 'warning')
        }

    }
    const VerifyOTP = async (e) => {
        e.preventDefault();
        if (mobile !== null && otp !== null) {
            setLoadingSignupbtn(true)
            const sendUM = {
                mobile,
                otp,

            }
            const data = await fetch("/api/user/verify_otp", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsedFinal) => {


                    setTimeout(function () {

                        if (parsedFinal.ReqData.LoginStatus == true) {
                            const newToken = parsedFinal.ReqData.token
                            document.cookie = `jwt_token=${newToken}; expires=${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
                            Contextdata.ChangeAlertData(`${parsedFinal.ReqData.msg}`, 'success');
                            router.push('/feeds')

                          
                        } else {
                            setLoadingSignupbtn(false);

                            Contextdata.ChangeAlertData(`${parsedFinal.ReqData.msg}`, 'warning')
                        }
                    }, 2000);

                })



        } else {
            setLoadingSignupbtn(false)
            Contextdata.ChangeAlertData('😣 All Fields are required', 'warning')
        }

    }


    useEffect(() => {
        Contextdata.ChangeMainLoader(false)
    });
    return (
        <>
            <Head>
                <title>Sign up</title>
            </Head>
            <div className={Mstyles.loginboxmain}>
                <div className={Mstyles.loginbox}>
                    <div className={Mstyles.loginboxA}>

                        <div className={Mstyles.loginboxAimg}>
                            <Image
                                src={`/img/signup_girl.jpg`}
                                alt="image"
                                placeholder="blur"
                                blurDataURL={blurredImageData}
                                layout='responsive'
                                quality={60}
                                loading="lazy"
                                width={0}
                                height={0}
                                style={{ objectFit: "center", borderRadius: "15px" }}
                            />



                        </div>
                    </div>
                    <div className={Mstyles.loginboxB}>
                        {mobilebox && (

                            <div className={Mstyles.Authbox}>
                                <div className={Mstyles.LoginLogo}>
                                    <img src='/logo/muinfologo.png' width={'100%'} alt='logo' />
                                </div>
                                <div style={{ height: '10px' }}> </div>
                                <div className={Mstyles.Lheader}>
                                    <span>Create Account </span>
                                    <div style={{ height: '10px' }}> </div>
                                    <small>Let's join MU Info Community !</small>
                                </div>
                                <div style={{ height: '20px' }}> </div>

                                <form onSubmit={CreateAccount}>
                                    <div className={Mstyles.LoginBox_input}>
                                        <TextField
                                            required
                                            label="Full Name"
                                            fullWidth
                                            value={name}
                                            onInput={e => setName(e.target.value)}

                                        />
                                    </div>
                                    <div className={Mstyles.LoginBox_input}>
                                        <TextField
                                            required
                                            label="Enter Mobile Number"
                                            fullWidth
                                            value={mobile}
                                            onInput={e => setMobile(e.target.value)}
                                            type="number"
                                        />
                                    </div>
                                    <div className={Mstyles.LoginBox_input}>
                                        <TextField
                                            required
                                            label="Email Address"
                                            fullWidth
                                            value={email}
                                            onInput={e => setEmail(e.target.value)}

                                        />
                                    </div>
                                    <div className={Mstyles.LoginBox_input}>
                                        <TextField

                                            label="Referral Code (optional)"
                                            fullWidth
                                            value={referralCode}
                                            onInput={e => setReferralCode(e.target.value)}

                                        />
                                    </div>

                                    <div className={Mstyles.LoginBox_input}>
                                        <TextField fullWidth label="Create Password" type={`${PasswordShowtype}`} value={password}
                                            onInput={e => setPassword(e.target.value)}
                                            InputProps={{

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
                                <div className={Mstyles.Loginbtnbox}>
                                    <LoadingButton
                                        fullWidth
                                        onClick={CreateAccount}
                                        endIcon={<FiChevronRight />}
                                        loading={LoadingSignupbtn}
                                        loadingPosition="end"
                                        variant='contained'
                                    >
                                        <span>Create Account</span>
                                    </LoadingButton>


                                </div>

                                <div className={Mstyles.SignTextBox} onClick={() => router.push('/account/user_login')}>
                                    <span>Have an account? Log in</span>
                                </div>


                            </div>
                        )}
                        {OtpBox && (

                            <div className={Mstyles.Authbox}>
                                <div className={Mstyles.LoginLogo}>
                                    <img src='/logo/muinfologo.png' width={'100%'} alt='logo' />
                                </div>
                                <div style={{ height: '10px' }}> </div>
                                <div className={Mstyles.Lheader}>
                                    <span>Enter OTP </span>
                                    <div style={{ height: '10px' }}> </div>
                                    <small>OTP Succesfully sent on <small className={Mstyles.Otpmobiletext}>+91 {mobile}</small></small>
                                </div>
                                <div style={{ height: '20px' }}> </div>

                                <form onSubmit={VerifyOTP}>

                                    <div className={Mstyles.LoginBox_input}>
                                        <TextField
                                            required
                                            label="6 Digit OTP"
                                            fullWidth
                                            value={otp}
                                            onInput={e => setOtp(e.target.value)}
                                            type="number"
                                        />
                                    </div>

                                </form>
                                <div className={Mstyles.Loginbtnbox}>
                                    <LoadingButton
                                        fullWidth
                                        onClick={VerifyOTP}
                                        endIcon={<FiChevronRight />}
                                        loading={LoadingSignupbtn}
                                        loadingPosition="end"
                                        variant='contained'
                                    >
                                        <span>Verify OTP</span>
                                    </LoadingButton>


                                </div>



                            </div>
                        )}

                    </div>



                </div>

            </div>





        </>
    );
}

export default Overview;

