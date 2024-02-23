import React, { useState, useEffect, useContext } from 'react';

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import InputAdornment from '@mui/material/InputAdornment';
import CheckloginContext from '/context/auth/CheckloginContext'
import Mstyles from '/Styles/mainstyle.module.css'

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
  const Contextdata = useContext(CheckloginContext)
  const router = useRouter()
  const [Loading, setLoading] = React.useState(true);
  const [usermobile, setMob] = useState('');
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const [isalert, setIsalert] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [LoadingSignupbtn, setLoadingSignupbtn] = React.useState(false);
  const [IsReadonly, setIsReadonly] = useState(false);
  const [mobilebox, setMobilebox] = useState(true);


  const [Password, setPassword] = useState('');

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


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
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

          if (parsedFinal.ReqD.LoginStatus == true) {
            localStorage.setItem('Token', parsedFinal.ReqD.token)
            Contextdata.ChangeAlertData('Login Succesfull, please wait... 😎 ', 'success')
            setTimeout(function () {
              router.push('/Vendor/Dashboard');

            }, 2000);

          }

          if (parsedFinal.ReqD.Notregistered == true) {

            Contextdata.ChangeAlertData('Account Not Registerd with us ', 'warning')
            // setTimeout(function () {
            //   router.push(`/Register?mobile=${usermobile}`);
            // }, 1000);

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


  useEffect(() => {
    if (localStorage.getItem('Token')) {
      router.push('/Vendor/Dashboard')
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
        <div className={Mstyles.UserLoginBox}>
          <div className={Mstyles.UserLoginBoxOverlayBg}>
            <div className={Mstyles.ULAnimIconABox}>
              <div className={Mstyles.ULAnimIconA}>
                <div className="decore-zigzag">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20.76062" height="20.94" viewBox="0 0 65.76062 20.94" creator="Katerina Limpitsouni"><path d="M3.0696,14.35003c14.77852-4.66461,30.54831-5.6899,45.76236-2.61603,4.44585,.89825,8.8161,2.1243,13.095,3.6261,1.274,.44715,2.73515-.50817,3.0753-1.7461,.37901-1.37937-.46745-2.62652-1.7461-3.0753C47.82195,5.12165,31.2588,3.6356,15.11839,6.30519c-4.53218,.74961-8.99807,1.84099-13.37799,3.22345C-1.31727,10.49374-.01125,15.32246,3.0696,14.35003h0Z" fill="#ffc44f" origin="undraw" /><path d="M55.97417,3.76117l2.58581,4.86421,1.32984,2.5016,.66492,1.2508c.08649,.16269,.16913,.42327,.29552,.55591-.51452-.53997,1.42541-2.15361,.51312-1.82543-.8054,.28974-1.58804,.8423-2.34456,1.24356-.82749,.4389-1.65498,.87781-2.48247,1.31671-1.65498,.87781-3.30996,1.75562-4.96494,2.63342-1.15699,.61367-1.60767,2.31798-.89688,3.42047,.75851,1.17651,2.18291,1.55329,3.42047,.89688,1.93081-1.02411,3.86162-2.04822,5.79243-3.07233,.91943-.48767,1.83887-.97534,2.7583-1.46301,1.14784-.60882,2.34415-1.1119,2.8815-2.38522,.54904-1.30103,.0367-2.54313-.58127-3.70559l-1.55149-2.91853c-1.03432-1.94569-2.06865-3.89137-3.10297-5.83706-.61473-1.15638-2.31725-1.60814-3.42047-.89688-1.17565,.75796-1.55443,2.18355-.89688,3.42047h0Z" fill="#ffc44f" /></svg>
                </div>
                <div className="decore-zigzag">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20.36113" height="28.9054" viewBox="0 0 40.36113 38.9054" creator="Katerina Limpitsouni"><path d="M19.70556,28.00919c-2.15592,.90546-4.01062,2.14927-5.9324,3.46355-1.74319,1.19215-3.45366,2.2581-5.57536,2.57124l3.0753,3.0753c.36799-2.4042,.73597-4.80841,1.10396-7.21261,.17173-1.12196,.34367-2.24389,.51518-3.36589,.18989-1.24225-.08272-1.99141-.72587-3.03697-2.21289-3.59747-5.11125-6.61693-8.49624-9.12248l-1.2618,4.65868c2.33234-.04929,4.67205-.31811,6.95089-.82282,1.03157-.22847,2.0518-.50936,3.05482-.8415,1.07006-.35434,2.42645-.69147,3.26101-1.46913,.7761-.7232,1.05584-1.76394,1.44445-2.722l1.30082-3.20695,2.78747-6.87205-4.56937,.5972c2.35108,3.18379,4.31642,6.6451,5.72596,10.3473,.39725,1.04338,1.23531,1.8354,2.4107,1.8354,1.05531,0,2.17889-.77044,2.4107-1.8354l.06286-.28881-2.4107,1.8354,13.02955,1.50949-1.76777-4.26777c-1.71654,1.80345-3.43307,3.60691-5.14961,5.41036-.80105,.84161-1.6021,1.68322-2.40315,2.52484-.65014,.68306-1.46133,1.3468-1.7001,2.2974-.26878,1.07008-.13372,2.40093-.0944,3.49576,.03954,1.10106,.13044,2.19869,.26291,3.2923,.2928,2.41726,.76858,4.78544,1.47107,7.1175l3.0753-3.0753c-1.82897-.61231-3.57117-1.3839-5.24823-2.33841-1.34755-.76697-3.19716-1.67852-4.17557-2.91069-.8403-1.05824-2.65757-.87796-3.53553,0-1.04529,1.04529-.84245,2.47459,0,3.53553,.58278,.73393,1.5591,1.30313,2.31477,1.84768,.92372,.66565,1.88322,1.28163,2.87274,1.84482,2.04151,1.16194,4.21654,2.09719,6.44263,2.84245,1.80592,.6046,3.60651-1.31182,3.0753-3.0753-.59267-1.9675-1.07053-3.98077-1.32005-6.02267-.12398-1.01452-.19864-2.03659-.23532-3.05793-.01694-.47164-.02503-.94367-.02418-1.41562,.00056-.31466,.00508-.62927,.01357-.94382-.05945,.1572-.0749,.18411-.04634,.08072l-.64293,1.10317c2.86089-3.00576,5.72179-6.01152,8.58268-9.01727,1.61333-1.69502,.32239-4.02562-1.76777-4.26777l-13.02955-1.50949c-1.02577-.11884-2.19771,.85688-2.4107,1.8354l-.06286,.28881h4.8214c-1.56857-4.11988-3.60924-7.99271-6.23-11.54169-1.34395-1.81996-3.73271-1.46546-4.56937,.5972l-4.64578,11.45341,.64293-1.10317-.28037,.28083,1.10317-.64293c-3.46066,1.40546-7.0623,2.19657-10.79801,2.27552-2.64815,.05597-3.1784,3.24001-1.2618,4.65868,2.96338,2.19349,5.38831,5.02497,7.22417,8.21039l-.25202-1.9264c-.74216,3.55154-1.11793,7.2203-1.66698,10.80741-.30706,2.00613,1.07824,3.37004,3.0753,3.0753,4.55314-.672,7.44735-4.32947,11.50776-6.03479,1.24392-.52243,2.13685-1.65343,1.7461-3.0753-.32232-1.17288-1.82249-2.27226-3.0753-1.7461Z" fill="#ffc44f" origin="undraw" /></svg>
                </div>
              </div>

              <div className={Mstyles.ULAnimIconA}>
                <div className="decore-zigzag">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20.17975" height="20.21196" viewBox="0 0 39.17975 50.21196" creator="Katerina Limpitsouni"><path d="M4.54886,33.87506C12.74097,24.99536,20.93307,16.11566,29.12517,7.23597c.74988-.81282,1.45767-1.6084,2.40037-2.19705,.4478-.27961,.20113,.0842,.11498-.10882,.08737,.19576,.28254,.53082,.3731,.85774,.64419,2.32554,.79267,4.87974,1.05261,7.27165,.59436,5.46904,.91211,10.96735,1.03691,16.4664,.13766,6.06559,.0344,12.13571-.29072,18.19394l3.1646-2.4107c-11.8896-2.96368-23.10371-8.04037-33.19344-14.99245l.89688,3.42047,.25931-.36806c.77804-1.10437,.19857-2.77975-.89688-3.42047-1.25004-.73115-2.64063-.21005-3.42047,.89688l-.25931,.36806c-.81842,1.16167-.13804,2.70739,.89688,3.42047,10.4125,7.17448,22.11893,12.43826,34.38784,15.49649,1.63973,.40873,3.07664-.77171,3.1646-2.4107,.63865-11.90054,.50228-23.90636-.86869-35.75323-.30594-2.64373-.39908-5.61796-1.31094-8.13762-1.03332-2.85526-3.77473-4.62322-6.78455-3.47392-2.8837,1.10114-4.92726,4.07015-6.95189,6.26473l-6.73324,7.29838C11.11318,19.39195,6.06326,24.86574,1.01333,30.33953c-2.17916,2.36207,1.34795,5.90673,3.53553,3.53553Z" fill="#ffc44f" origin="undraw" /></svg>
                </div>
                <div className="decore-zigzag">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20.67258" height="26.06185" viewBox="0 0 38.67258 46.06185" creator="Katerina Limpitsouni"><path d="M21.80088,45.33602c3.58974-4.38591,6.94814-8.95969,10.00375-13.73404,2.86574-4.47768,5.81646-9.27804,6.63859-14.62174,.73327-4.76619-.24381-9.90652-3.62485-13.51203C31.86184,.3154,27.08696-.858,23.0146,.65737c-2.17098,.80784-4.12471,2.29627-5.14654,4.41999-1.47908,3.07408-1.04556,6.39616-.49073,9.63746l4.56937-1.9264c-1.62023-3.70349-3.75608-7.572-7.86667-8.88482-3.77491-1.20561-8.11046,.30736-10.76739,3.13326C.17625,10.37272-.49135,15.10445,.30993,19.46737c.84114,4.57994,3.53759,8.51025,6.35773,12.10143,3.59938,4.58347,7.36162,9.04609,11.04794,13.55984,.85468,1.04652,2.64838,.88715,3.53553,0,1.03483-1.03483,.8568-2.48641,0-3.53553-2.78553-3.41077-5.57106-6.82154-8.35658-10.23231-2.40199-2.94115-4.87894-5.87361-6.52722-9.32514-1.37629-2.88196-2.01165-6.53576-.73129-9.56713,.98421-2.33022,3.45364-4.15895,6.01491-3.97726,3.28471,.23301,4.83431,4.20557,5.97841,6.82074,.49198,1.12456,2.09897,1.47253,3.12188,1.02289,1.2099-.53184,1.66396-1.68474,1.4475-2.94929-.31358-1.83195-.74253-3.99665-.01331-5.78466,.45475-1.11501,1.42193-1.85923,2.43997-2.22431,2.58585-.92733,5.40517-.15643,7.16385,2.22539,5.06337,6.85745-.62648,15.75519-4.42618,21.67044-2.79186,4.34627-5.82598,8.53065-9.09771,12.52801-.85449,1.04401-1.0215,2.51403,0,3.53553,.88184,.88184,2.67611,1.05004,3.53553,0h0Z" fill="#ffc44f" origin="undraw" /></svg>
                </div>

              </div>
            </div>
          </div>
          <div className={Mstyles.ULBoxOverlay}>
            <div className={Mstyles.ULContentBox}>
              <div className={Mstyles.logomainBox}>
                {mobilebox && (
                  <div>
                    <div>
                      <div style={{ height: '50px' }}> </div>
                      <div className={Mstyles.LoginLogo}>
                        <img src='/logo/mainlogo.png' alt='logo' />
                      </div>
                      <div style={{ height: '10px' }}> </div>
                      <div><h2>Login to Vendor Account </h2>
                        <div style={{ height: '10px' }}> </div>
                        <small>Enter your Registerd Mobile Number and password to login into your Vendor Account !</small>
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
                          variant='contained'
                        >
                          <span>Proceed to Login</span>
                        </LoadingButton>


                      </div>
                      <div>
                        <div style={{ height: '15px' }}> </div>

                        <small>By signing up, you agree to our <span className={Mstyles.url} onClick={() => router.push('/TermsConditions')}>Terms & Conditions</span> and <span className={Mstyles.url} onClick={() => router.push('/PrivacyPolicy')}>Privacy Policy</span></small>
                      </div>
                      <div style={{ height: '20px' }}> </div>
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





                    </div>

                  </div>
                )}



              </div>



            </div>
          </div>
        </div>

      }





    </>
  );
}

export default Overview;

