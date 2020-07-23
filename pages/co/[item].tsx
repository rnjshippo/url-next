import React from 'react';
import { CoupangHeader } from '../../components';
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next';
import * as model from '../../models/index';
import { CoupangItemContainer } from '../../components/index';

interface Props {
  name: string;
  code: string;
  url: string;
  img: string;
  hit: string;
}

const Coupang: React.FC<Props> = ({ name, code, url, img }: Props) => {
  return (
    <>
      <CoupangHeader />
      <CoupangItemContainer name={name} img={img} url={url} code={code} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const item: string = String(params?.item)
  const [rows] = await model.coupang.getFullCoupangUrl(item);
  const { name, code, url, img } = rows[0];

  return { props: { name, code, url, img } }
}


/**
 *  DB 업데이트시 다시 bulid 해야됨.
 */
// export const getStaticPaths: GetStaticPaths = async () => {

//   const [rows] = await model.coupang.getCoupangItems();
//   const paths = rows.map(({ code }) => {
//     return { params: { item: code } }
//   });

//   return { paths, fallback: false };
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {

//   const item: string = String(params?.item)
//   const [rows] = await model.coupang.getFullCoupangUrl(item);
//   const { name, code, url, img } = rows[0];

//   return { props: { name, code, url, img } }
// }



export default Coupang;

