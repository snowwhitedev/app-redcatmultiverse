import styles from './RadioSwitch.module.scss';

const RadioSwitch = ({ className, onChange, checked }: any) => {
  return (
    <div className={className}>
      <label className={styles.switch}>
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}

export default RadioSwitch;
