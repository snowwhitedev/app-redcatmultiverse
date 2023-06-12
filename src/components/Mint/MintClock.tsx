import styles from './MintClock.module.scss';

const MintClock = ({ isMinting }: any) => {
  return (
    <>
      {/* // <img
    //   className={styles.clockImg}
    //   src={isMinting === true ? '/images/mint_clock.gif' : '/images/mint_clock.png'}
    //   alt='Clock'
    // /> */}
      <img
        className={`${styles.clockImg} ${isMinting === true ? styles.active : ''}`}
        src='/images/mint_clock.gif'
        alt='Clock'
      />
      <img
        className={`${styles.clockImg} ${isMinting === false ? styles.active : ''}`}
        src='/images/mint_clock.png'
        alt='Clock'
      />
    </>
  )
};

export default MintClock;