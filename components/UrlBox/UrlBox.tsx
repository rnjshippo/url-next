import React, { useState } from 'react';
import Link from 'next/link';
import styles from './UrlBox.module.scss';
import * as service from '../../services/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TYPE_COMPRESS, TYPE_COPY, BASE_URL } from '../../lib/util'

interface Props {
  setFullUrl(url: string): void;
  setResultUrl(url: string): void;
  setButtonType(type: string): void;
  fullUrl: string;
  resultUrl: string;
  buttonType: string;
}

interface compressResponse {
  data: {
    shortUrl: string,
  }
  status: number
}

const Formbox = ({ resultUrl, fullUrl, buttonType, setFullUrl, setButtonType, setResultUrl }: Props) => {


  const [visible, setVisible] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e?.target?.value?.trim() === "") {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setFullUrl(e?.target?.value?.trim());
    setButtonType(TYPE_COMPRESS)
  }

  const handleCopy = (copiedText: string, result: boolean) => {
    alert("복사되었습니다!");
    // TODO : alert 말고 깔끔한 알람창 구현
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key == "Enter") {
      handleSubmit(e);
    }
  }

  const clearInputBox = () => {
    setFullUrl("");
    setVisible(false);
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    if (fullUrl.trim() === "") return;
    let regix = '(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}'
    //TODO : 정규식으로 비정상 url 체크 후 alert 구현

    let { data: { shortUrl }, status }: compressResponse = await service.url.compressFullUrl(fullUrl);
    console.log(status, shortUrl)
    if (status === 200) {
      setButtonType(TYPE_COPY);
      setResultUrl(BASE_URL + shortUrl);
      setFullUrl(BASE_URL + shortUrl);
    } else {
      setFullUrl("");
      console.error("Error 변환 실패"); //TODO : 변환 실패 처리 
    }
  }
  return (
    <>
      <div className={styles.url_div}>
        <div className={styles.title_div}>{titleText}</div>
        <div className={styles.title_div2}>{subText}</div>
        <div className={styles.input_div}>
          <img src={"/icons/link.svg"} className={styles.link_btn}></img>
          {visible ? <img src={"/icons/btn_clear.svg"} className={styles.clear_btn} onClick={clearInputBox} /> : null}
          <input onChange={handleChange} onKeyPress={handleKeyPress} value={fullUrl} className={styles.url_box} spellCheck={"false"} placeholder={"http://"} />
          {buttonType === TYPE_COMPRESS ?
            <button
              onClick={handleSubmit}
              className={styles.submit}>
              {"URL 단축"}
            </button> :
            <CopyToClipboard text={resultUrl} onCopy={handleCopy}>
              <button className={styles.submit}>
                {"URL 복사"}
              </button>
            </CopyToClipboard>}
        </div>
        {resultUrl === "" ? <span className={styles.subtext}>{}</span> : <span className={styles.subtext}>{successText}</span>}
      </div>
    </>
  )
}

const titleText: string = `가독성 떨어지는 링크는 그만!`;
const subText: string = `kooo에서 단축한 링크로 편리하게 공유하세요.`;
const successText: string = `단축되었습니다! 
URL 복사버튼을 눌러서 단축된 URL을 사용하세요.`;

export default Formbox; 