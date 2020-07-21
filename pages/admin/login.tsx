import React, { useState } from 'react';
import styled from 'styled-components';
import * as service from '../../services/index';
import Router from 'next/router';

/**
 * TODO 관리자 로그인 페이지
 */
export default function Login() {

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    const res = await service.coupang.login(userId, userPw);
    const json = await res.json();
    if (res.status === 200 && json.message === "success") {
      Router.push("/admin");
    } else {
      alert("로그인 실패");
    }
    // TODO : submit routine 구현
  }
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserId(e.target.value.trim());
  }
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserPw(e.target.value.trim());
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label>
          아이디
        <IdInput onChange={handleIdChange} value={userId}
            required />
        </label>
        <label>
          비밀번호
        <PwInput onChange={handlePwChange} value={userPw}
            type={'password'} required autoComplete={'password'} />
        </label>
        <SubmitButton>로그인</SubmitButton>
      </form>
    </Container>
  )
}

const Container = styled.div`
  width: 80%;
  max-width:600px;
  margin:2rem auto;
`

const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  display:block;
  box-sizing : border-box;
  margin:.5rem auto;
  padding-left:8px;
`

const IdInput = styled(InputBox)`
`
const PwInput = styled(InputBox)`
`
const SubmitButton = styled.button`
  width: 100%;
  height: 3rem;
  display:block;
  margin-top:2rem;
`