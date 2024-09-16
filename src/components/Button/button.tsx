import { CommonButton } from '../../interfaces/interfaces';
import styles from './button.module.css';

const Button = ({
  content,
  className,
  type,
  disabled,
  onClick,
}: CommonButton) => {
  return (
    <button
      type={type}
      className={
        className === 'statistic' ? styles.buttonStatistic : styles.button
      }
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
