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
    const CheckLogin = async (e) => {
        e.preventDefault();
        if (mobile !== null && password !== null) {
            setLoadingSignupbtn(true)
            const sendUM = {
                mobile,
                password,

            }
            const data = await fetch("/api/user/user_login", {
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
                            const UserData = JSON.stringify(parsedFinal.ReqData.UserData)
                            document.cookie = `jwt_token=${newToken}; expires=${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
                            document.cookie = `user_data=${UserData}; expires=${new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
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
                <title>Login</title>
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
                                            <span>Login to your Account </span>
                                            <div style={{ height: '10px' }}> </div>
                                            <small>Enter your Registerd Mobile Number and password to login into your Account !</small>
                                        </div>
                                        <div style={{ height: '20px' }}> </div>

                                        <form onSubmit={CheckLogin}>

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
                                                <TextField fullWidth label="Enter Password" type={`${PasswordShowtype}`} value={password}
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
                                                onClick={CheckLogin}
                                                endIcon={<FiChevronRight />}
                                                loading={LoadingSignupbtn}
                                                loadingPosition="end"
                                                variant='contained'
                                            >
                                                <span>Proceed to Login</span>
                                            </LoadingButton>


                                        </div>
                                        <div className={Mstyles.ForgotpassText}>
                                            <span>Forgot Password ?</span>
                                        </div>
                                        <div className={Mstyles.SignTextBox} onClick={() => router.push('/account/user_signup')}>
                                            <span>Don't have an account? Sign up</span>
                                        </div>


                                    </div>
                                )}



                            </div>
                            <div className={Mstyles.loginboxA}>

                                <div className={Mstyles.loginboxAimg}>
                                    <Image
                                        src={`/img/login_girl.jpg`}
                                        alt="image"
                                        placeholder="blur"
                                        blurDataURL={blurredImageData}
                                        layout='responsive'
                                        quality={100}
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

