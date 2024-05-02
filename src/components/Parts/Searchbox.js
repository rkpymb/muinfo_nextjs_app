import React, { useState, useEffect, useContext } from 'react';
import CheckloginContext from '/context/auth/CheckloginContext'
import { useRouter, useParams } from 'next/router'

import Dialog from '@mui/material/Dialog';


import { LuXCircle, LuSearch, LuChevronRight, LuArrowLeft, LuMinus, } from "react-icons/lu";
import Mstyles from '/Styles/mainstyle.module.css'

import { MediaFilesUrl, MediaFilesFolder, FeedimgFolder, DomainURL } from '/Data/config';
import IconButton from '@mui/material/IconButton';

import Slide from '@mui/material/Slide';

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

    setLoading(true)

    const sendUM = {

      SearchQuery: SQ,
      page: 1,
      limit: 1,

    }
    const data = await fetch("/api/user/search_post", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed.ReqData.ListData)
        setResults(parsed.ReqData.ListData)
        setLoading(false)
      })
  }
  const descriptionElementRef = React.useRef(null);

  return (
    <div>
      {SType == 1 &&
        <div >

          <IconButton
            onClick={handleClickOpen}
            aria-label="toggle password visibility"
            style={{ width: 40, height: 40, }}
          >
            <LuSearch size={20} />
          </IconButton>
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
                <span>Search Post</span>
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
            <div className={Mstyles.SearchBoxmain}>
              <input
                type='text'
                placeholder='start typing to search posts'
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

                <div className={Mstyles.SearchGrid} style={{ marginTop: 10 }}>
                  {Results.map((item, index) => {
                    return <div key={index} onClick={() => router.push(`${DomainURL}p/${item.PostData.PostID}`)}>
                      <div className={Mstyles.SearchItem}>
                        <div className={Mstyles.SearchItemA}>
                          <div className={Mstyles.SearchContent}>
                            <div dangerouslySetInnerHTML={{ __html: item.PostData.PostText.slice(0, 200) }} />
                            <div className={Mstyles.Dateboxsearch} >
                              <span>{item.PostData.date}</span>
                            </div>
                          </div>

                        </div>
                        <div className={Mstyles.SearchItemB}>
                          <IconButton
                           
                            aria-label="toggle password visibility"
                            style={{ width: 30, height: 30, }}
                          >
                            <LuChevronRight />
                          </IconButton>
                        </div>

                      </div>
                    </div>
                  }

                  )}

                </div>



                <div style={{ minHeight: '25vh' }}></div>

              </div>


            </div>

          </div>


        </div>
      </Dialog >

    </div >
  )
};

export default Demo;
