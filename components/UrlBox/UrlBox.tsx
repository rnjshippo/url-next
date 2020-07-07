import React, { useState } from 'react';
import styles from './UrlBox.module.scss';
import * as service from '../../services/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TYPE_COMPRESS, TYPE_COPY, BASE_URL } from '../../lib/util'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const successMsg: string = "URL이 성공적으로 단축되었습니다.";
const failMsg: string = "유효하지 않은 URL입니다.";
const errorMsg: string = "URL 변환 중 에러가 발생했습니다. 다시 한번 시도해주세요.";

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

  /* 레이어 팝업 show 여부 state */
  const [popupInfo, setPopupInfo] = useState({
    visible: false,
    success: false,
    error: false
  });

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
    setShowClearButton(false);
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    const inputUrl: string = fullUrl.trim();
    if (inputUrl === "") return;

    const regex = RegExp(/^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/);
    const vaild: boolean = regex.test(inputUrl);

    if (vaild) {
      //TODO : 정규식으로 비정상 url 체크 후 popup 구현
      let { data: { shortUrl }, status }: compressResponse = await service.url.compressFullUrl(fullUrl);
      console.log(status, shortUrl)
      if (status === 200) {
        setButtonType(TYPE_COPY);
        setResultUrl(BASE_URL + shortUrl);
        setFullUrl(BASE_URL + shortUrl);

        //TODO 성공시 팝업 구현
        setPopupInfo({ visible: true, success: true, error: false });

      } else {
        console.error("변환 실패"); //TODO : 변환 실패 처리 
        setFullUrl("");
        setPopupInfo({ visible: true, success: false, error: true });
      }
    } else {
      //TODO :: 비정상 Url 체크 후 팝업 구현
      console.log("유효하지 않은 URL입니다.");
      setPopupInfo({ visible: true, success: false, error: false });
    }
  }

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className={styles.url_div}>
        <div className={styles.title_div}>{titleText}</div>
        <div className={styles.title_div2}>{subText}</div>
        <div className={styles.input_div}>
          <img src={"/icons/link.svg"} className={styles.link_btn}></img>
          {showClearButton ? <img src={"/icons/btn_clear.svg"} className={styles.clear_btn} onClick={clearInputBox} /> : null}
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
      <button onClick={handleClick}>button</button>

      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={handleClose} severity={popupInfo.success ? "success" : "error"}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  )
}

const titleText: string = `가독성 떨어지는 링크는 그만!`;
const subText: string = `kooo에서 단축한 링크로 편리하게 공유하세요.`;
const successText: string = `단축되었습니다! 
URL 복사버튼을 눌러서 단축된 URL을 사용하세요.`;

export default Formbox; 