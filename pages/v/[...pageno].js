import { useState, useEffect, useContext } from 'react';

import Avatar from '@mui/material/Avatar';

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Rating, RoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css';
import { LuMapPin,LuCheckCheck  } from "react-icons/lu";
import MobileFooter from '/src/components/Parts/Footers/MobileFooter'
import VGmap from '../../src/components/Parts/VGmap'
import IconButton from '@mui/material/IconButton';
import { MediaFilesUrl, FeedimgFolder, MediaFilesFolder } from '/Data/config'
import Mstyles from '/Styles/mainstyle.module.css'
import CheckloginContext from '/context/auth/CheckloginContext'
import VAllGalarylist from '../../src/components/Vendors/VAllGalarylist'
import Nothingfound from '/src/components/Parts/Nothingfound'

import LoginBox from '../../src/components/Parts/LoginBox'
import Head from 'next/head';
import FeedbyVendor from '../components/List/FeedbyVendor'
import VGalarylist from '../components/List/VGalarylist'
import VReviewslist from '../components/List/VReviewslist'
import Vfaqlist from '../components/List/Vfaqlist'
import MainNavBar from '/src/components/Parts/Navbar/MainNavBar'
import FollowBtn from '../../src/components/User/FollowBtn';
import { FaFacebookMessenger } from "react-icons/fa6";
import { useRouter, useParams } from 'next/router'
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
export async function getServerSideProps(context) {
  const username = context.query.pageno[0];
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, token: process.env.MYKEY })
  };
  const response = await fetch(`${process.env.API_URL}Openendpoint/VendorProfile`, requestOptions);
  const VData = await response.json();
  return {

    props: { VData }, // will be passed to the page component as props
  }

}

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9'
}

