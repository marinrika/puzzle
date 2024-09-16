import { Navigate } from 'react-router';
import styles from './main-page.module.css';
import SelectGroup from './components/select-group/select-group';
import {
  lengthSelectLevel,
  selectLevel,
  selectOptions,
  selectRound,
  setLevel,
  setRound,
} from '../../redux/slices/select-slice';
import { useDispatch, useSelector } from 'react-redux';
import PlayField from './components/play-field/play-field';
import ButtonGroup from './components/button-group/button-group';

const MainPage = () => {
  const user = !!localStorage.getItem('firstName');
  const isLogin = !!localStorage.getItem('isLogin');

  const dispatch = useDispatch();

  const selectedOptionLevel = useSelector(selectLevel);
  const selectedOptionRound = useSelector(selectRound);
  const arraySelectedRound = useSelector(selectOptions);

  function onChangeLevel(event: React.ChangeEvent<HTMLSelectElement>) {
    localStorage.setItem('level', `${Number(event.target.value) - 1}`);
    localStorage.setItem('round', '0');
    dispatch(setLevel(Number(event.target.value) - 1));
    dispatch(setRound(0));
  }

  function onChangeRound(event: React.ChangeEvent<HTMLSelectElement>) {
    localStorage.setItem('round', `${Number(event.target.value) - 1}`);
    dispatch(setRound(Number(event.target.value) - 1));
  }

  return (
    <>
      {isLogin ? (
        <div className={styles.wrapper}>
          <div className={styles.wrapperSelect}>
            <SelectGroup
              arrSelect={lengthSelectLevel}
              label="Level"
              selectedOption={selectedOptionLevel}
              onChange={onChangeLevel}
            />
            <SelectGroup
              arrSelect={arraySelectedRound[selectedOptionLevel]}
              label="Round"
              selectedOption={selectedOptionRound}
              onChange={onChangeRound}
            />
          </div>
          <PlayField />
          <ButtonGroup />
        </div>
      ) : user ? (
        <Navigate to="start" />
      ) : (
        <Navigate to="login" />
      )}
    </>
  );
};

export default MainPage;
