import React from 'react';
import styled from 'styled-components';
import * as service from '../../services/index';

interface Props {
  idx: number;
  name: string;
  code: string;
  url?: string;
  img: string;
  setItems;
  items;
}

const CoupangItemBox = ({ idx, items, name, code, url, img, setItems }: Props) => {

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (confirm("삭제하시겠습니까? 누르면 바로 삭제되니 신중하게 하세요.")) {
      const res = await service.coupang.deleteCoupangItem(code);
      const json = await res.json();
      console.log(json)
      setItems(items.filter((item) => (item.code !== code)));
    }
  }
  return (
    <Container>
      <Item>{`${idx}번 ${name} ${code} ${url}`}</Item>
      <Image src={img}></Image>
      <Button onClick={handleClick}>삭제하기</Button>
    </Container>
  )
}

const Container = styled.div`
  width:100%;
  margin:3rem auto;
`;
const Image = styled.img`
  width:10rem;
  height:10rem;
  vertical-align:top;
`
const Item = styled.div`
  width:calc(100% - 7rem);
  height: 3rem;
  display:inline-block;
`
const Button = styled.button`
  width: 7rem;
  height: 3rem;
  background-color: #dd2c00;
  display:inline-block;
  color:white;
  border:none;
  margin-left: 2rem;
`

export default CoupangItemBox;