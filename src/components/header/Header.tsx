/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from 'react';
import Container from '../container/Container'
import styles from './header.module.scss'
import { themeChanger } from './helpers/themeChanger';
import { NavMobile } from './NavMobile';
import { NavDesktop } from './components/NavDesktop';
import { useEagerConnect, useInactiveListener } from '../../hooks';

const headerLinks = [
  { name: 'Gallery', link: 'gallery', finished: true }
]

const Header = () => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const { theme } = themeChanger();

  const handleOpenConnectModal = () => {
    document.body.style.overflowY = 'hidden';
    setIsConnectModalOpen(true);
  }

  const handleCloseConnectModal = () => {
    document.body.style.overflowY = 'auto';
    setIsConnectModalOpen(false);
  }

  useEagerConnect();
  useInactiveListener();

  return (
    <Container className={styles.headerContainer}>
      <header className={styles.header}>
        {
          theme != 'dark'
            ? (<a href="https://www.redcatmultiverse.io/"><img src='./images/rcm-logo-red.svg' alt='RCM Logo' className={styles.headerLogo} /></a>)
            : (<a href="https://www.redcatmultiverse.io/"><img src='./images/rcm-logo-white.svg' alt='RCM Logo' className={styles.headerLogo} /></a>)
        }
        <NavDesktop links={headerLinks} onOpenConnectModal={handleOpenConnectModal} />
        <NavMobile links={headerLinks} onOpenConnectModal={handleOpenConnectModal} />
        {/* <WalletConnectionContainer /> */}
      </header>
    </Container>
  )
}

export default Header;
