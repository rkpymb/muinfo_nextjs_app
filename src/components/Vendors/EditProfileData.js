import React, { useState, useEffect, useContext, useRef } from 'react';

import Skeleton from '@mui/material/Skeleton';

import Mstyles from '/Styles/mainstyle.module.css'


import { useRouter, useParams } from 'next/router'
import UploadVdp from '../Upload/UploadVdp'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { LuChevronRight } from "react-icons/lu";

import LoadingButton from '@mui/lab/LoadingButton';
import CheckloginContext from '/context/auth/CheckloginContext'
import Select from '@mui/material/Select';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    FormControl,
    TextField,


} from '@mui/material';
export default function ScrollDialog() {
    const Contextdata = useContext(CheckloginContext)
    const [Btnloading, setBtnloading] = useState(false);
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [Mainimg, setMainimg] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png');
    const [scroll, setScroll] = useState('paper');
    const [FullName, setFullName] = useState('');
    const [WhatsApp, setWhatsApp] = useState('');
    const [ContactMobile, setContactMobile] = useState('');
    const [CurrentState, setCurrentState] = useState('');
    const [UserDp, setUserDp] = useState('');
    const [ContactEmail, setContactEmail] = useState('');
    const [FullAddress, setFullAddress] = useState('');
    const [City, setCity] = useState('');
    const [Pincode, setPincode] = useState('');

    const [Category, setCategory] = useState('');
    const [VType, setVType] = useState('');
    const [SubCategory, setSubCategory] = useState('');

    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');
    const [GoogleMapLink, setGoogleMapLink] = useState('');

    const [CatListdata, setCatListdata] = useState([]);
    const [SubCatListdata, setSubCatListdata] = useState([]);
    const [FullDesc, setFullDesc] = useState('');
    const [Shortbio, setShortbio] = useState('');
    const [LoadingSubCat, setLoadingSubCat] = useState(true);
    const handleEditorChange = (content) => {
        setFullDesc(content);

    };
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const notify = (T) => toast(T, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const handleChangeVType = (event) => {
        setVType(event.target.value);
    };
    const handleChangeVState = (event) => {
        setCurrentState(event.target.value);
    };
    const handleChangeCerti = (event) => {
        setWithcertificate(event.target.value);
    };


    const UpdateProfile = async (e) => {
        let UploadFilename = document.querySelector('#UploadFilename').value
        e.preventDefault();
        if (FullName !== '' && Category !== '' && SubCategory !== '' && Shortbio !== '' && VType !== '' && FullDesc !== '' && ContactMobile !== '' && ContactEmail !== '' && WhatsApp !== '' && FullAddress !== '' && CurrentState !== '' && GoogleMapLink !== '' && Latitude !== '' && Longitude !== '') {
            setBtnloading(true)

            const sendUM = {
                JwtToken: Contextdata.VendorJwtToken,
                name: FullName,
                dp: UploadFilename,
                Mobile: ContactMobile,
                WhatsApp: WhatsApp,
                MainCat: Category,
                Subcat: SubCategory,

                VType: VType,
                Email: ContactEmail,
                Pincode: Pincode,
                State: CurrentState,

                FullAddress: FullAddress,
                City: City,
                GoogleMapLink: GoogleMapLink,
                Latitude: Contextdata.LocationData.lat,
                Longitude: Contextdata.LocationData.lng,
                FullDesc: FullDesc,
                Shortbio: Shortbio,

            }
            const data = await fetch("/api/Vendor/UpdateProfileData", {
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
                        notify('Profile Updated Successfully')
                        setTimeout(function () {
                            setBtnloading(false)
                            router.push('/Vendor/ProfileSettings')
                        }, 2000);

                    } else {
                        setBtnloading(false)
                        alert('Something went wrong')
                    }

                })

        } else {
            alert('Please Fill All Required Fields');
        }

    }

    const GetCatlist = async () => {
        const dataid = '08c5th4rh86ht57h6g';
        const sendUM = { dataid }
        const data = await fetch("/api/V3/List/MainCatListAll", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.MainCatList)
                setCatListdata(parsed.ReqD.MainCatList)


            })
    }

    const Subcatlist = async (e) => {

        setLoadingSubCat(true)

        const sendUM = { MainCat: e }
        const data = await fetch("/api/V3/List/SubCategoriesList", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                if (parsed.ReqD.MainCatList) {
                    setLoadingSubCat(false)
                    setSubCatListdata(parsed.ReqD.MainCatList)
                }


            })
    }


    useEffect(() => {
        console.log(Contextdata.VendorData.VendorData)
        setFullName(Contextdata.VendorData.name)
        setUserDp(Contextdata.VendorData.dp)
        setCategory(Contextdata.VendorData.VendorData[0].MainCat);
        setSubCategory(Contextdata.VendorData.VendorData[0].Subcat);
        setVType(Contextdata.VendorData.VendorData[0].VType);
        setWhatsApp(Contextdata.VendorData.VendorData[0].WhatsApp);
        setContactMobile(Contextdata.VendorData.VendorData[0].Mobile);
        setContactEmail(Contextdata.VendorData.VendorData[0].Email);

        setFullAddress(Contextdata.VendorData.VendorData[0].FullAddress);
        setCity(Contextdata.VendorData.VendorData[0].City);
        setPincode(Contextdata.VendorData.VendorData[0].Pincode);
        setVType(Contextdata.VendorData.VendorData[0].VType);
        setCurrentState(Contextdata.VendorData.VendorData[0].State);
        GetCatlist()
        Subcatlist(Contextdata.VendorData.VendorData[0].MainCat)

        setLatitude(Contextdata.VendorData.VendorData[0].Latitude);
        setLongitude(Contextdata.VendorData.VendorData[0].Longitude);
        setShortbio(Contextdata.VendorData.VendorData[0].Shortbio);
        setFullDesc(Contextdata.VendorData.VendorData[0].FullDesc);
        setGoogleMapLink(Contextdata.VendorData.VendorData[0].GoogleMapLink);


    }, [])

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
        Subcatlist(event.target.value)
    };


    const handleChangeSubCategory = (event) => {
        setSubCategory(event.target.value);
    };


    const editorStyle = {
        height: '300px', // Set the desired height

    };




    return (
        <div>

            <ToastContainer
                position="bottom-center"
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

                <div className={Mstyles.VDFlexboxtwo}>
                    <div className={Mstyles.Upladdpboxv}>
                        <UploadVdp />
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
                                <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Category}
                                        label="Select Category"
                                        onChange={handleChangeCategory}
                                    >
                                        {CatListdata.map((item) => {
                                            return <MenuItem value={item.slug}>{item.title}</MenuItem>


                                        }

                                        )}



                                    </Select>
                                </FormControl>
                            </div>

                            {Category !== '' &&

                                <div>
                                    {LoadingSubCat &&
                                        <div>
                                            <Skeleton variant="rounded" width='100%' height={60} />

                                        </div>
                                    }
                                    {!LoadingSubCat &&
                                        <FormControl fullWidth required>
                                            <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={SubCategory}
                                                label="Sub Category"

                                                onChange={handleChangeSubCategory}
                                            >

                                                {SubCatListdata.map((item) => {
                                                    return <MenuItem value={item.slug}>{item.title}</MenuItem>


                                                }

                                                )}



                                            </Select>

                                        </FormControl>
                                    }


                                </div>



                            }

                            <div className={Mstyles.inputlogin}>
                                <TextField
                                    required
                                    label="Short bio"
                                    fullWidth
                                    value={Shortbio}

                                    onInput={e => setShortbio(e.target.value)}

                                />
                            </div>

                            <div className={Mstyles.inputlogin}>
                                <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-label">Profile Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={VType}
                                        label="Profile Type"
                                        onChange={handleChangeVType}
                                    >
                                        <MenuItem value={'Freelancer'}>Freelancer</MenuItem>
                                        <MenuItem value={'Business'}>Business</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>



                            <div className={Mstyles.inputlogin}>
                                <div>
                                    <ReactQuill
                                        theme="snow" // You can change the theme as per your preference
                                        value={FullDesc}
                                        onChange={handleEditorChange}
                                        style={editorStyle}
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
                                label="Contact Number"
                                fullWidth
                                value={ContactMobile}

                                onInput={e => setContactMobile(e.target.value)}

                            />
                        </div>
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
                                label="Contact Email"
                                fullWidth
                                value={ContactEmail}

                                onInput={e => setContactEmail(e.target.value)}

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
                                label="FullAddress"
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
                        <div className={Mstyles.inputlogin}>
                            <TextField
                                required
                                label="Google Map Link"
                                fullWidth
                                value={GoogleMapLink}
                                onInput={e => setGoogleMapLink(e.target.value)}

                            />
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

        </div>
    );
}