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
import CheckloginContext from '/context/auth/CheckloginContext'

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
import Footer from '/src/components/Parts/Footer'
import * as animationData from '/Data/Lottie/loginone.json'
import * as animationData2 from '/Data/Lottie/AnimationOtp.json'
import * as animationData3 from '/Data/Lottie/AnimationOtp.json'
import CryptoJS from "crypto-js";


import { AppDesc, AppName } from '/Data/config'
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
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [LoadingSignupbtn, setLoadingSignupbtn] = React.useState(false);
  const [usermobile, setMob] = useState('');
  const [Mobilenumber, setMobilenumber] = useState('');
  const [Fullname, setFullname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [sot, setSot] = useState('');
  const [isalert, setIsalert] = useState(false);
  const [IsReadonly, setIsReadonly] = useState(false);
  const [mobilebox, setMobilebox] = useState(true);
  const [Otpbox, setOtpbox] = useState(false);
  const [UserType, setUserType] = useState('');
  const [PasswordShowtype, setPasswordShowtype] = useState('password');
  const Contextdata = useContext(CheckloginContext)


  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';


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

  const handleChangeMob = () => {
    setIsalert(false);
    const mobA = document.querySelector('#Mobilenumber').value
    if (mobA.length <= 10) {
      setMobilenumber(mobA)
    }

  }
  const handleChangeFullname = () => {
    setIsalert(false);
    const FullnameA = document.querySelector('#Fullname').value
    setFullname(FullnameA)

  }
  const handleChangeEmail = () => {
    setIsalert(false);
    const EmailA = document.querySelector('#Email').value
    setEmail(EmailA)

  }
  const handleChangePassword = () => {
    setIsalert(false);
    const PasswordA = document.querySelector('#Password').value
    setPassword(PasswordA)

  }
  // On submit mobile
  const CreateAccount = async (e) => {
    e.preventDefault();
    if (Mobilenumber.length == 10 && Fullname !== '' && Email !== '' && Password !== '') {
      setLoadingSignupbtn(true)
      const sendUM = {
        mobile: Mobilenumber,
        name: Fullname,
        email: Email,
        PassKey: Password,

      }
      const data = await fetch("/api/Vendor/Auth/CheckAccountAuth", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendUM)
      }).then((a) => {
        return a.json();
      })
        .then((parsed) => {
          setLoadingSignupbtn(false)
          if (parsed.ReqD.OTPStatus == true) {
            ChangeReadonly(true)
            setMobilebox(false)
            setOtpbox(true)

          } else {
            if (parsed.ReqD.msg) {
              notify(`${parsed.ReqD.msg}`)
            } else {
              notify('😒 Something went wrong try after Sometime !')
            }

          }
        })

    } else {

      setIsalert(true);
      notify('All Fields are required')
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
      setLoadingSignupbtn(true)
      const sendUM = { mobile: Mobilenumber, otp: sot }
      const data = await fetch("/api/Vendor/Auth/VerifyOtp", {
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
            localStorage.setItem('Token', parsedFinal.ReqD.token)
            notify('😀Login Successful')
            setTimeout(function () {
              router.push('/Vendor/Dashboard');
              setLoadingSignupbtn(false)
            }, 2000);

          } else {
            setLoadingSignupbtn(false)
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
    ChangeReadonly(false)
    setLoadingSignupbtn(false)
  }
  const ChangeReadonly = async (e) => {
    setIsReadonly(e)

  }
  const handleClickShowPassword = async () => {
    if (showPassword == true) {
      setShowPassword(false)
      setPasswordShowtype('text')
    } else {
      setPasswordShowtype('password')
      setShowPassword(true)
    }

  }

  useEffect(() => {
    setLoading(false)
    if (Contextdata.IsLogin == true) {
      // router.push('/dashboards/main')
    } else {
      // router.push('/Login')
    }

  });
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
                <div className={Mstyles.LoginBoxItem}>
                  <div className={Mstyles.logomainBox}>


                    <div className={Mstyles.LogoVendorLogin}>
                      <img src='/logo/fmelogodark.svg' alt='logo' />
                    </div>
                    <div><h2>Create Vendor Account </h2>

                      <small>Enter Required details to create your vendor account.</small>
                    </div>

                    <form onSubmit={CreateAccount}>
                      <div style={{ height: '20px' }}> </div>
                      <div className={Mstyles.LoginBox_input}>
                        <TextField fullWidth label="Enter Name" InputProps={{
                          readOnly: IsReadonly,
                        }} id="Fullname" onChange={handleChangeFullname} value={Fullname} />
                      </div>
                      <div style={{ height: '20px' }}> </div>
                      <div className={Mstyles.LoginBox_input}>
                        <TextField fullWidth label="Enter Mobile Number" id="Mobilenumber" inputProps={{ inputMode: 'numeric', readOnly: IsReadonly, }} onChange={handleChangeMob} value={Mobilenumber} />
                      </div>
                      <div style={{ height: '20px' }}> </div>
                      <div className={Mstyles.LoginBox_input}>
                        <TextField fullWidth label="Enter Email" id="Email" onChange={handleChangeEmail} value={Email} InputProps={{
                          readOnly: IsReadonly,
                        }} />
                      </div>
                      <div style={{ height: '20px' }}> </div>
                      <div className={Mstyles.LoginBox_input}>
                        <TextField fullWidth label="Create Password" id="Password" type={`${PasswordShowtype}`} onChange={handleChangePassword} value={Password}
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


                    <div style={{ height: '20px' }}> </div>
                    {mobilebox &&

                      <div>
                        <div className={Mstyles.Loginbtnbox}>
                          <LoadingButton
                            fullWidth
                            onClick={CreateAccount}
                            endIcon={<FiChevronRight />}
                            loading={LoadingSignupbtn}
                            loadingPosition="end"
                            variant="contained"
                          >
                            <span>Proceed to Sign up</span>
                          </LoadingButton>
                          <div style={{ height: '15px' }}> </div>

                          <small>By signing up, you agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>

                        </div>
                        <div className={Mstyles.Signupadbox}>

                          <div>
                            <span style={{ fontWeight: 500 }}>Already have an <span className={Mstyles.primaryColor}>Flair My Event </span>Account ?</span>
                          </div>


                          <div style={{ height: '10px' }}> </div>
                          <LoadingButton
                            onClick={() => router.push('/Vendor/VendorLogin')}
                            endIcon={<FiChevronRight />}
                            loading={loading}
                            loadingPosition="end"
                            variant="outlined"
                          >
                            <span>Login </span>
                          </LoadingButton>
                          <div style={{ height: '20px' }}> </div>

                        </div>
                      </div>


                    }


                    {Otpbox && (
                      <div >
                        <div>


                          <div>
                            <span>OTP Succesfully Sent on +91{Mobilenumber}</span> <span style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer', fontWeight: 500 }} onClick={ShowMobile}><FiEdit /></span>
                          </div>
                          <div style={{ height: '20px' }}> </div>
                          <form onSubmit={verifyOTPBTN}>
                            <div className={Mstyles.LoginBox_input}>
                              <TextField fullWidth label="Enter OTP" id="otpinput" type="number" onChange={handleChangeOTP} autoFocus />
                            </div>


                            <div style={{ height: '20px' }}> </div>


                            <div className={Mstyles.Loginbtnbox}>

                              <LoadingButton
                                fullWidth
                                onClick={verifyOTPBTN}
                                endIcon={<FiChevronRight />}
                                loading={LoadingSignupbtn}
                                style={{ backgroundColor: '#52BE80' }}
                                loadingPosition="end"
                                variant="contained"
                              >
                                <span>Verify OTP</span>
                              </LoadingButton>
                            </div>
                          </form>
                          <div style={{ height: '10px' }}> </div>

                        </div>
                      </div>
                    )}

                  </div>

                </div>







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

