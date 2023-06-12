import GradientText from '../GradientText/GradientText';
import TikCounter from '../TikCounter/TikCounter';
import styles from './ComingSoon.module.scss';

const ComingSoon = () => {
  return (
    <div className={styles.comingSoonContainer}>
      {/* <img src="/images/countdown-background.jpg" /> */}
      <div className={styles.labelContainer}>
        <GradientText
          element='h2'
          text='RCM Portals are opening'
          innerColor={'#FFF'}
          gradient={['#f9c930', '#f2957c', '#7192f3']}
        />
        <GradientText
          element='h2'
          text='COMING SOON'
          innerColor={'#FFF'}
          gradient={['#f9c930', '#f2957c', '#7192f3']}
        />
      </div>
      <div className={styles.tikCounterContainer}>
        <TikCounter />
      </div>
      <img className={styles.catLeft} src="/images/countdown_cat-left.png" />
      <img className={styles.catRight} src="/images/countdown_cat-right.png" />
    </div>
  )
}

export default ComingSoon;
