import React, { useState } from 'react';
import { Header, UrlBox } from '../components/index'
import Head from 'next/head'
import { TYPE_COMPRESS } from '../lib/util'

export default () => {

  const [fullUrl, setFullUrl] = useState(String);
  const [resultUrl, setResultUrl] = useState(String);
  const [buttonType, setButtonType] = useState(TYPE_COMPRESS); //compress 일때 압축, copy 일때 복사

  return (
    <>
      <Head>
        <title>단축URL 서비스 :: 링크 단축, 주소 줄이기</title>
      </Head>
      <Header
        setFullUrl={setFullUrl}
        setButtonType={setButtonType}
        setResultUrl={setResultUrl} />
      <UrlBox
        setResultUrl={setResultUrl}
        setFullUrl={setFullUrl}
        setButtonType={setButtonType}
        fullUrl={fullUrl}
        resultUrl={resultUrl}
        buttonType={buttonType} />
    </>
  );
}
