import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'
import Head from 'next/head';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FiMapPin } from "react-icons/fi";
import Skeleton from '@mui/material/Skeleton';

import { LuXCircle } from "react-icons/lu";
import { LuShoppingBag, LuSearch, LuChevronRight, LuArrowLeft, LuMinus, LuPlus } from "react-icons/lu";
import Mstyles from '/Styles/mainstyle.module.css'

import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';
import IconButton from '@mui/material/IconButton';

import Slide from '@mui/material/Slide';

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
    const [Query, setQuery] = useState('');

    useEffect(() => {
        setShowData(true)
    }, [Contextdata.LocationData]);

    return (
        <div>
            {ShowData && 
            <div className={Mstyles.Vendorgrid}>

            {MData.map((item, index) => {
                return <div key={index}  onClick={() => router.push(`/v/${item.VendorData.username}`)}>
                    <div style={{ height: '100%' }}
                        className="gtm-tracking-impression app-ec-item vendorTile vendorTile--mosaic app-catalog-list-vendor app-vendor-tile app-vendor-tile-common app-internal-tracking-item gtm-tracking-impression "

                    >
                        <div
                            className="vendorTileGallery vendorTileGallery--mosaic "

                        >
                            <div className={Mstyles.VendorFimg}>
                                <Image
                                    src={`${MediaFilesUrl}${MediaFilesFolder}/${item.VendorData.VendorData[0].Featureimg}`}
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
                            <span className="vendorTag  vendorTag--premium">Treding</span>


                        </div>
                        <div className="vendorTile__content">
                            <div>

                                <div
                                    className="vendorTile__title  app-vendor-tile-link"

                                >

                                    {<span>{item.VendorData.name.slice(0, 35)}</span>}
                                </div>
                            </div>

                            <div className="vendorTileFooter  vendorTileFooter--mosaic">
                                <div className="vendorTileFooter__content">
                                    <div className="vendorTileFooter__deals">
                                        <span className="vendorTileFooter__dealsContent ">
                                            <i className="svgIcon svgIcon__promosTag vendorTile__icon">
                                                <Image src='/icons/map-color-icon.svg' height={50} width={50} blurDataURL={blurredImageData}
                                                    placeholder='blur' />
                                            </i>{" "}
                                            {item.VendorData.VendorData[0].City}{" "}
                                            <span className="vendorTileFooter__discount">
                                                {Math.round(item.Distance)}
                                                <span className="dd">KM</span>
                                            </span>
                                        </span>
                                    </div>

                                    <div className="vendorTileFooter__info vendorTileFooter__price">
                                        <i className="svgIcon svgIcon__menus-price vendorTile__icon">

                                            <svg viewBox="0 0 32 23">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16 15.46A9.412 9.412 0 000 22.18c0 .414.336.75.75.75h30.5a.75.75 0 00.75-.75 9.412 9.412 0 00-16-6.721zm-.163 2.104c.048.089.094.179.14.27l.023-.036a7.866 7.866 0 011.289 3.634H1.535a7.913 7.913 0 0114.302-3.868zm2.957 3.867a9.362 9.362 0 00-1.808-4.837 7.913 7.913 0 0113.479 4.838H18.794zM15.192 6.04a5.868 5.868 0 10-11.737 0 5.868 5.868 0 0011.737 0zm-10.237 0a4.369 4.369 0 118.737 0 4.369 4.369 0 01-8.737 0zM22.5.17a5.868 5.868 0 110 11.737A5.868 5.868 0 0122.5.17zm0 1.5a4.369 4.369 0 100 8.737 4.369 4.369 0 000-8.737z"
                                                />
                                            </svg>
                                        </i>
                                        {item.MainCat.title} , {item.SubCat.title}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            }

            )}
        </div>
            
            }
            
        </div>
    )
}

export default Vendorlistitem
