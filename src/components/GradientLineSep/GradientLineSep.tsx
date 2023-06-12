import styles from './GradientLineSep.module.scss';

const GradientLineSep = ({ className }: any) => {
  return (
    <div className={`${className} ${styles.sepLine}`}></div>
  )
}

export default GradientLineSep;
