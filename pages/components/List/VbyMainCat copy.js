import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import CheckloginContext from '/context/auth/CheckloginContext'
import Skeleton from '@mui/material/Skeleton';
import Mstyles from '/Styles/mainstyle.module.css'
import VendorItem from '../ListParts/VendorItem'
import Nothingfound from '/src/components/Parts/Nothingfound'


function RecentOrders({ Catdata }) {
    const Contextdata = useContext(CheckloginContext)
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    
    const GetSliders = async () => {
        const sendUM = {
            Latitude: Contextdata.LocationData.lat,
            Longitude: Contextdata.LocationData.lng,
            MaxDistance: Contextdata.MapRadius,
            slug: Catdata.slug

        }
        const data = await fetch("/api/V3/List/VbyMainCat", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                console.log(parsed.ReqD.ListData)
                setRetdata(parsed.ReqD.ListData)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        GetSliders()
    }, [router.query])
    return (<div>
        {isLoading ?
            <div>
                <h1>Loading..</h1>
            </div> :
            <div>
                <div style={{ height: '20px' }}></div>
                {Retdata.length > 0 ?

                    <div className={Mstyles.VendorMaingrid}>
                        {Retdata.map((item, index) => {
                            return <div key={index} onClick={() => router.push(`/v/${item.VendorData.username}`)}>
                                {item.username}
                                <VendorItem MData={item} />

                            </div>



                        }

                        )}
                    </div> :
                    <Nothingfound Title={`Nothing Found in this Catgeory`} DescData={`We are adding stuf to this category stay tuned 😊`} />
                }
            </div>

        }

    </div>
    );
}

export default RecentOrders;
