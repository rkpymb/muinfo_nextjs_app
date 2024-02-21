import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'

import Skeleton from '@mui/material/Skeleton';
import GoogleMapReact from 'google-map-react';
import Mstyles from '/Styles/mainstyle.module.css'
import { IoIosPin } from "react-icons/io";

import Slide from '@mui/material/Slide';


const Demo = () => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext);

    const [lng, setLng] = useState('');
    const [lat, seLat] = useState('');
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        const latitude = Contextdata.LocationData.lat
        const longitude = Contextdata.LocationData.lng
        setLng(longitude)
        seLat(latitude)
        setLoading(false);
    }, [Contextdata.LocationData]);

    const defaultProps = {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 15
    };





    const AnyReactComponent = ({ text }) => <div ><IoIosPin size={35} style={{ color: 'red', }} /></div>;
    const descriptionElementRef = React.useRef(null);

    return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
            {!Loading &&

                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent
                            lat={lat}
                            lng={lng}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>


            }

        </div>
    )
};

export default Demo;
