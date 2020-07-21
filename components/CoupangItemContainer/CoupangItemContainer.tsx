import React from 'react';
import styled from 'styled-components';
import { coupangText } from '../../lib/util';

const CoupangItemContainer = ({ name, url, img }) => {
  return (
    <>
      <Container>
        <a href={url}>
          <Picture image={img} />
          <ItemName>{name}</ItemName>
          <RedirectBox>
            <CoupangLogo></CoupangLogo>
            <CoupangText>{'🚚  상품 자세히 보기  🚛'}</CoupangText>
          </RedirectBox>
        </a>
        <Message>{coupangText}</Message>
      </Container>
    </>
  )
}

export default CoupangItemContainer;

interface PictureProps {
  image: string;
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width:43rem;
  min-height: 70vh;
  margin: .5rem auto;
  box-sizing: border-box;

  @media ( max-width: 767px ) {
    width:100%;
  }
`;
const ItemName = styled.div`
  font-size:1rem;
  font-weight:600;
  margin-bottom : 1rem;
  width: 18rem;
  margin:1rem auto 0 auto;
`;

const Picture = styled.div<PictureProps>`
  width:20rem;
  min-height: 20rem;
  margin:0 auto;
  background: url('${props => props.image}') center center no-repeat;
  background-size : 20rem 20rem;
  box-shadow: -5px 5px 10px #aaa;

  @media ( max-width: 767px ) {
    width:70vw;
    height:70vw;
    max-width:20rem;
    max-height:20rem;
  }
`;

const CoupangLogo = styled.div`
  width:10rem;
  height:3rem;
  background : url('/icons/logo_coupang.png') center center no-repeat;
  margin:0 auto;
`;

const CoupangText = styled.div`
  margin: .2rem auto; 
  white-space: pre-wrap;
  font-weight:700;
`;

const RedirectBox = styled.div`
  width: 15rem;
  height: 3.5rem;
  color:#333;
  font-size:1rem;
  margin: 2.5rem auto;
  text-align:center;

  @media ( max-width: 767px ) {
    width:50%;
  }
`;

//flex: 증가너비 감소너비 기본너비;
const Message = styled.div`
  font-size:0.7rem;
  color: #aaa;
  margin-top : 13rem;
`;