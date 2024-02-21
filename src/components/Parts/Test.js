import { useState, useEffect, useContext } from 'react';
import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material'; 

import { LuShoppingBag, LuSearch, LuChevronRight, LuArrowLeft, LuMinus, LuPlus } from "react-icons/lu";

import BaseLayout from 'src/layouts/BaseLayout';
import Mstyles from '../Styles/home.module.css'
import CheckloginContext from '../context/auth/CheckloginContext'

import Link from 'next/link';
import FooterMobile from '../src/components/Parts/FooterMobile'
import ProductGridlistLoader from '../src/components/Parts/ProductGridlistLoader'
import Image from 'next/image';
import Head from 'next/head';
import CatlistGrid from './components/List/CatlistGrid'

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Footer from '../src/components/Parts/Footer'
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { MediaFilesUrl, MediaFilesFolder } from '../Data/config'
import ProcedToCheckout from '../src/components/Parts/ProcedToCheckout'
import { useRouter, useParams } from 'next/router'
const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const router = useRouter()
  const [Loading, setLoading] = useState(false);
  const Contextdata = useContext(CheckloginContext)
  const [show, setShow] = useState(false)
  const [Query, setQuery] = useState('');
  const blurredImageData = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88enTfwAJYwPNteQx0wAAAABJRU5ErkJggg==';
  const [Results, setResults] = useState([]);



  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));


  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 1) {
      SearchProduct(e.target.value)
    }
  };

  const SearchProduct = async (SQ) => {
    setLoading(true)
    const dataid = '08c5th4rh86ht57h6g';
    const sendUM = { SearchQuery:SQ }
    const data = await fetch("/api/V3/List/ProductSearch", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(sendUM)
    }).then((a) => {
      return a.json();
    })
      .then((parsed) => {
        setLoading(false)
       setResults(parsed.ReqD.SR)
     
      })
  }
  
  return (
    <OverviewWrapper>
      <Head> 
        <title>Toladukan.com</title>
      </Head>
      <div className={Mstyles.SearchnavbarBox}>
        <div className={Mstyles.SearchBox}>
          <IconButton aria-label="cart" onClick={() => router.back()}>
            <StyledBadge color="secondary" >
              <LuArrowLeft />
            </StyledBadge>
          </IconButton>
          <div className={Mstyles.SearchBoxmain}>

            <input
              type='text'
              placeholder='Search for products'
              autoFocus
              value={Query}
              onChange={handleInputChange}

            />

            <IconButton aria-label="cart">
              <StyledBadge color="secondary" >
                <LuSearch />
              </StyledBadge>
            </IconButton>

          </div>
        </div>
      </div >
     
      <div>
        <div className={Mstyles.ContainerMainBoxFull}>

          <div className={Mstyles.ContainerMain}>
            
            <div className={Mstyles.SearchlistBox}>
              {Query !== '' &&
                <div>
                  <div style={{ fontWeight: 600 }}>Showing results for "{Query}"</div>
                  <div style={{ minHeight: '10px' }}></div>
                </div>
              
              }
             
             
              
              {Loading && 
                <ProductGridlistLoader/>
              
              }
              {!Loading && 
                
                <div className={Mstyles.ProductGrid}>

                  {Results.map((item, index) => {
                    return <div className={Mstyles.ProductGridItem}>
                      <Link href={`/Product/${item.slug}`} key={item.id} style={{ textDecoration: 'none' }}>
                        <div className={Mstyles.ProductItemImage}>
                          <Image
                            src={`${MediaFilesUrl}${MediaFilesFolder}/${item.img}`}
                            alt="image"
                            layout="responsive"
                            placeholder='blur'
                            width={50}
                            height={50}
                            quality={100}
                            blurDataURL={blurredImageData}

                          />
                        </div>
                      </Link>

                      <div className={Mstyles.ProductItemTitle}>
                        <span>{item.title.slice(0, 35) + '...'}</span>
                      </div>
                      <div className={Mstyles.ProductItemPrice}>
                        <span>₹{item.sprice}</span> <del>{item.mprice}</del>
                      </div>
                      <div style={{ minHeight: '10px' }}></div>
                      <div className={Mstyles.ProductItemFooter}>
                        <div style={{ minHeight: '10px' }}></div>
                        <div className={Mstyles.ProductItemFooterA}>
                          <span>{item.UnitNumber}/{item.UnitText}</span>
                        </div>
                        <div style={{ minHeight: '10px' }}></div>
                        <div className={Mstyles.ProductItemFooterB}>
                          {(item._id in Contextdata.cart) &&


                            <div className={Mstyles.AddcartbtnGroup}>

                              <IconButton size='small' styles={{ color: 'white' }} aria-label="Remove from cart" onClick={() => { Contextdata.removeFromCart(item._id, 1) }} >
                                <LuMinus />
                              </IconButton>
                              <div className={Mstyles.AddcartbtnQty}>
                                <span>{Contextdata.cart[item._id].qty}</span>
                              </div>

                              <IconButton size='small' styles={{ color: 'white' }} aria-label="Add to cart" onClick={(() => { Contextdata.addtoCart(item._id, 1, item.sprice, item.title, item.img, item.UnitNumber, item.UnitText, item.mprice, item) })}  >
                                <LuPlus />
                              </IconButton>
                            </div>


                          }
                          {!(item._id in Contextdata.cart) &&
                            <div className={Mstyles.Addcartbtn} onClick={(() => { Contextdata.addtoCart(item._id, 1, item.sprice, item.title, item.img, item.UnitNumber, item.UnitText, item.mprice, item) })}>
                              <span>ADD</span>
                            </div>
                          }
                        </div>
                        <div style={{ minHeight: '10px' }}></div>
                      </div>
                    </div>
                  }

                  )}
                </div>
              }
                  
            </div>

            <div style={{ minHeight: '30px' }}></div>
            <div style={{ fontWeight: 600 }}>Recomended Categories</div>
            <div style={{ minHeight: '10px' }}></div>
            <CatlistGrid />
            <div style={{ minHeight: '230px' }}></div>
          </div>

        </div>


      </div>
      <ProcedToCheckout />
      <div className={Mstyles.OnlyMobile}>
        <FooterMobile />
      </div>
     
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
