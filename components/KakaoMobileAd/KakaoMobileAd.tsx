import React from 'react';
import styles from './KakaoMobileAd.module.scss';

const KakaoMobileAd = () => {
  return (
    <div className={styles.ad_box}>
      <ins className="kakao_ad_area" style={{ display: "none" }}
        data-ad-unit="DAN-rkwtzcq4rghg"
        data-ad-width="320"
        data-ad-height="100"></ins>
    </div>
  )
}

export default React.memo(KakaoMobileAd);