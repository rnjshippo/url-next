import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { TYPE_COMPRESS } from '../../lib/util'

interface Props {
  setFullUrl(url: string): void;
  setButtonType(type: string): void;
  setResultUrl(url: string): void;
}
const Header = ({ setFullUrl, setButtonType, setResultUrl }: Props) => {
  return (
    <>
      <div className={styles.header}>
        <Link href='/'>
          <a><img src={"/icons/logo_text.svg"} className={styles.logo} onClick={() => {
            setFullUrl("");
            setButtonType(TYPE_COMPRESS);
            setResultUrl("");
          }} /></a>
        </Link>
      </div>
    </>
  );
}

export default React.memo(Header);