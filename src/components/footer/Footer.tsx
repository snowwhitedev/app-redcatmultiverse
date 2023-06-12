import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>&#9993;&nbsp;<a href='mailto:hello@rcmlabs.io'>hello@rcmlabs.io</a></div>
      <div className={styles.separator}>&nbsp;|&nbsp;</div>
      <div>© 2022 RCM Labs. All rights reserved.</div>
    </footer>
  )
}

export default Footer;
