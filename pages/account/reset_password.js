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
import { SvgLogo } from '/Data/config'
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
        if (mobile !== null) {
            setLoadingSignupbtn(true)
            const sendUM = {
                mobile,

            }
            const data = await fetch("/api/user/reset_password_otp", {
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


                        if (parsedFinal.ReqData.done) {

                            setMobilebox(false)
                            setOtpBox(true)

                        }

                        if (parsedFinal.ReqData.msg) {

                            Contextdata.ChangeAlertData(`${parsedFinal.ReqData.msg}`, 'warning')


                        }

                        setLoadingSignupbtn(false);
                    }, 2000);


                })



        } else {
            setLoadingSignupbtn(false)
            Contextdata.ChangeAlertData('😣 All Fields are required', 'warning')
        }

    }
    const VerifyOTP = async (e) => {
        e.preventDefault();
        if (mobile !== null && otp !== null && password !== null) {
            setLoadingSignupbtn(true)
            const sendUM = {
                mobile,
                otp,
                password

            }
            const data = await fetch("/api/user/reset_password", {
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
                        if (parsedFinal.ReqData.done) {
                            Contextdata.ChangeAlertData(`Password Reset Successfully`, 'success',)
                            router.push('/account/user_login')

                        }

                        if (parsedFinal.ReqData.msg) {

                            Contextdata.ChangeAlertData(`${parsedFinal.ReqData.msg}`, 'warning')


                        }

                        setLoadingSignupbtn(false);
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
                <title>Reset Password</title>
            </Head>
            <div className={Mstyles.iconbg}>
                <div className={Mstyles.iconbgBox}>
                    <div className={Mstyles.loginboxmain}>
                        <div className={Mstyles.loginbox}>
                            <div className={Mstyles.loginboxB}>
                                {mobilebox && (

                                    <div className={Mstyles.Authbox}>
                                        <div className={Mstyles.LoginLogo}>
                                            <img src={SvgLogo} width={'100%'} alt='logo' />
                                        </div>
                                        <div style={{ height: '10px' }}> </div>
                                        <div className={Mstyles.Lheader}>
                                            <span>Reset Password</span>
                                            <div style={{ height: '10px' }}> </div>
                                            <small>Create Your Password Stonger 🔐</small>
                                        </div>
                                        <div style={{ height: '20px' }}> </div>

                                        <form onSubmit={CreateAccount}>

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
                                                <span>Send OTP</span>
                                            </LoadingButton>


                                        </div>


                                    </div>
                                )}
                                {OtpBox && (

                                    <div className={Mstyles.Authbox}>
                                        <div className={Mstyles.LoginLogo}>
                                            <img src={SvgLogo} width={'100%'} alt='logo' />
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
                                            
                                            <div className={Mstyles.LoginBox_input}>
                                                <TextField fullWidth label="Create New Password" type={`${PasswordShowtype}`} value={password}
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

                                        </form>
                                       



                                    </div>
                                )}

                            </div>
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




                        </div>

                    </div>

                </div>

            </div>


        </>
    );
}

export default Overview;

