import styles from './container.module.scss'

const Container = ({ children, className }: any) => (
    <div className={[styles.container, className].join(' ')}>
        {children}
    </div>
)

export default Container