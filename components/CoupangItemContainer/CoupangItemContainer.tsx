import React from 'react';
import styled from 'styled-components';
import { coupangText, APP_COLOR } from '../../lib/util';

const CoupangItemContainer = ({ url, img }) => {
  return (
    <>
      <Container>
        <Picture image={img} />
        <a href={url}>
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
    width:95%;
  }
`;

const Picture = styled.div<PictureProps>`
  width:20rem;
  min-height: 20rem;
  margin:0 auto;
  // background-color:${APP_COLOR};
  background-image: url(${props => props.image});

  @media ( max-width: 767px ) {
    width:70%;
    height:70%;
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