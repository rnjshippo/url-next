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
  console.log('render called header')
  return (
    <>
      <Link href='/'>
        <a><div className={styles.title} onClick={() => {
          setFullUrl("");
          setButtonType(TYPE_COMPRESS);
          setResultUrl("");
        }}>Hip.po</div></a>
      </Link>
    </>
  );
}

// class Header extends PureComponent<Props> {
//   render() {
//     console.log('render called header')
//     return (
//       <>
//         <Link href='/'>
//           <a><div className={styles.title} onClick={() => {
//             this.props.setFullUrl("");
//             this.props.setButtonType(TYPE_COMPRESS);
//             this.props.setResultUrl("");
//           }}>Hip.po</div></a>
//         </Link>
//       </>
//     );
//   }
// }

export default React.memo(Header);