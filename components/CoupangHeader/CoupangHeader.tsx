import React from 'react';
import styles from './CoupangHeader.module.scss';
import Link from 'next/link';

const CoupangHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link href={'/coupang'}>
        <a><img src={"/icons/logo_text.svg"} className={styles.logo} /></a>
      </Link>
    </div>
  );
}

export default CoupangHeader;