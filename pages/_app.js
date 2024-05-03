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
      <Head>
        <title>Magadh University Info</title>
        <link rel="icon" href="/Logo/fevi.png" />
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z0HYVSTLCL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Z0HYVSTLCL');
        `}
      </Script>

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
