import styles from './input.module.css';

const Input = (placeholder: string, regex: RegExp) => {
  return (
    <div className={styles.wrapper}>
      <input placeholder={placeholder}></input>
    </div>
  );
};

export default Input;
