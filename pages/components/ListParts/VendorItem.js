import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'
import Head from 'next/head';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FiMapPin } from "react-icons/fi";
import Skeleton from '@mui/material/Skeleton';

import { LuMapPin, LuCheckCheck } from "react-icons/lu";

import Mstyles from '/Styles/mainstyle.module.css'

import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';


const Vendorlistitem = ({ MData }) => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [OpenEdit, setOpenEdit] = React.useState(false);
    const [LocationvoxShow, setLocationvoxShow] = React.useState(false);
    const [LocationText, setLocationtext] = useState('Set location');
    const [Results, setResults] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [ShowData, setShowData] = useState(false)

    const [show, setShow] = useState(false)
    const [Query, setQuery] = useState('');

    useEffect(() => {
        setShowData(true)

    }, [Contextdata.LocationData]);

    return (
        <div>
            {ShowData &&

                <div className={Mstyles.VitemSliderItem}>
                    <div className={Mstyles.Vfimg}>
                        <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/${MData.VendorData.VendorData[0].Featureimg}`}
                            alt="image"
                            placeholder="blur"
                            blurDataURL={blurredImageData}
                            layout='responsive'
                            quality={100}
                            loading="lazy"
                            width={0}
                            height={0}
                        />

                    </div>

                    <div className={Mstyles.VitemSliderItemMiddlebox}>
                        <div className={Mstyles.ViNamebox}>
                            <span>{MData.VendorData.name.slice(0, 35)}</span>
                        </div>

                        <div>
                            <div style={{height:5}}></div>
                            <div className={Mstyles.VpTagbox}>
                                <div className={Mstyles.VpTagboxA}>
                                    <LuMapPin />
                                </div>
                                <div className={Mstyles.VpTagboxB} style={{fontSize:'12px'}}>
                                    {MData.VendorData.VendorData[0].City}
                                    <span className="acentColor"> {Math.round(MData.Distance)} KM</span>
                                </div>
                            </div>
                            <div className={Mstyles.VpTagbox}>
                                <div className={Mstyles.VpTagboxA}>
                                    <LuCheckCheck />
                                </div>
                                <div className={Mstyles.VpTagboxB} style={{fontSize:'12px'}}>
                                    {MData.VendorData.VendorData[0].VType} ,
                                    {MData.MainCat.title} {MData.MainCat.MainCat}
                                </div>
                            </div>
                        </div>
                        <div style={{ height: 20 }}></div>



                    </div>
                </div>
            }
        </div>
    )
}

export default Vendorlistitem
