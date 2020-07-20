import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <a href='/'><img src={"/icons/logo_text.svg"} className={styles.logo} /></a>
    </div>
  );
}

export default Header;