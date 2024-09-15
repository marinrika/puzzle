import styles from './login-page.module.css';

const LoginPage = () => {
  const regexFirst: RegExp = /^[A-Z][a-zA-Z]{2,}(?:-[a-zA-Z]+)*-?$/;
  const regexLast: RegExp = /^[A-Z][a-zA-Z]{3,}(?:-[a-zA-Z]+)*-?$/;
  return <div className={styles.wrapper}>LoginPage</div>;
};

export default LoginPage;
