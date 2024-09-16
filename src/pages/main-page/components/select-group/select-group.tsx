import Select from '../select/select';
import styles from './select-group.module.css';
import { ISelect } from '../../../../interfaces/interfaces';

const SelectGroup = ({
  arrSelect,
  label,
  selectedOption,
  onChange,
}: ISelect) => {
  return (
    <div className={styles.wrapper}>
      <Select
        arrSelect={arrSelect}
        label={label}
        selectedOption={selectedOption}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectGroup;
