import React, { useState, useEffect, useContext } from 'react';
import Skeleton from '@mui/material/Skeleton';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { FiChevronRight, FiEdit } from 'react-icons/fi';
import Input from '@mui/material/Input';
import { LuClapperboard, LuFileImage, LuUserCog2, LuStar, LuListTodo, LuHeart } from "react-icons/lu";

const ariaLabel = { 'aria-label': 'description' };

import Image from 'next/image';
import { LuCopy } from "react-icons/lu";
import { CiVideoOn, CiImageOn } from "react-icons/ci";
import IconButton from '@mui/material/IconButton';
import PostBox from '/src/components/Vendors/PostBox'
import AddPhotos from '/src/components/Vendors/AddPhotos'
import FeedlistV from '/src/components/Vendors/FeedlistV'
import VGalarylist from '/src/components/Vendors/VGalarylist'
import VReviewslist from '/src/components/Vendors/VReviewslist'
import VFollowerslist from '/src/components/Vendors/VFollowerslist'
import RFQFeedlist from '/src/components/Vendors/RFQFeedlist'
import Avatar from '@mui/material/Avatar';
import CheckloginContext from '/context/auth/CheckloginContext'
import VendorDBNavbar from '/src/components/Parts/Navbar/VendorDBNavbar'
import ClickCopyText from '/src/components/Parts/ClickCopyText'


import Mstyles from '/Styles/mainstyle.module.css'

import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { MediaFilesUrl, MediaFilesFolder, DomainURL } from '/Data/config'
import { useRouter, useParams } from 'next/router'

import VerifiedBadge from '/src/components/Vendors/VerifiedBadge'


