import React, { useState } from 'react';
import { Header, UrlBox, KakaoMobileAd } from '../components/index'
import Head from 'next/head'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import * as util from '../lib/util';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Index = () => {

  /* URL 단축 버튼 및 URL 상태 저장*/
  const [fullUrl, setFullUrl] = useState(String); /* 변환 전 fullURL */
  const [resultUrl, setResultUrl] = useState(String);
  const [buttonType, setButtonType] = useState(util.TYPE_COMPRESS); //compress 일때 압축, copy 일때 복사

  /* 스낵바 정보 state */
  const [snackbarInfo, setSnackbarInfo] = useState<util.SnackbarInfo>({
    open: false,
    type: util.TYPE_INFO,
    message: ""
  });

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={util.DOMAIN}></link>
        <title>{util.APP_TITLE}</title>
      </Head>
      <header>
        <Header
          setFullUrl={setFullUrl}
          setButtonType={setButtonType}
          setResultUrl={setResultUrl} />
      </header>
      <section>
        <UrlBox
          setResultUrl={setResultUrl}
          setFullUrl={setFullUrl}
          setButtonType={setButtonType}
          setSnackbarInfo={setSnackbarInfo}
          fullUrl={fullUrl}
          resultUrl={resultUrl}
          buttonType={buttonType} />
      </section>
      <Snackbar open={snackbarInfo.open} autoHideDuration={2500} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={handleClose} severity={
          snackbarInfo.type === util.TYPE_SUCCESS ? "success"
            : (snackbarInfo.type === util.TYPE_INFO ? "info"
              : (snackbarInfo.type === util.TYPE_WARNING ? "warning"
                : "error"))}>
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
      <KakaoMobileAd />
      <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
    </>
  );
}


export default Index;