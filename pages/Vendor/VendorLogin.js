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

import Mstyles from '/Styles/mainstyle.module.css'

import Head from 'next/head';
import Lottie from 'react-lottie'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VendorLoginVideo from '/src/components/Parts/VideoPlayer/VendorLoginVideo'


import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Footer from '../../src/components/Parts/Footer'
import * as animationData from '../../Data/Lottie/loginone.json'
import * as animationData2 from '../../Data/Lottie/AnimationOtp.json'
import * as animationData3 from '../../Data/Lottie/AnimationOtp.json'
import CryptoJS from "crypto-js";

import CheckloginContext from '/context/auth/CheckloginContext'
import { AppDesc, AppName } from '../../Data/config'
import { useRouter, useParams } from 'next/router'
const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);



const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [loading, setLoading] = React.useState(false);
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

  const notify = (T) => toast(T, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

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
      const data = await fetch("/api/Vendor/Auth/VendorLogin", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsedFinal) => {
          console.log(parsedFinal)

          if (parsedFinal.ReqD.LoginStatus == true) {
            localStorage.setItem('Token', parsedFinal.ReqD.token)
            notify('😀Login Successful')
            setTimeout(function () {
              router.push('/Vendor/Dashboard');
              setLoadingSignupbtn(false)
            }, 2000);

          } else {
            setLoadingSignupbtn(false)
            notify(parsedFinal.ReqD.msg)
          }



        })

    } else {

      setIsalert(true);
      notify('Invalid Mobile Number or Password')
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
            localStorage.setItem('Token', parsedFinal.ReqD.token)
            notify('😀Login Successful')
            setTimeout(function () {
              router.back();
            }, 2000);

          } else {
            setLoading(false)

            notify('😒 Invalid OTP')
          }

        })


    } else {

      notify('🤦‍♀️ Please Enter OTP')

    }
  }



  const ShowMobile = async () => {
    setOtpbox(false)
    setMobilebox(true)
  }

  useEffect(() => {
    if (localStorage.getItem('Token')) {
      router.push('/Vendor/Dashboard')
    } else {
      setLoading(false)
    }
  });


  useEffect(() => {
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    Contextdata.ChangeMainLoader(false)
  }, [router.query]);
  return (
    <div>
      <Head>
        <title>Flair My Event : Vendor Login</title>
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />
      <div>
        <div className={Mstyles.LoginFull}>
          <div className={Mstyles.LoginBoxVendorCover}>
            <div className={Mstyles.OnlyDesktop}>
              <div style={{ height: '70px' }}></div>
            </div>
            <div className={Mstyles.LoginBoxVendor}>
              <div className={Mstyles.LoginBoxVendorA}>

                <VendorLoginVideo />
              </div>
              <div className={Mstyles.LoginBoxVendorB}>

                {mobilebox && (
                  <div className={Mstyles.LoginBoxItem}>
                    <div className={Mstyles.logomainBox}>

                      <div style={{ height: '10px' }}> </div>
                      <div className={Mstyles.LogoVendorLogin}>
                        <img src='/logo/fmelogodark.svg' alt='logo' />
                      </div>
                      <div><h2>Login to your Vendor Account </h2>
                        <div style={{ height: '10px' }}> </div>
                        <small>Enter your Registered Mobile Number and Password to Login into Vendor Account.</small>
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
                          className={Mstyles.MainBtn}
                        >
                          <span>Proceed to Login</span>
                        </LoadingButton>
                        <div style={{ height: '15px' }}> </div>

                        <small>By signing up, you agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>

                      </div>





                    </div>

                  </div>
                )}
                {mobilebox && (
                  <div className={Mstyles.Signupadbox}>

                    <div>
                      <h2>Grow your business with <span className={Mstyles.primaryColor}>Flair My Event</span> 😍</h2>
                    </div>

                    <div className={Mstyles.VendorAdItemBox}>
                      <div className={Mstyles.VendorAdItem}>
                        <div className={Mstyles.VendorAdItemImg}>
                          <Image
                            src={`/img/check.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={100}
                            height={100}
                            quality={100}
                            objectFit='cover'
                            blurDataURL={blurredImageData}

                          />
                        </div>
                        <div className={Mstyles.VendorAdItemText}>
                          <span>Showcase your services on our industry leading site!
                          </span>
                        </div>
                      </div>
                      <div className={Mstyles.VendorAdItem}>
                        <div className={Mstyles.VendorAdItemImg}>
                          <Image
                            src={`/img/check.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={100}
                            height={100}
                            quality={100}
                            objectFit='cover'
                            blurDataURL={blurredImageData}

                          />
                        </div>
                        <div className={Mstyles.VendorAdItemText}>
                          <span>Reach local engaged couples and book more weddings.
                          </span>
                        </div>
                      </div>
                      <div className={Mstyles.VendorAdItem}>
                        <div className={Mstyles.VendorAdItemImg}>
                          <Image
                            src={`/img/check.png`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={100}
                            height={100}
                            quality={100}
                            objectFit='cover'
                            blurDataURL={blurredImageData}

                          />
                        </div>
                        <div className={Mstyles.VendorAdItemText}>
                          <span>Trusted by over 73,000 professionals
                          </span>
                        </div>
                      </div>

                    </div>
                    <div style={{ height: '20px' }}> </div>
                    <LoadingButton
                      onClick={() => router.push('/Vendor/VendorSignup')}
                      endIcon={<FiChevronRight />}
                      loading={false}
                      loadingPosition="end"
                      variant="outlined"
                    >
                      <span>Sign up</span>
                    </LoadingButton>
                    <div style={{ height: '20px' }}> </div>

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
                        className={Mstyles.MainBtn}
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



    </div>
  );
}

export default Overview;
