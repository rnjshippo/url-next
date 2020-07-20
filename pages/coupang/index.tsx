import React from 'react';
import { CoupangHeader } from '../../components/index';
import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps, GetServerSideProps } from 'next';
import * as model from '../../models/index';


interface ItemProps {
  no: number;
  name: string;
  img: string;
  url: string;
  hit: number;
}

interface CoupangItemsProps {
  items: ItemProps[];
}

interface props {
  img: string;
}

export default function ({ items }: CoupangItemsProps) {
  return (
    <>
      <Container>
        <CoupangHeader />
        {items.map(({ no, name, img, hit, url }: ItemProps) => (
          <Link href="/coupang/[item]" as={`/coupang/${name}`} key={no}>
            <a>
              <ItemBox>
                <Item img={img} />
              </ItemBox>
            </a>
          </Link>
        ))}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [rows] = await model.coupang.getCoupangItems();
  return { props: { items: rows ? JSON.parse(JSON.stringify(rows)) : [], } }
}

const Container = styled.div`
  display:grid;
  grid-template-columns:repeat(3, 1fr);

  width:64rem;
  margin:0 auto;

  @media (max-width:1023px){
    width:100%;
    grid-template-columns:repeat(2, 1fr);
  }
  
  @media (max-width:600px){
    width:100%;
    grid-template-columns:1fr;
  }
`;

const ItemBox = styled.div`
  height: 20rem;
  margin:1rem auto;
`;

const Item = styled.div<props>`
  background: url(${props => props.img}) center center no-repeat;
  background-size : 18rem 18rem;
  width:100%;
  height:100%;
  margin:0 auto;
  @media (max-width:320px){
    background-size : 95% 95vw;
  }
`