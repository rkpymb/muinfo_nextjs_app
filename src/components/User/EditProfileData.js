import React, { useState, useEffect, useContext, useRef } from 'react';

import Mstyles from '/Styles/mainstyle.module.css'

import { useRouter, useParams } from 'next/router'
import UploadUserDp from '../Upload/UploadUserDp'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { LuChevronRight } from "react-icons/lu";

import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '/context/auth/CheckloginContext'
import Select from '@mui/material/Select';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';


import {
    FormControl,
    TextField,


} from '@mui/material';
export default function ScrollDialog() {
    const Contextdata = useContext(CheckloginContext)
    const [Btnloading, setBtnloading] = useState(false);
    const router = useRouter()
    const [Loading, setLoading] = React.useState(true);
    const [FullName, setFullName] = useState('');
    const [WhatsApp, setWhatsApp] = useState('');
    const [ContactMobile, setContactMobile] = useState('');
    const [CurrentState, setCurrentState] = useState('');
    const [UserDp, setUserDp] = useState('');
    const [ContactEmail, setContactEmail] = useState('');
    const [FullAddress, setFullAddress] = useState('');
    const [City, setCity] = useState('');
    const [Pincode, setPincode] = useState('');

    const [FullDesc, setFullDesc] = useState('');
    const [Shortbio, setShortbio] = useState('');

    const handleEditorChange = (content) => {
        setFullDesc(content);

    };


    const handleChangeVState = (event) => {
        setCurrentState(event.target.value);
    };

    useEffect(() => {
        if (Contextdata.UserLogin) {
            Contextdata.ChangeMainLoader(false)
            setLoading(false)
            
        }
    }, [Contextdata.UserData]);


    const UpdateProfile = async (e) => {
        let UploadFilename = document.querySelector('#UploadFilename').value
        e.preventDefault();
        if (FullName !== '' && FullDesc !== '' && WhatsApp !== '' && Pincode !== '' && City !== '' && FullAddress !== '' && CurrentState !== '') {
            setBtnloading(true)
            const sendUM = {
                JwtToken: Contextdata.UserJwtToken,
                name: FullName,
                dp: UploadFilename,
                WhatsApp: WhatsApp,
                Pincode: Pincode,
                State: CurrentState,
                FullAddress: FullAddress,
                City: City,
                Shortbio: FullDesc,

            }
            const data = await fetch("/api/User/UpdateProfileData", {
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
                        Contextdata.ChangeAlertData('Profile Updated Successfully', 'success')
                        setTimeout(function () {
                            setBtnloading(false)
                            router.push('/user/edit-profile')
                        }, 2000);

                    } else {
                        setBtnloading(false)
                        Contextdata.ChangeAlertData('Something went wrong 😒', 'warning')

                    }

                })

        } else {
            alert('Please Fill All Required Fields');
        }

    }



    useEffect(() => {
        console.log(Contextdata.UserData.UserData)
        setFullName(Contextdata.UserData.name)
        setUserDp(Contextdata.UserData.dp)

        setWhatsApp(Contextdata.UserData.UserData[0].WhatsApp);
        setContactMobile(Contextdata.UserData.UserData[0].Mobile);

        setFullAddress(Contextdata.UserData.UserData[0].FullAddress);
        setCity(Contextdata.UserData.UserData[0].City);
        setPincode(Contextdata.UserData.UserData[0].Pincode);

        setCurrentState(Contextdata.UserData.UserData[0].State);


        setFullDesc(Contextdata.UserData.UserData[0].Shortbio);



    }, [])



    const editorStyle = {
        height: '300px', // Set the desired height

    };




    return (
        <div>

            {Loading ? <div>Loading...</div> :

                <div>

                    <div className={Mstyles.VDFlexboxtwo}>
                        <div className={Mstyles.Upladdpboxv}>
                            <UploadUserDp />
                        </div>
                        <div className={Mstyles.VDFlexboxtwoA}>

                            <h4>Profile Details</h4>
                            <form onSubmit={UpdateProfile} >
                                <div className={Mstyles.inputlogin}>
                                    <TextField
                                        required
                                        label="Full Name"
                                        fullWidth
                                        value={FullName}

                                        onInput={e => setFullName(e.target.value)}

                                    />
                                </div>

                                <div className={Mstyles.inputlogin}>
                                    <div>
                                        <ReactQuill
                                            theme="snow" // You can change the theme as per your preference
                                            value={FullDesc}
                                            onChange={handleEditorChange}
                                            style={{ height: '230px' }}
                                        />
                                    </div>

                                </div>
                                <input type="hidden" id="UploadFilename" value={UserDp} />
                            </form>
                        </div>
                        <div className={Mstyles.VDFlexboxtwoB}>
                            <h4>Address and Contact Details</h4>

                            <div className={Mstyles.inputlogin}>
                                <TextField
                                    required
                                    label="WhatsApp Number"
                                    fullWidth
                                    value={WhatsApp}

                                    onInput={e => setWhatsApp(e.target.value)}

                                />
                            </div>

                            <div className={Mstyles.inputlogin}>
                                <TextField
                                    required
                                    label="Pincode"
                                    fullWidth
                                    value={Pincode}

                                    onInput={e => setPincode(e.target.value)}

                                />
                            </div>
                            <div className={Mstyles.inputlogin}>
                                <TextField
                                    required
                                    label="Current City"
                                    fullWidth
                                    value={City}
                                    onInput={e => setCity(e.target.value)}

                                />
                            </div>
                            <div className={Mstyles.inputlogin}>
                                <TextField
                                    required
                                    label="Full Address"
                                    fullWidth
                                    value={FullAddress}
                                    onInput={e => setFullAddress(e.target.value)}

                                />
                            </div>
                            <div className={Mstyles.inputlogin}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={CurrentState}
                                        label="State"
                                        onChange={handleChangeVState}
                                    >

                                        <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                                        <MenuItem value="Andaman and Nicobar Islands">
                                            Andaman and Nicobar Islands
                                        </MenuItem>
                                        <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
                                        <MenuItem value="Assam">Assam</MenuItem>
                                        <MenuItem value="Bihar">Bihar</MenuItem>
                                        <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                                        <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                                        <MenuItem value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</MenuItem>
                                        <MenuItem value="Daman and Diu">Daman and Diu</MenuItem>
                                        <MenuItem value="Delhi">Delhi</MenuItem>
                                        <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                                        <MenuItem value="Puducherry">Puducherry</MenuItem>
                                        <MenuItem value="Goa">Goa</MenuItem>
                                        <MenuItem value="Gujarat">Gujarat</MenuItem>
                                        <MenuItem value="Haryana">Haryana</MenuItem>
                                        <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
                                        <MenuItem value="Jammu and Kashmir">Jammu and Kashmir</MenuItem>
                                        <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                                        <MenuItem value="Karnataka">Karnataka</MenuItem>
                                        <MenuItem value="Kerala">Kerala</MenuItem>
                                        <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
                                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                        <MenuItem value="Manipur">Manipur</MenuItem>
                                        <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                                        <MenuItem value="Mizoram">Mizoram</MenuItem>
                                        <MenuItem value="Nagaland">Nagaland</MenuItem>
                                        <MenuItem value="Odisha">Odisha</MenuItem>
                                        <MenuItem value="Punjab">Punjab</MenuItem>
                                        <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                                        <MenuItem value="Sikkim">Sikkim</MenuItem>
                                        <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                                        <MenuItem value="Telangana">Telangana</MenuItem>
                                        <MenuItem value="Tripura">Tripura</MenuItem>
                                        <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                                        <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                                        <MenuItem value="West Bengal">West Bengal</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>



                        </div>

                    </div>

                    <div className={Mstyles.Footerbtnbox}>

                        <LoadingButton
                            fullWidth

                            onClick={UpdateProfile}
                            endIcon={<LuChevronRight />}
                            loading={Btnloading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Update Profile</span>
                        </LoadingButton>

                    </div>






                </div>

            }



        </div>
    );
}