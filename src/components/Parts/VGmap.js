import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'

import Skeleton from '@mui/material/Skeleton';
import GoogleMapReact from 'google-map-react';
import Mstyles from '/Styles/mainstyle.module.css'
import { IoIosPin } from "react-icons/io";

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});




const Demo = ({ VendorData }) => {
    const router = useRouter()

    const [lng, setLng] = useState('');
    const [lat, seLat] = useState('');
    const [Loading, setLoading] = useState(true);
   
    useEffect(() => {
        setLng(VendorData.location.coordinates[0])
        seLat(VendorData.location.coordinates[1])
        setLoading(false);

    }, []);

    const defaultProps = {
        center: {
            lat:lat ,
            lng: lng
        },
        zoom: 15
    };

   



    const AnyReactComponent = ({ text }) => <div ><IoIosPin size={35} style={{color:'red', }}/></div>;
    const descriptionElementRef = React.useRef(null);

    return (
        <div >
            {!Loading &&

                <div style={{ height: '50vh', width: '100%', marginTop:20 }}>
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