function Home({ VData }) {
  const Contextdata = useContext(CheckloginContext)

  const [Tabindex, setTabindex] = useState(1);
  const [LoadingBtn, setLoadingBtn] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [NotF, setNotF] = useState(false);
  const router = useRouter()
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > prevScrollPos) {
        setBackgroundColor('black'); // Niche scroll karne par background color black
      } else {
        setBackgroundColor('white'); // Upar scroll karne par background color white
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);


  useEffect(() => {


    if (VData.VendorList) {
      if (VData.VendorList.length == 1) {
        setLoading(false)



      }

    } else {

      setNotF(true)
    }

    Contextdata.ChangeMainLoader(false)
  });


  const ChangeTab = async (e) => {
    setTabindex(e)
  }



  return (
    <div>

      {!Loading && NotF == false &&

        <Head>
          <title>{VData && `${VData.VendorList[0].VD.name}`} </title>
          <meta name="description" content={VData && `${VData.VendorList[0].VD.VendorData[0].Shortbio}`} />
          <meta property="og:image" content={VData && `${MediaFilesUrl}${MediaFilesFolder}/${VData.VendorList[0].VD.VendorData[0].Featureimg}`} />

        </Head>

      }



      <MainNavBar />
      <div className={Mstyles.NavDevidevendor}></div>

      {/* <nav style={{ backgroundColor, padding: '10px', width: '100%', position: 'fixed', top: '0', zIndex: '1000' }}>
        sds
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav> */}
      <div className={Mstyles.OnlyDesktop}> <div style={{ height: '30px' }}></div></div>
      {!Loading && <div>



        <div className={Mstyles.VProfilebox}>

          <div className={Mstyles.VProfileboxA}>

            <div className={Mstyles.fadeinAnimation}>
              <div className={Mstyles.Paddding10}>
                <VAllGalarylist Vdata={VData.VendorList[0].VD} />

              </div>

            </div>

            <nav className={`${Mstyles.VPTopNav} ${Mstyles.VPTopNavA}`}>
              <div className={Mstyles.Vptop}>

                <div className={Mstyles.TopTitleBoxA}>

                  <div className={Mstyles.VmenuScroll}>

                    <div className={Tabindex === 1 ? Mstyles.VmenuScrollItemActive : Mstyles.VmenuScrollItem} onClick={() => ChangeTab(1)}>
                      About
                    </div>
                    <div className={Tabindex === 2 ? Mstyles.VmenuScrollItemActive : Mstyles.VmenuScrollItem} onClick={() => ChangeTab(2)}>
                      Feeds
                    </div>
                    <div className={Tabindex === 3 ? Mstyles.VmenuScrollItemActive : Mstyles.VmenuScrollItem} onClick={() => ChangeTab(3)}>
                      Gallery
                    </div>
                    <div className={Tabindex === 4 ? Mstyles.VmenuScrollItemActive : Mstyles.VmenuScrollItem} onClick={() => ChangeTab(4)}>
                      Reviews
                    </div>
                    <div className={Tabindex === 5 ? Mstyles.VmenuScrollItemActive : Mstyles.VmenuScrollItem} onClick={() => ChangeTab(5)}>
                      Map
                    </div>
                    <div className={Tabindex === 6 ? Mstyles.VmenuScrollItemActive : Mstyles.VmenuScrollItem} onClick={() => ChangeTab(6)}>
                      FAQs
                    </div>

                  </div>


                </div>

              </div>
            </nav>

            <div>

              {Tabindex === 1 &&

                <div className={Mstyles.Paddding10}>
                  <div className={Mstyles.MTitleboxLeft}>
                    <span>About {VData.VendorList[0].VD.name}</span>
                  </div>
                  <div>
                    <p>
                      {VData.VendorList[0].VD.VendorData[0].Shortbio}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: VData.VendorList[0].VD.VendorData[0].FullDesc }} />

                  </div>
                </div>


              }
              {Tabindex === 2 &&

                <div>

                  {Contextdata.UserLogin ?

                    <div>

                      <div className={Mstyles.MTitleboxLeft} style={{ textAlign: 'center' }}>
                        <span >{VData.VendorList[0].VD.name}'s Feeds</span>
                      </div>

                      <div className={Mstyles.VpFeedlist}>
                        <FeedbyVendor username={VData.VendorList[0].VD.username} />
                      </div>
                    </div> :
                    <LoginBox />

                  }


                </div>


              }
              {Tabindex === 3 &&

                <div>
                  {Contextdata.UserLogin ?

                    <div className={Mstyles.Paddding10} >

                      <div className={Mstyles.MTitleboxLeft}>
                        <span>{VData.VendorList[0].VD.name}'s Gallery</span>
                      </div>
                      <VGalarylist username={VData.VendorList[0].VD.username} />
                    </div> :
                    <LoginBox />

                  }


                </div>


              }
              {Tabindex === 4 &&

                <div>
                  {Contextdata.UserLogin ?

                    <div className={Mstyles.Paddding10}>
                      <div className={Mstyles.MTitleboxLeft}>
                        <span>{VData.VendorList[0].VD.name}'s Reviews</span>
                      </div>
                      <div>
                        <VReviewslist username={VData.VendorList[0].VD.username} />
                      </div>
                    </div> :
                    <LoginBox />

                  }


                </div>


              }
              {Tabindex === 5 &&

                <div className={Mstyles.Paddding10}>
                  <div className={Mstyles.MTitleboxLeft}>
                    <span>Map</span>
                  </div>
                  <div style={{ width: '100%', }}>
                    <VGmap VendorData={VData.VendorList[0].VD} />
                  </div>
                  <div style={{ height: '100px' }}></div>
                </div>

              }
              {Tabindex === 6 &&

                <div className={Mstyles.Paddding10}>
                  <div className={Mstyles.MTitleboxLeft}>
                    <span>Frequently Asked Questions</span>
                  </div>
                  <Vfaqlist username={VData.VendorList[0].VD.username} />
                </div>


              }

            </div>
          </div>
          <div className={Mstyles.VProfileboxB}>
            <aside className="storefrontHeadingWrap">
              <header
                className="storefrontHeading storefrontHeading--sticky app-storefront-sticky-heading storefrontHeading--fadein"

              >
                <div
                  className="storefrontHeading__titleWrap"
                  data-testid="storefrontHeadingTitle"
                >
                  <div className={Mstyles.Vendordpbox}>
                    <div>
                      <Avatar
                        alt={VData.VendorList[0].VD.name}
                        src={`${MediaFilesUrl}${MediaFilesFolder}/${VData.VendorList[0].VD.dp}`}
                        sx={{ width: 56, height: 56 }}
                      />
                    </div>

                    <div style={{ width: '10px' }}></div>
                    <div className={Mstyles.VendordpboxNambox}>
                      <div className={Mstyles.Namebox}>
                        <div className={Mstyles.NameboxA}>
                          <span>{VData.VendorList[0].VD.name}</span>
                        </div>
                        <div className={Mstyles.NameboxB}>
                          {VData.VendorList[0].VD.VendorData[0].Verified &&

                            <Tooltip title="Accounts with a verified badge have been authenticated and can be FME Verified subscribers or notable persons or brands.">
                              <IconButton>
                                <RiVerifiedBadgeFill size={15} className={Mstyles.NameboxBIcon} />
                              </IconButton>
                            </Tooltip>
                          }


                        </div>
                      </div>
                      <small>@{VData.VendorList[0].VD.username}</small>
                    </div>

                  </div>

                </div>
                <div style={{ height: '10px' }}></div>
                <div className={Mstyles.VpBtns}>

                  <FollowBtn VD={VData.VendorList[0].VD} />

                  <div style={{ minWidth: '10px' }}></div>
                  <div
                    className={Mstyles.VpBtnItem}
                  >
                    <div className={Mstyles.VpBtnItemA}>
                      {LoadingBtn ? <CircularProgress size={15} color="success" /> : <div>
                        <FaFacebookMessenger />

                      </div>}
                    </div>
                    <div className={Mstyles.VpBtnItemB}>
                      <span>Messages</span><small> ( coming soon )</small>
                    </div>

                  </div>
                </div>
                <div style={{ height: '20px' }}></div>

                <div className="storefrontHeading__content">

                  <div className={Mstyles.Ratingbox}>
                    <div className={Mstyles.RatingboxA}>
                      <Rating className={Mstyles.RatingStart} readOnly value={VData.VendorList[0].AvRating} halfFillMode='svg' itemStyles={myStyles} />
                      <div className={Mstyles.Ratingtext}>
                        {VData.VendorList[0].AvRating} out of 5 rating
                      </div>

                    </div>
                    <div className={Mstyles.RatingboxB}>
                      <span> {VData.VendorList[0].TF}</span>
                      <small>Followers</small>

                    </div>

                  </div>
                  <div style={{ height: 20 }}></div>
                </div>
                <div>
                  <div className={Mstyles.VpTagbox}>
                    <div className={Mstyles.VpTagboxA}>
                      <LuMapPin />
                    </div>
                    <div className={Mstyles.VpTagboxB}>
                      {VData.VendorList[0].VD.VendorData[0].City}, {VData.VendorList[0].VD.VendorData[0].State}
                    </div>
                  </div>
                  <div className={Mstyles.VpTagbox}>
                    <div className={Mstyles.VpTagboxA}>
                      <LuCheckCheck  />
                    </div>
                    <div className={Mstyles.VpTagboxB}>
                     {VData.VendorList[0].MainCat.title} {VData.VendorList[0].SubCat.title}
                    </div>
                  </div>
                </div>
               
                
              </header>
            </aside>


          </div>

        </div>
      </div>
      }


      {NotF &&
        <Nothingfound Title={`Profile Not Found`} DescData={`which url you are tying to visit not found or private`} />

      }







    </div>
  )
}

export default Home;
