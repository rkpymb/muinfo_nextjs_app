import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from '/src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import CheckloginStates from '../context/auth/CheckloginStates'
import MainAlert from '/src/components/Parts/Alertbox/MainAlert'
import BackdropLoader from '/src/components/Parts/BackdropLoader'
import Script from 'next/script';

import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material'; 

import '../styles/globals.css'

import { useEffect } from 'react';
function TokyoApp({ Component, pageProps }) {


  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  const OverviewWrapper = styled(Box)(
    ({ theme }) => `
     
      background: ${theme.palette.common.white};
      color: ${theme.palette.common.black};
     
  `
  );

  return (

    <CheckloginStates >

      <Head>z
       
        <link rel="icon" href="/fevicon.png" />

      </Head>

      <ThemeProvider >
        <CssBaseline />
        <MainAlert />
        <BackdropLoader />
        <OverviewWrapper>
        <Component {...pageProps} />
        </OverviewWrapper>
      </ThemeProvider>
    </CheckloginStates >
  );
}

export default TokyoApp;
