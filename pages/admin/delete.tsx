import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Title } from './index';
import { CoupangItemBox } from '../../components/index';
import { GetServerSideProps, NextPageContext } from 'next';
import * as model from '../../models/index';
import * as service from '../../services/index';
import Router from 'next/router';


const Delete = ({ rows }) => {

  const [items, setItems] = useState([] || null);
  useEffect(() => {
    setItems(rows);
  }, [])

  return (
    <Container>
      <Title>상품 삭제 페이지</Title>
      <Button onClick={() => { Router.back() }}>뒤로 가기</Button>
      {items.map(({ no, name, url, img, code }, idx) => (
        <CoupangItemBox key={no} name={name} img={img} code={code} url={url} idx={idx + 1} setItems={setItems} items={items} />)
      )}

    </Container>
  )
}

const Button = styled.button`
  width: 7rem;
  height: 3rem;
  background-color: green;
  color:white;
  margin: 2rem auto 0 auto;
  border:none;
`

Delete.getInitialProps = async (ctx: NextPageContext) => {

  const cookie = ctx.req?.headers.cookie;

  const dev = process.env.NODE_ENV === 'development';
  const res = await service.coupang.getCoupangItems(cookie, ctx.req ? `${dev ? 'http' : 'https'}://${ctx.req.headers.host}` : "");

  /* client-side */
  if (res.status == 401 && !ctx.req) {
    Router.push("/admin/login");
  }

  /* server-side */
  if (res.status == 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `/admin/login`
    });
    ctx.res?.end();
  }
  const json = await res.json();
  return { rows: json.items };
}

// export const getServerSideProps: GetServerSideProps = async ctx => {

//   const [rows] = await model.coupang.getCoupangItems();

//   return { props: { rows: rows ? JSON.parse(JSON.stringify(rows)) : null } };
// }

export default Delete;