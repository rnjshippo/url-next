import React, { useState } from 'react';
import styles from './UrlBox.module.scss';
import * as service from '../../services/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as util from '../../lib/util'

interface Props {
  setFullUrl(url: string): void;
  setResultUrl(url: string): void;
  setButtonType(type: string): void;
  setSnackbarInfo(type: util.SnackbarInfo): void;
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

const Formbox = ({ resultUrl, fullUrl, buttonType, setFullUrl, setButtonType, setResultUrl, setSnackbarInfo }: Props) => {

  /* clear 버튼 show 여부 state */
  const [showClearButton, setShowClearButton] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e?.target?.value?.trim() === "") {
      setShowClearButton(false);
    } else {
      setShowClearButton(true);
    }
    setFullUrl(e?.target?.value?.trim());
    setButtonType(util.TYPE_COMPRESS)
  }

  const handleCopy = (copiedText: string, result: boolean) => {
    setSnackbarInfo({ type: util.TYPE_INFO, open: true, message: util.urlCopyMsg })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key == "Enter") {
      handleSubmit(e);
    }
  }

  const clearInputBox = () => {
    setFullUrl("");
    setShowClearButton(false);
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    const inputUrl: string = fullUrl.trim();
    if (inputUrl === "") {
      setSnackbarInfo({ open: true, type: util.TYPE_WARNING, message: util.urlFailMsg });
      return;
    }

    const regex = RegExp(/^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/);
    const vaild: boolean = regex.test(inputUrl);

    if (vaild) {
      //TODO : 정규식으로 비정상 url 체크 후 popup 구현
      let { data: { shortUrl }, status }: compressResponse = await service.url.compressFullUrl(fullUrl);
      console.log(status, shortUrl)
      if (status === 200) {
        setButtonType(util.TYPE_COPY);
        setResultUrl(util.DOMAIN + shortUrl);
        setFullUrl(util.DOMAIN + shortUrl);

        //TODO 성공시 팝업 구현
        setSnackbarInfo({ open: true, type: util.TYPE_SUCCESS, message: util.urlSuccessMsg });

      } else {
        setFullUrl("");
        setSnackbarInfo({ open: true, type: util.TYPE_ERROR, message: util.urlErrorMsg });
      }
    } else {
      //TODO :: 비정상 Url 체크 후 팝업 구현
      setSnackbarInfo({ open: true, type: util.TYPE_WARNING, message: util.urlFailMsg });
    }
  }



  return (
    <>
      <div className={styles.url_div}>
        <div className={styles.title_div}>{util.titleText}</div>
        <div className={styles.title_div2}>{util.subText}</div>
        <div className={styles.input_div}>
          <img src={"/icons/link.svg"} className={styles.link_btn}></img>
          {showClearButton ? <img src={"/icons/btn_clear.svg"} className={styles.clear_btn} onClick={clearInputBox} /> : null}
          <input onChange={handleChange} onKeyPress={handleKeyPress} value={fullUrl} className={styles.url_box} spellCheck={"false"} placeholder={"http://"} />
          {buttonType === util.TYPE_COMPRESS ?
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
      </div>

    </>
  )
}


// export default Formbox; 
export default React.memo(Formbox);