function Overview() {
  const router = useRouter()
  const [Filename, setFilename] = useState('Fukrey3');
  const [Loading, setLoading] = useState(true);
  const [Tabindex, setTabindex] = useState(0);
  const Contextdata = useContext(CheckloginContext)
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const notify = (T) => toast(T, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  useEffect(() => {
    console.log(Contextdata.VendorData)
    CheckUSerLogin()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (Contextdata.VendorLogin) {
      setLoading(false);
      Contextdata.ChangeMainLoader(false)
    }
    const { Tabindex: urlTabindex } = router.query;
    if (urlTabindex !== undefined) {
      setTabindex(parseInt(urlTabindex));
    }
  }, [Contextdata.VendorLogin]);

  const CheckUSerLogin = async () => {
    if (localStorage.getItem('Token')) {
    } else {
      router.push('/Vendor/VendorLogin')
    }
  }


  const Switchtab = async (e) => {
    setTabindex(e)
    window.scrollTo(1, 0)

  }

  return (

    <>
      <Head>
        <title>Flair My Event : Dashboard</title>
      </Head>


      {!Loading &&


        <div>
          <VendorDBNavbar />
          <div>
            <div className={Mstyles.VendorHeadeBoxbgimg}>
              <div className={Mstyles.VendorHeadeBoxbgimgCover}>
                <div style={{ height: '15px' }}></div>
                <div className={Mstyles.VDTopbox}>

                  <div className={Mstyles.VDTopboxA}>
                    {Loading ?
                      <div>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20%' }} />
                      </div> :
                      <div>
                        <div className={Mstyles.Namebox}>
                          <div className={Mstyles.NameboxA}>
                            <span>{Contextdata.VendorData.name}</span>
                          </div>
                          <div className={Mstyles.NameboxB}>
                            <VerifiedBadge VData={Contextdata.VendorData} />

                          </div>
                        </div>





                        <div className={Mstyles.UserNameBox}>
                          <div className={Mstyles.UserNameBoxTextItem}>
                            <small>{DomainURL}v/{Contextdata.VendorData.username}</small>
                            <ClickCopyText CopyData={`${DomainURL}v/${Contextdata.VendorData.username}`} />
                          </div>

                        </div>
                      </div>

                    }
                  </div>
                  <div className={Mstyles.VDTopboxB}>

                    {Loading ?
                      <div>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20%' }} />
                      </div> :
                      <div className={Mstyles.VCounter}>
                        <div className={Mstyles.VCounterItem}>
                          <div className={Mstyles.VCounterItemA}>
                            <span>120K</span>
                          </div>
                          <div className={Mstyles.VCounterItemB}>
                            <span>Followers</span>

                          </div>

                        </div>
                        <div className={Mstyles.VCounterItem}>
                          <div className={Mstyles.VCounterItemA}>
                            <span>10K</span>
                          </div>
                          <div className={Mstyles.VCounterItemB}>
                            <span>Reviews</span>

                          </div>

                        </div>
                        <div className={Mstyles.VCounterItem}>
                          <div className={Mstyles.VCounterItemA}>
                            <span>320K</span>
                          </div>
                          <div className={Mstyles.VCounterItemB}>
                            <span>Profile visits</span>

                          </div>

                        </div>
                        <div className={Mstyles.VCounterItem}>
                          <div className={Mstyles.VCounterItemA}>
                            <span>5K</span>
                          </div>
                          <div className={Mstyles.VCounterItemB}>
                            <span>Bookings</span>

                          </div>

                        </div>
                        <div className={Mstyles.VCounterItem}>
                          <div className={Mstyles.VCounterItemA}>
                            <span>15K</span>
                          </div>
                          <div className={Mstyles.VCounterItemB}>
                            <span>Enquries</span>

                          </div>

                        </div>

                      </div>

                    }
                  </div>

                </div>
                <div style={{ height: '15px' }}></div>
              </div>
            </div>


            <div style={{ height: '15px' }}></div>

            <div className={Mstyles.Vcontainer}>
              <div className={Mstyles.VPboxContainer}>
                <div className={Mstyles.VPboxA}>
                  <div className={Mstyles.VPboxAMenuBox}>

                    <div className={Mstyles.VPboxAMenuItemBox}>
                      <div className={Tabindex == 0 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(0)}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                          <div className={Mstyles.DbIcon}>
                            <LuListTodo size={20} />

                          </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                          <span>RFQ Enquries</span>
                        </div>
                      </div>
                      <div className={Tabindex == 1 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(1)}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                          <div className={Mstyles.DbIcon}>
                            <LuClapperboard size={20} />

                          </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                          <span>Feeds</span>
                        </div>
                      </div>
                      <div className={Tabindex == 2 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(2)}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                          <div className={Mstyles.DbIcon}>
                            <LuFileImage size={20} />

                          </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                          <span> My Gallery</span>
                        </div>
                      </div>

                      <div className={Tabindex == 3 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(3)}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                          <div className={Mstyles.DbIcon}>
                            <LuStar size={20} />

                          </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                          <span> Reviews</span>
                        </div>
                      </div>
                      <div className={Tabindex == 4 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(4)}>
                        <div className={Mstyles.VPboxAMenuItemA}>

                          <div className={Mstyles.DbIcon}>
                            <LuHeart size={20} />

                          </div>
                        </div>
                        <div className={Mstyles.VPboxAMenuItemB}>
                          <span>Followers</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
                <div className={Mstyles.VPboxB}>
                  {Tabindex == 0 &&

                    <div className={Mstyles.VTabItem}>
                      <div className={Mstyles.VendorAsideboxmain}>
                        <RFQFeedlist />
                      </div>
                    </div>

                  }
                  {Tabindex == 1 &&

                    <div className={Mstyles.VTabItem}>
                      <div className={Mstyles.PostBoxV}>
                        <PostBox />
                      </div>
                      <div style={{ height: '50px' }}></div>
                      <div className={Mstyles.VTabItemVFeedlist}>

                        <FeedlistV />


                      </div>


                    </div>

                  }
                  {Tabindex == 2 &&

                    <div className={Mstyles.VTabItem}>

                      <div className={Mstyles.PostBoxV}>
                        <AddPhotos />
                      </div>

                      <div className={Mstyles.Galaerybox}>
                        <VGalarylist />

                      </div>



                    </div>

                  }
                  {Tabindex == 3 &&

                    <div className={Mstyles.VTabItem}>
                      <div className={Mstyles.VendorAsideboxmain}>
                        <VReviewslist />

                      </div>


                    </div>
                  }
                  {Tabindex == 4 &&

                    <div className={Mstyles.VTabItem}>
                      <div className={Mstyles.VendorAsideboxmain}>
                        <VFollowerslist />
                      </div>


                    </div>
                  }




                </div>
              </div>
            </div>










          </div>


          <div className={Mstyles.VMFooter}>
            <div className={Mstyles.VPboxAMenuBox}>

              <div className={Mstyles.VPboxAMenuItemBox}>
                <div className={Tabindex == 0 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(0)}>
                  <div className={Mstyles.VPboxAMenuItemA}>

                    <div className={Mstyles.DbIcon}>
                      <LuListTodo size={20} />

                    </div>
                  </div>
                  <div className={Mstyles.VPboxAMenuItemB}>
                    <span>RFQ Feeds</span>
                  </div>
                </div>
                <div className={Tabindex == 1 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(1)}>
                  <div className={Mstyles.VPboxAMenuItemA}>

                    <div className={Mstyles.DbIcon}>
                      <LuClapperboard size={20} />

                    </div>
                  </div>
                  <div className={Mstyles.VPboxAMenuItemB}>
                    <span> My Feed</span>
                  </div>
                </div>
                <div className={Tabindex == 2 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(2)}>
                  <div className={Mstyles.VPboxAMenuItemA}>

                    <div className={Mstyles.DbIcon}>
                      <LuFileImage size={20} />

                    </div>
                  </div>
                  <div className={Mstyles.VPboxAMenuItemB}>
                    <span> My Gallery</span>
                  </div>
                </div>

                <div className={Tabindex == 3 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(3)}>
                  <div className={Mstyles.VPboxAMenuItemA}>

                    <div className={Mstyles.DbIcon}>
                      <LuStar size={20} />

                    </div>
                  </div>
                  <div className={Mstyles.VPboxAMenuItemB}>
                    <span> Reviews</span>
                  </div>
                </div>
                <div className={Tabindex == 4 ? Mstyles.VPboxAMenuItemActive : Mstyles.VPboxAMenuItem} onClick={() => Switchtab(4)}>
                  <div className={Mstyles.VPboxAMenuItemA}>

                    <div className={Mstyles.DbIcon}>
                      <LuHeart size={20} />

                    </div>
                  </div>
                  <div className={Mstyles.VPboxAMenuItemB}>
                    <span>Followers</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      }

    </>

  );
}

export default Overview;

