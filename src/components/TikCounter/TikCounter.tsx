import { useEffect, useState } from 'react';
import { COUNT_DOWN } from '../../config/constants/config'

import styles from './TikCounter.module.scss';

const TikCounter = () => {
  const [countDownDays, setCountDownDays] = useState(0);
  const [countDownHours, setCountDownHours] = useState(0);
  const [countDownMinutes, setCountDownMinutes] = useState(0);
  const [countDownSeconds, setCountDownSeconds] = useState(0);

  useEffect(() => {
    let interval: any;

    const tictoc = () => {
      const now = new Date().getTime();
      const distance = COUNT_DOWN - now;
      if (distance < 0) {
        setCountDownDays(0);
        setCountDownHours(0);
        setCountDownMinutes(0);
        setCountDownSeconds(0);
      } else {
        setCountDownDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setCountDownHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setCountDownMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setCountDownSeconds(Math.floor((distance % (1000 * 60)) / 1000));
      }
    }

    tictoc();
    interval = setInterval(tictoc, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.tikCounterContainer}>
      <div className={styles.countDownValue}>{countDownDays.toString().padStart(2, '0')}</div>
      <div className={styles.separator}>:</div>
      <div className={styles.countDownValue}>{countDownHours.toString().padStart(2, '0')}</div>
      <div className={styles.separator}>:</div>
      <div className={styles.countDownValue}>{countDownMinutes.toString().padStart(2, '0')}</div>
      <div className={styles.separator}>:</div>
      <div className={styles.countDownValue}>{countDownSeconds.toString().padStart(2, '0')}</div>
    </div>
  )
};

export default TikCounter;
