import { useDispatch, useSelector } from 'react-redux';
import {
  selectCanvasLine,
  selectHintLine,
  selectIsCheck,
  selectIsContinue,
  setIsCheck,
  setIsContinue,
  setIsLineHintHidden,
  setIsRound,
  setIsSoundHidden,
  setIsTranslateHidden,
} from '../../../../redux/slices/play-field-slice';
import Button from '../../../../components/Button/button';
import styles from './button-group.module.css';
import {
  selectLevel,
  selectLine,
  selectOptions,
  selectRound,
  setLevel,
  setLine,
  setRound,
  setSelectOption,
} from '../../../../redux/slices/select-slice';
import {
  QUANTITY_LEVELS,
  QUANTITY_LINES,
} from '../../../../data/variables/variables';
import {
  selectIsStatistic,
  setIsModal,
  setIsStatistic,
  setModal,
} from '../../../../redux/slices/statistic-slice';
import levelSelection from '../../../../data/levels/level-selection';

const ButtonGroup = () => {
  const dispatch = useDispatch();

  const isCheck = useSelector(selectIsCheck);
  const isContinue = useSelector(selectIsContinue);
  const canvasLineId = useSelector(selectCanvasLine);
  const hintLine = useSelector(selectHintLine);
  const selectedLevel = useSelector(selectLevel);
  const selectedRound = useSelector(selectRound);
  const selectOptionsArray = useSelector(selectOptions);
  const selectedLine = useSelector(selectLine);
  const indexLine = Number(canvasLineId);
  const divHintLine = document.getElementById(hintLine);
  const canvasLine = document.querySelectorAll('[data-line]');
  const isStatistic = useSelector(selectIsStatistic);

  function checkLine() {
    if (!canvasLine[indexLine] || !divHintLine) return;

    Array.from(canvasLine[indexLine].children).forEach((element, index) => {
      const puzzle = element as HTMLCanvasElement;
      if (puzzle.id === index.toString()) {
        puzzle.style.animation = 'shadowGreen 3s ease-in';
      } else {
        puzzle.style.animation = 'shadowRed 3s ease-in';
      }
    });
    if (
      Array.from(canvasLine[indexLine].children).every(
        (item, index) => item.id === index.toString()
      )
    ) {
      dispatch(
        setModal({
          content: levelSelection(selectedLevel + 1).rounds[selectedRound]
            .words[selectedLine].textExample,
          giveUp: false,
        })
      );
      dispatch(setIsContinue(true));
    }

    if (selectedLine === QUANTITY_LINES - 1) {
      if (
        Array.from(canvasLine[indexLine].children).every(
          (item, index) => item.id === index.toString()
        )
      ) {
        Array.from(canvasLine[indexLine].children).forEach((item) => {
          const puzzle = item as HTMLCanvasElement;
          puzzle.style.animation = 'none';
          puzzle.remove();
          divHintLine.appendChild(puzzle);
        });
        dispatch(setIsStatistic(true));
        dispatch(setIsTranslateHidden());
        dispatch(setIsSoundHidden());
        dispatch(setIsLineHintHidden());
        dispatch(setIsRound(false));
      }
    }
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

  function giveUpLine() {
    if (!canvasLine[indexLine] || !divHintLine) return;
    if (selectedLine < QUANTITY_LINES - 1) {
      if (Array.from(canvasLine[indexLine].children).length !== 0) {
        Array.from(canvasLine[indexLine].children).forEach((item) => {
          const puzzle = item as HTMLCanvasElement;
          puzzle.style.animation = 'none';
          puzzle.remove();
          divHintLine.appendChild(puzzle);
        });
      }
      Array.from(divHintLine.children)
        .sort((a, b) => Number(a.id) - Number(b.id))
        .forEach((item) => {
          const puzzle = item as HTMLCanvasElement;
          puzzle.style.animation = 'none';
          puzzle.remove();
          canvasLine[indexLine].appendChild(puzzle);
        });
    }
    if (selectedLine === QUANTITY_LINES - 1) {
      dispatch(setIsStatistic(true));
      dispatch(setIsTranslateHidden());
      dispatch(setIsSoundHidden());
      dispatch(setIsLineHintHidden());
      dispatch(setIsRound(false));
    }
    dispatch(
      setModal({
        content: levelSelection(selectedLevel + 1).rounds[selectedRound].words[
          selectedLine
        ].textExample,
        giveUp: true,
      })
    );
    dispatch(setIsContinue(true));
  }

  function handleModalWindow() {
    dispatch(setIsModal(true));
  }

  return (
    <div className={styles.wrapper}>
      {isStatistic ? (
        <Button
          content="Statistic"
          onClick={handleModalWindow}
          name="statistic"
        />
      ) : (
        <Button content="Give Up!" onClick={giveUpLine} />
      )}

      {isContinue ? (
        <Button content="Continue" onClick={continueRound} />
      ) : (
        <Button content="Check" disabled={isCheck} onClick={checkLine} />
      )}
    </div>
  );
};

export default ButtonGroup;
