import React, { useState, useEffect, useContext, useCallback } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext';
import { useRouter, useParams } from 'next/router';
import Dialog from '@mui/material/Dialog';
import { FiMapPin } from "react-icons/fi";
import { LuXCircle } from "react-icons/lu";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import MapData from './MapData'
import { GoogleMapsAPI } from '/Data/config';
import Mstyles from '/Styles/mainstyle.module.css';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';

import Skeleton from '@mui/material/Skeleton';
import Slide from '@mui/material/Slide';
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

setDefaults({
  key: GoogleMapsAPI, // Your API key here.
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
});
const containerStyle = {
  width: '100%',
  height: '100%'
};

const LocationboxMain = ({ ShowType }) => {
  const router = useRouter();
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const Contextdata = useContext(CheckloginContext);
  const [OpenEdit, setOpenEdit] = React.useState(false);
  const [Locationtext, setLocationtext] = useState('Set location');
  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(150000);
  const [maxDistance, setMaxDistance] = useState(1000000);
  const [inputValue, setInputValue] = useState('');
  const [ChangeMap, setChangeMap] = useState(false);


  useEffect(() => {
    setChangeMap(false)
    if (Contextdata.LocationData) {

      console.log('Contextdata.LocationData is available')
      const latitude = Contextdata.LocationData.lat
      const longitude = Contextdata.LocationData.lng
      setRadius(Contextdata.MapRadius)
      setInputValue(Contextdata.LocationData.address);
      setLocationtext(Contextdata.LocationData.address)
      setUserLocation({ lat: latitude, lng: longitude });
      setChangeMap(true)
    } else {
      console.log('Contextdata.LocationData not available')
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            MakeData(latitude, longitude)
          },
          error => {
            console.log('Error getting user location:', error);
            setOpenEdit(true);
          }
        );
      } else {
        setOpenEdit(true);
        console.log('Geolocation is not supported by this browser.');
      }
    }
  }, [Contextdata.LocationData, router.query]);


  const handleClickOpen = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e);
  };

  const handleSelect = async (address) => {
    try {
      setChangeMap(false)
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setInputValue(address);
      setChangeMap(true)

      console.log(address);
      const latitude = latLng.lat;
      const longitude = latLng.lng;
      setUserLocation({ lat: latitude, lng: longitude });
      const addressComponents = results[0].address_components;
      let city = '';
      let state = '';
      let pincode = '';

      addressComponents.forEach(component => {
        if (component.types.includes('locality')) {
          city = component.long_name;
        } else if (component.types.includes('administrative_area_level_1')) {
          state = component.long_name;
        } else if (component.types.includes('postal_code')) {
          pincode = component.long_name;
        }
      });

      console.log('City:', city);
      console.log('State:', state);
      console.log('Pincode:', pincode);


      const SeLocData = {
        address: address,
        city: city,
        state: state,
        pincode: pincode,
        lat: latitude,
        lng: longitude,
      }

      Contextdata.ChangeLocationData(SeLocData);
      const LocationData = JSON.stringify(SeLocData, null, 2);
      localStorage.setItem('LocationData', LocationData);
      localStorage.setItem('Radius', radius);
      Contextdata.ChangeAlertData('📍Location updated Sucsesfull', 'success')
      // You can set the state or do whatever you want with city, state, and pincode here
    } catch (error) {
      Contextdata.ChangeAlertData('unable to update your location, try again 😒', 'warning')
      console.error('Error selecting location:', error);
    }
  };


  const handleRadiusChange = (value) => {
    setRadius(value);
    Contextdata.ChangeMapRadius(value);
  };

  const convertMetersToKilometers = (meters) => {
    return meters / 1000;
  };


  const MakeData = async (latitude, longitude) => {
    console.log('Making Data')
    setUserLocation({ lat: latitude, lng: longitude });
    fromLatLng(latitude, longitude).then(
      response => {
        const address = response.results[0].formatted_address;
        // Extract city, state, pincode from the address
        const components = response.results[0].address_components;
        let city = '';
        let state = '';
        let pincode = '';
        components.forEach(component => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          } else if (component.types.includes('postal_code')) {
            pincode = component.long_name;
          }
        });
        setInputValue(address)

        const SeLocData = {
          address: address,
          city: city,
          state: state,
          pincode: pincode,
          lat: latitude,
          lng: longitude,
        }
        Contextdata.ChangeLocationData(SeLocData);
        const LocationData = JSON.stringify(SeLocData, null, 2);
        localStorage.setItem('LocationData', LocationData);
        localStorage.setItem('Radius', radius);
        setChangeMap(true)
      },
      error => {
        console.error('Error fetching address:', error);
      }
    );
  };

  return (
    <div>
      {ShowType == 1 &&
        <div className={Mstyles.PostAddonItem} onClick={handleClickOpen}>
          <div className={Mstyles.PostAddonItemA}>
            <Image
              src={`/img/google-maps.png`}
              alt="image"
              placeholder='blur'
              width={20}
              height={20}
              quality={100}
              blurDataURL={blurredImageData}
            />
          </div>
          <div className={Mstyles.PostAddonItemB}>
            <span>Location</span>
            <div style={{ height: '5px' }}></div>
            <small>{Locationtext.length > 20 ? <small>{Locationtext.slice(0, 20)}...</small> : <small>{Locationtext}</small>} , {radius / 1000} km.</small>
          </div>
        </div>
      }
      {ShowType == 2 &&
        <div className={Mstyles.Locationbox} onClick={handleClickOpen}>
          <div className={Mstyles.LocationboxA}>
            <span> <FiMapPin /></span>
          </div>
          <div className={Mstyles.LocationboxB}>
            {Locationtext.length > 0 ?
              <div>
                <span>{Locationtext.length > 20 ? <span>{Locationtext.slice(0, 15)}...</span> : <span>{Locationtext}</span>}</span>
              </div> :
              <div>
                <Skeleton variant="text" sx={{ fontSize: '2rem', width: 100 }} />
              </div>
            }

          </div>
        </div>
      }
      <Dialog
        fullScreen
        open={OpenEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <div className={Mstyles.LocationBoxHeader}>
          <div className={Mstyles.LocationBoxHeaderA}>
            <span>Set Location</span>
          </div>
          <div className={Mstyles.LocationBoxHeaderB}>
            <IconButton
              onClick={handleCloseEdit}
              style={{ width: 40, height: 40 }}
            >
              <LuXCircle />
            </IconButton>
          </div>
        </div>
        <div className={Mstyles.LBoverlay}>
          <div className={Mstyles.OverlayContentBox}>
            <PlacesAutocomplete
              value={inputValue}
              onChange={handleInputChange}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input  {...getInputProps({ placeholder: 'Enter City Name' })} />
                  <div>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      return (
                        <div key={index} className={suggestion.active ? Mstyles.LocationItemActive : Mstyles.LocationItem} {...getSuggestionItemProps(suggestion)}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <input
              type="range"
              min="5"
              max={maxDistance}
              value={radius}
              onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
            />

            <p style={{ textAlign: 'center' }}>Radius: {convertMetersToKilometers(radius)} kilometers</p>
          </div>
          <div className={Mstyles.LBoverlayContent}>
            {ChangeMap &&

              <MapData MapData={userLocation} />
            }

          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default LocationboxMain;
