import React, { useState } from 'react';
import * as util from '../../lib/util';
import * as service from '../../services/index';
import { NextPageContext } from 'next';
import Router from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import Link from 'next/link';

/**
 * TODO 관리자 페이지 작성
 */

const Register = ({ items }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [url, setURL] = useState('');
  const [image, setImage] = useState<File | undefined>()

  const handleFileChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCode(e.target.value);
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  }
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setURL(e.target.value);
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    if (!image) {
      alert('이미지 파일을 선택하세요');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('url', url);
    formData.append('code', code);
    formData.append('file', image);

    const res = await service.coupang.uploadImage(formData);
    const json = await res.json();
    if (json.message === "success") {
      Router.push('/coupang');
    } else {
      alert("등록 실패");
    }
    console.log(json);
  }
  const handleBackButton = (e) => {
    e.preventDefault();
    Router.back();
  }

  return (
    <Container>
      <Title>상품 등록 페이지</Title>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>상품 이름
          <InputBox
            onChange={handleNameChange} value={name} required
            id={'test'} type='text' placeholder='쿠팡에 있는 상품명을 적으면 됨. 너무 길지 않게' />
        </label>
        <label>상품 코드
          <InputBox
            onChange={handleCodeChange} value={code} required
            id={'test'} type='text' placeholder='상품 코드 (ex. https://coupa.ng/ABCD이면 ABCD 입력' />
        </label>
        <label>상품 URL
          <InputBox
            onChange={handleUrlChange} value={url} required
            type='text' placeholder='상품 URL (ex. https://coupa.ng/ABCD)' />
        </label>
        <label>이미지 선택
          <FileInput type='file' onChange={handleFileChange} />
        </label>
        <Link href="/admin"><a><Button>취소</Button></a></Link>
        <Button color={'green'}>등록</Button>
      </form>
    </Container>
  )
}

Register.getInitialProps = async (ctx: NextPageContext) => {

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
  return { items: json.items };
}

const Container = styled.div`
  width:65%;
  max-width: 1024px;
  margin:3rem auto;
`;
const Title = styled.h1`
  font-size:1.6rem;
  margin-bottom:3rem;
`
const InputBox = styled.input`
  width:100%;
  height:3rem;
  font-size:1rem;
  display:block;
  margin:1rem 0;
  box-sizing:border-box;
  padding-left:8px;
`;

const FileInput = styled(InputBox)`
  cursor: pointer;
  border:1px solid #ccc;
`;
const Button = styled.button`
  width: 12rem;
  height: 3rem;
  cursor: pointer;
  margin-top : 3rem;
  display:inline-block;
  border:none;
  background-color : ${props => props.color ? props.color : null};
  color : ${props => props.color ? 'white' : null};
`;


export default Register;
