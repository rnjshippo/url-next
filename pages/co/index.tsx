import React from 'react';
import { CoupangHeader } from '../../components/index';
import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps, GetServerSideProps } from 'next';
import * as model from '../../models/index';

interface ItemProps {
  no: number;
  name: string;
  code: string;
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
        <GridContainer>
          {items.map(({ no, name, code, img, hit, url }: ItemProps) => (
            <Link href="/co/[item]" as={`/co/${code}`} key={no}>
              <a>
                <ItemBox>
                  <Item img={img} />
                  <ItemName>{name}</ItemName>
                </ItemBox>
              </a>
            </Link>
          ))}
        </GridContainer>
      </Container>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const [rows] = await model.coupang.getCoupangItems();
//   return { props: { items: rows ? JSON.parse(JSON.stringify(rows)) : [], } }
// }

export const getServerSideProps: GetServerSideProps = async () => {
  const [rows] = await model.coupang.getCoupangItems();
  return { props: { items: rows ? JSON.parse(JSON.stringify(rows)) : [], } }
}

const Container = styled.div`
  width:64rem;
  margin:0 auto 5rem auto;

  @media (max-width:1023px){
    width:100%;
  }
`;

const GridContainer = styled.div`
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

const ItemName = styled.div`
  width:18rem;
  font-size:1rem;
  margin:0 auto;
  font-weight:600;
  @media (max-width:320px){
    width:90%;
  }
`

const Item = styled.div<props>`
  background: url('${props => props.img}') center center no-repeat;
  background-size : 18rem 18rem;
  width:100%;
  height:100%;
  margin:0 auto;

  @media (max-width:320px){
    // background-size : 95% 95vw;
  }
`
