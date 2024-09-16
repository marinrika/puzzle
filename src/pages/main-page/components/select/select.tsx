import { ISelect } from '../../../../interfaces/interfaces';
import styles from './select.module.css';

const Select = ({ arrSelect, label, selectedOption, onChange }: ISelect) => {
  return (
    <div className={styles.wrapper}>
      {label}
      <select
        className={styles.select}
        onChange={(event) => onChange(event)}
        value={selectedOption + 1}>
        {arrSelect.map((item, index) =>
          item === 0 ? (
            <option className={styles.option} value={index + 1} key={index}>
              {index + 1}
            </option>
          ) : (
            <option
              className={styles.optionColor}
              value={index + 1}
              key={index}>
              {index + 1}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Select;
