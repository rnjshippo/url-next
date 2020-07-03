import * as model from '../models/index'
import { GetServerSideProps } from 'next'
import Error from 'next/error';

export default () => {
  return <Error statusCode={404} />;
}

/* 해당 shortUrl에 매칭되는 fullUrl이 있으면 redirect */
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { params, res } = ctx;
  const shortUrl: string = String(params?.shortUrl)
  const [rows] = await model.url.getUrlFromShort(shortUrl);
  const fullUrl = rows?.[0]?.fullUrl;
  if (fullUrl) {
    await model.url.addHit(shortUrl);
    // console.log("add hits");
    res.writeHead(302, { 'Location': fullUrl });
    res.end();
  }
  return { props: {} }
}