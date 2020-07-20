import React, { useEffect } from 'react';
import { CoupangHeader } from '../../components';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as model from '../../models/index';
import * as service from '../../services/index';
import { CoupangItemContainer } from '../../components/index';

interface Props {
  name: string;
  url: string;
  img: string;
  hit: string;
}

const Coupang: React.FC<Props> = ({ name, url, img, hit }: Props) => {
  useEffect(() => {
    async function inner() {
      const res = await service.coupang.addHits(name);
      const json = await res.json();
    }
    inner();
  }, []);
  return (
    <>
      <CoupangHeader />
      <CoupangItemContainer img={img} url={url} />
    </>
  )
}
/**
 *  DB 업데이트시 다시 bulid 해야됨.
 */
export const getStaticPaths: GetStaticPaths = async () => {

  const [rows] = await model.coupang.getCoupangItems();
  const paths = rows.map(({ name }) => {
    return { params: { item: name } }
  });

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const item: string = String(params?.item)
  const [rows] = await model.coupang.getFullCoupangUrl(item);
  const { name, url, img, hit } = rows[0];

  return { props: { name, url, img, hit } }
}



export default Coupang;

