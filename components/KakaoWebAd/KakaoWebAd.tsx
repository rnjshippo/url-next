import React from 'react';
import styles from './kakaoWebAd.module.scss';

const kakaoWebAd = () => {
  return (
    <div className={styles.ad_box}>
      <ins className="kakao_ad_area" style={{ display: "none" }}
        data-ad-unit="DAN-r1fmxzutssag"
        data-ad-width="728"
        data-ad-height="90"></ins>
    </div>
  )
}

export default React.memo(kakaoWebAd);