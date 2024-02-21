import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'
import Head from 'next/head';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FiMapPin } from "react-icons/fi";
import Skeleton from '@mui/material/Skeleton';
import VendorItem from '../../../pages/components/ListParts/VendorItem'

import { LuXCircle } from "react-icons/lu";
import { LuMapPin, LuSearch, LuChevronRight, LuArrowLeft, LuMinus, LuPlus } from "react-icons/lu";
import Mstyles from '/Styles/mainstyle.module.css'

import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder } from '/Data/config';
import IconButton from '@mui/material/IconButton';

import Slide from '@mui/material/Slide';
import LocationboxMain from '../../../src/components/Parts/LocationboxMain'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Demo = ({ SType }) => {
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';

  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [OpenEdit, setOpenEdit] = React.useState(false);
  const [LocationvoxShow, setLocationvoxShow] = React.useState(false);
  const [LocationText, setLocationtext] = useState('Set location');
  const [Results, setResults] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [show, setShow] = useState(false)
  const [Query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 1) {
      SearchProduct(e.target.value)
    }
  };

  useEffect(() => {

    if (Contextdata.LocationDone) {
      setLocationtext(Contextdata.LocationData.address)
      console.log(Contextdata.LocationData)

    } else {

    }
  }, [Contextdata.LocationData]);

  useEffect(() => {
    if (Contextdata.Searchbox == true) {
      setOpenEdit(true)

    } else {
      setOpenEdit(false)
    }

  }, [Contextdata.Searchbox]);



  const handleClickOpen = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };


  const SearchProduct = async (SQ) => {
    console.log(Contextdata.LocationData)
    setLoading(true)

    const sendUM = {
      JwtToken: Contextdata.UserJwtToken,
      SearchQuery: SQ,
      Latitude: Contextdata.LocationData.lat,
      Longitude: Contextdata.LocationData.lng,
      MaxDistance: Contextdata.MapRadius
    }
    const data = await fetch("/api/Search/UserMainSearch", {
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
        setResults(parsed.ReqD.ListData)
        setLoading(false)
      })
  }
  const descriptionElementRef = React.useRef(null);

  return (
    <div>
      {SType == 1 &&
        <div onClick={handleClickOpen}>

          <div className={Mstyles.SRBoxGid}>
            <div className={Mstyles.SRBoxItem}>
              <div className={Mstyles.SRBoxItemA}>
                <LuSearch />

              </div>
              <div className={Mstyles.SRBoxItemB}>
                <span
                  className="Searchboxplaceholder"

                >
                  Search for Vanue, Singer, Cameraman
                </span>

              </div>

            </div>
          </div>

          <div className={Mstyles.SRBoxItemLocation}><LuMapPin /> {LocationText}</div>
        </div>
      }


      <Dialog
        fullScreen
        open={OpenEdit}
        onClose={handleCloseEdit}
        TransitionComponent={Transition}
      >
        <div className={Mstyles.LocationBoxHeadertwoMainBox}>
          <div className={Mstyles.LocationBoxHeadertwoMain}>
            <div className={Mstyles.LocationBoxHeadertwo}>
              <div className={Mstyles.LocationBoxHeaderA}>
                <span>Search</span>
              </div>
              <div className={Mstyles.LocationBoxHeaderB}>
                <IconButton
                  onClick={handleCloseEdit}
                  aria-label="toggle password visibility"
                  style={{ width: 40, height: 40, }}
                >
                  <LuXCircle />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <div className={Mstyles.SearchnavbarBox}>
          <div className={Mstyles.SearchBox}>
            <div className={Mstyles.SearchBoxA}>
              <LocationboxMain ShowType={1} />
            </div>
            <div className={Mstyles.SearchBoxmain}>

              <input
                type='text'
                placeholder='Search Vendors, Freelancers and Professionals'
                autoFocus
                value={Query}
                onChange={handleInputChange}

              />
              <IconButton aria-label="cart">
                <LuSearch />
              </IconButton>

            </div>
          </div>
        </div>

        <div>
          <div>

            <div>

              <div className={Mstyles.SearchlistBox}>
                {Query !== '' &&
                  <div style={{ margin: 20 }}>
                    <div style={{ fontWeight: 600 }}>Showing results for "{Query}"</div>
                    <div style={{ minHeight: '10px' }}></div>
                  </div>

                }
                <div className={Mstyles.VendorGrid}>
                  {Results.map((item, index) => {
                    return <div key={index} onClick={() => router.push(`/v/${item.VendorData.username}`)}>
                      <VendorItem MData={item} />
                    </div>
                  }

                  )}

                </div>



                <div style={{ minHeight: '25vh' }}></div>

              </div>


            </div>

          </div>


        </div>
      </Dialog>

    </div>
  )
};

export default Demo;
