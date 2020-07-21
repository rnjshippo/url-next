import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Admin: React.FC = () => {
  return (
    <Container>
      <Title>상품 관리 페이지</Title>
      <Link href="/admin/register"><a><Button color={'#0091ea'}>상품 등록하기</Button></a></Link>
      <Link href="/admin/delete"><a><Button color={'#dd2c00'}>상품 삭제하기</Button></a></Link>
    </Container>
  )
}

export const Container = styled.div`
  width:65%;
  max-width: 1024px;
  margin:3rem auto;
`
export const Title = styled.div`
  font-size:1.6rem;
  font-weight:600;
`
const Button = styled.button`
  width: 10rem;
  height: 3rem;
  margin: 2rem 2rem 2rem auto;
  background-color: ${props => props.color};
  color: ${props => props.color ? 'white' : null};
  border:none;
`

export default Admin;