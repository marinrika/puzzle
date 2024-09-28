import { Navigate, useNavigate } from 'react-router';
import styles from './main-page.module.css';
import SelectGroup from './components/select-group/select-group';
import {
  clearSelect,
  selectLevel,
  selectLine,
  selectOptions,
  selectRound,
  setLevel,
  setLine,
  setRound,
  setSelectOption,
} from '../../redux/slices/select-slice';
import { useDispatch, useSelector } from 'react-redux';
import PlayField from './components/play-field/play-field';
import ButtonGroup from './components/button-group/button-group';
import StatisticWindow from './components/statistic-window/statistic-window';
import {
  selectIsModal,
  setClearModal,
  setIsModal,
  setIsStatistic,
} from '../../redux/slices/statistic-slice';
import {
  clearPlayField,
  selectCanvasLine,
  selectHintLine,
  setIsCheck,
  setIsContinue,
  setIsLineHintHidden,
  setIsRound,
  setIsSoundHidden,
  setIsTranslateHidden,
} from '../../redux/slices/play-field-slice';
import {
  QUANTITY_LEVELS,
  QUANTITY_LINES,
} from '../../data/variables/variables';
import HintGroup from './components/hint-group/hint-group';
import Button from '../../components/Button/button';

const MainPage = () => {
  const user = !!localStorage.getItem('firstName');
  const isLogin = !!localStorage.getItem('isLogin');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedOptionLevel = useSelector(selectLevel);
  const selectedOptionRound = useSelector(selectRound);
  const arraySelectedRound = useSelector(selectOptions);
  const arraySelectedLevel = arraySelectedRound.map((item) =>
    item.every((element) => element === 1) ? 1 : 0
  );
  const isModal = useSelector(selectIsModal);
  const hintLine = useSelector(selectHintLine);
  const canvasLineId = useSelector(selectCanvasLine);
  const selectedLine = useSelector(selectLine);
  const indexLine = Number(canvasLineId);
  const divHintLine = document.getElementById(hintLine);
  const canvasLine = document.querySelectorAll('[data-line]');
  const selectOptionsArray = useSelector(selectOptions);
  const selectedLevel = useSelector(selectLevel);
  const selectedRound = useSelector(selectRound);

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

  function continueRound() {
    if (!canvasLine[indexLine] || !divHintLine) return;
    if (selectedLine < QUANTITY_LINES - 1) {
      Array.from(canvasLine[indexLine].children).forEach((item) => {
        const puzzle = item as HTMLCanvasElement;
        puzzle.style.animation = 'none';
        puzzle.remove();
        divHintLine.appendChild(puzzle);
      });
      dispatch(setLine(selectedLine + 1));
    }
    if (selectedLine === QUANTITY_LINES - 1) {
      const copySelectedLevel = selectOptionsArray[selectedLevel].map(
        (item, index) => (index === selectedRound ? 1 : item)
      );
      const copyselectOptionsArray = selectOptionsArray.map((item, index) =>
        index === selectedLevel ? copySelectedLevel : item
      );
      dispatch(setSelectOption(copyselectOptionsArray));
      localStorage.setItem(
        'selectOptions',
        JSON.stringify(copyselectOptionsArray)
      );
      dispatch(setLine(0));
      if (selectedRound < selectOptionsArray[selectedLevel].length - 1) {
        dispatch(setRound(selectedRound + 1));
        localStorage.setItem('round', (selectedRound + 1).toString());
      }
      if (selectedRound === selectOptionsArray[selectedLevel].length - 1) {
        dispatch(setRound(0));
        localStorage.setItem('round', '0');
        if (selectedLevel < QUANTITY_LEVELS - 1) {
          dispatch(setLevel(selectedLevel + 1));
          localStorage.setItem('level', (selectedLevel + 1).toString());
        }
        if (selectedLevel === QUANTITY_LEVELS - 1) {
          dispatch(setLevel(0));
          localStorage.setItem('level', '0');
        }
      }
      dispatch(setIsTranslateHidden());
      dispatch(setIsSoundHidden());
      dispatch(setIsLineHintHidden());
      dispatch(setIsStatistic(false));
    }
    dispatch(setIsRound(true));
    dispatch(setIsCheck(true));
    dispatch(setIsContinue(false));
  }

  function closeModal() {
    dispatch(setClearModal());
    dispatch(setIsModal(false));
    dispatch(setIsStatistic(false));
    continueRound();
  }

  function logout() {
    localStorage.clear();
    dispatch(clearPlayField());
    dispatch(clearSelect());
    navigate('login');
  }

  return (
    <>
      {isLogin ? (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.wrapperSelect}>
              <SelectGroup
                arrSelect={arraySelectedLevel}
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
            <HintGroup />
            <Button content="Logout" onClick={logout} />
          </div>
          <PlayField />
          <ButtonGroup onClick={continueRound} />
          {isModal ? (
            <div className={styles.wrapperModal}>
              <StatisticWindow onClick={closeModal} />
            </div>
          ) : null}
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
