import React, { useState, useEffect, useContext, useRef } from 'react';

import Mstyles from '/styles/mainstyle.module.css'

import { useRouter, useParams } from 'next/router'
import UserDpUpdate from '../../../src/components/Upload/UserDpUpdate'

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
    const [Mobile, setMobile] = useState('');
    const [CurrentState, setCurrentState] = useState('');
    const [UserDp, setUserDp] = useState('');
    const [Email, setEmail] = useState('');
    const [FullAddress, setFullAddress] = useState('');
    const [City, setCity] = useState('');
    const [Pincode, setPincode] = useState('');

    const [FullDesc, setFullDesc] = useState('');
    const [Shortbio, setShortbio] = useState('');
    const [CoursesList, setCoursesList] = useState([]);
    const [SessionList, setSessionList] = useState([]);
    const [Courses, setCourses] = useState(null);
    const [Session, setSession] = useState(null);
    const [DateOfBirth, setDateOfBirth] = useState(null);
    const [CollageName, setCollageName] = useState(null);
    const [LoadingCS, setLoadingCS] = useState(false);

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
       
        e.preventDefault();
        if (FullName !== '' && FullDesc !== '' && DateOfBirth !== null && Session !== null&& Courses !== null && CollageName !== null && Pincode !== '' && City !== '' && FullAddress !== '' && CurrentState !== '') {
            setBtnloading(true)
            const sendUM = {

                name: FullName,
               
                WhatsApp: WhatsApp,
                Pincode: Pincode,
                State: CurrentState,
                FullAddress: FullAddress,
                City: City,
                Shortbio: FullDesc,
                DateOfBirth: DateOfBirth,
                CollageName:CollageName,
                Courses:Courses,
                Session: Session,


            }
            const data = await fetch("/api/user/update_profile", {
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
        console.log(Contextdata.UserData)
        setFullName(Contextdata.UserData.name)
        setUserDp(Contextdata.UserData.dp)

        setWhatsApp(Contextdata.UserData.ProfileData.WhatsApp);
        setMobile(Contextdata.UserData.mobile);
        setEmail(Contextdata.UserData.email);

        setFullAddress(Contextdata.UserData.ProfileData.FullAddress);
        setCity(Contextdata.UserData.ProfileData.City);
        setPincode(Contextdata.UserData.ProfileData.Pincode);

        setCurrentState(Contextdata.UserData.ProfileData.State);


        setFullDesc(Contextdata.UserData.ProfileData.Shortbio);
        setDateOfBirth(Contextdata.UserData.ProfileData.DateOfBirth);
        setCourses(Contextdata.UserData.ProfileData.Courses);
        setSession(Contextdata.UserData.ProfileData.Session);
        setCollageName(Contextdata.UserData.ProfileData.CollageName);


        GetCoursesListession()
    }, [])



    const GetCoursesListession = async () => {

        const sendUM = {}
        const data = await fetch("/api/user/courses_and_session_list", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
               

                if (parsed.ReqData.Courses) {
                    setCoursesList(parsed.ReqData.Courses)

                }
                if (parsed.ReqData.Sessions) {
                    setSessionList(parsed.ReqData.Sessions)


                }
                setLoadingCS(false)
            })
    }





    const editorStyle = {
        height: '300px', // Set the desired height

    };


    const ChangeCourse = (event) => {
        setCourses(event.target.value);

    };
    const ChangeSession = (event) => {
        setSession(event.target.value);

    };


    return (
        <div>
            {!Loading &&

                <div>

                    <div className={Mstyles.EditPBox}>
                        <div className={Mstyles.EditPBoxProfile}>
                            <UserDpUpdate />
                        </div>

                        <div className={Mstyles.EditPBoxA}>

                            <h4>Profile Details</h4>

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
                                <TextField
                                    required
                                    label="Email Address"
                                    fullWidth
                                    value={Email}

                                />
                            </div>
                            <div className={Mstyles.inputlogin}>
                                <TextField
                                    required
                                    label="Mobile Number"
                                    fullWidth
                                    value={Mobile}
                                    type='number'
                                />
                            </div>
                            <div className={Mstyles.inputlogin}>
                                <TextField
                                    required
                                    label="WhatsApp Number"
                                    fullWidth
                                    value={WhatsApp}
                                  
                                    type='number'
                                    onInput={e => setWhatsApp(e.target.value)}

                                />
                            </div>
                            <div className={Mstyles.inputlogin}>
                                <div style={{marginBottom:'15px'}}>Date Of Birth</div>
                                <TextField
                                    required
                                  
                                    fullWidth
                                    value={DateOfBirth}
                                    type='date'
                                    onInput={e => setDateOfBirth(e.target.value)}

                                />
                            </div>


                        </div>
                        <div className={Mstyles.EditPBoxB}>
                            <h4>Academic Details</h4>

                            <div className={Mstyles.inputlogin}>
                                {LoadingCS ?
                                    <div>
                                        <Skeleton variant="rounded" width='100%' height={60} />
                                    </div> :
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel >Select Course</InputLabel>
                                            <Select
                                                value={Courses}
                                                label="Select Course"

                                                onChange={ChangeCourse}
                                            >
                                                <MenuItem value={''}>Select</MenuItem>
                                                {CoursesList.map((item) => {
                                                    return <MenuItem value={item.slug}>{item.title}</MenuItem>
                                                }

                                                )}
                                            </Select>

                                        </FormControl>
                                    </div>
                                }
                            </div>
                            <div className={Mstyles.inputlogin}>
                                {LoadingCS ?
                                    <div>
                                        <Skeleton variant="rounded" width='100%' height={60} />
                                    </div> :
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel >Select Session</InputLabel>
                                            <Select
                                                value={Session}
                                                label="Select Session"

                                                onChange={ChangeSession}
                                            >
                                                <MenuItem value={''}>Select</MenuItem>
                                                {SessionList.map((item) => {
                                                    return <MenuItem value={item.session_id}>{item.titleA}-{item.titleB}</MenuItem>
                                                }

                                                )}
                                            </Select>

                                        </FormControl>
                                    </div>
                                }
                            </div>
                        
                            <div className={Mstyles.inputlogin}>
                                <TextField
                                    required
                                    label="Collage Name"
                                    fullWidth
                                    value={CollageName}

                                    onInput={e => setCollageName(e.target.value)}

                                />
                            </div>



                        </div>
                        <div className={Mstyles.EditPBoxB}>
                            <h4>Address Details</h4>


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
                                    <InputLabel >State</InputLabel>
                                    <Select


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
                        <div className={Mstyles.EditPBoxC}>

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







                </div>
            }


        </div>
    );
}