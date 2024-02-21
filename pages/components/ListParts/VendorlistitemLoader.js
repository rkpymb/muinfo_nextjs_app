import React, { useState, useEffect, useContext } from 'react';

import { useRouter, useParams } from 'next/router'
import Image from 'next/image';
import Mstyles from '/Styles/mainstyle.module.css'

import Skeleton from '@mui/material/Skeleton';

const Vendorlistitem = () => {
    const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

    const router = useRouter()

    const Dummydta = [
        {
            id: 1
        },
        {
            id: 2
        }
        ,
        {
            id: 3
        }
        ,
        {
            id: 4
        }
        ,
        {
            id: 5
        },
        {
            id: 4
        }
        ,
        {
            id: 5
        }
    ]

    return (
        <div>
            <div className={Mstyles.Vendorgrid}>

                {Dummydta.map((item, index) => {
                    return <div key={index}>
                        <div style={{ height: '100%' }}
                            className="gtm-tracking-impression app-ec-item vendorTile vendorTile--mosaic app-catalog-list-vendor app-vendor-tile app-vendor-tile-common app-internal-tracking-item gtm-tracking-impression "

                        >
                            <div
                                className="vendorTileGallery vendorTileGallery--mosaic "

                            >
                                <div className={Mstyles.VendorFimg}>
                                <Image
                                        src={`/img/placehoderimg.jpg`}
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



                            </div>
                            <div className="vendorTile__content">
                                <div>

                                    <div
                                        className="vendorTile__title  app-vendor-tile-link"

                                    >
                                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: 150 }} />
                                    </div>
                                </div>

                                <div className="vendorTileFooter  vendorTileFooter--mosaic">
                                    <div className="vendorTileFooter__content">
                                        <div className="vendorTileFooter__deals">
                                            <span className="vendorTileFooter__dealsContent ">
                                                <Skeleton variant="text" sx={{ fontSize: '0.5rem' , width: 50}} />
                                            </span>
                                        </div>

                                        
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                }

                )}
            </div>
        </div>
    )
}

export default Vendorlistitem
