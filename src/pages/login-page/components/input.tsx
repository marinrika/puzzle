import { InputLogin } from '../../../interfaces/interfaces';
import styles from './input.module.css';

const Input = ({
  placeholder,
  length,
  onChangeFirst,
  onChangeLast,
  isValid,
}: InputLogin) => {
  const errorContent = `Only with letters from the English alphabet and the hyphen symbol "-". 
  The first letter of each field should be in uppercase. Minimum length: ${length} characters.`;

  return (
    <div className={styles.wrapper}>
      <input
        placeholder={placeholder}
        className={isValid ? styles.inputValid : styles.inputInvalid}
        onChange={onChangeFirst || onChangeLast}
      ></input>
      <div className={isValid ? styles.nonActive : styles.error}>
        {errorContent}
      </div>
    </div>
  );
};

export default Input;
