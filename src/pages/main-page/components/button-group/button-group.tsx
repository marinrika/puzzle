import { useDispatch, useSelector } from 'react-redux';
import {
  selectCanvasLine,
  selectHintLine,
  selectIsCheck,
  selectIsContinue,
  selectIsRound,
  setIsCheck,
  setIsContinue,
  setIsRound,
} from '../../../../redux/slices/play-field-slice';
import Button from '../../../../components/Button/button';
import styles from './button-group.module.css';
import {
  // selectLevel,
  selectLine,
  selectRound,
  // setLevel,
  setLine,
  setRound,
} from '../../../../redux/slices/select-slice';

const ButtonGroup = () => {
  const dispatch = useDispatch();

  const isCheck = useSelector(selectIsCheck);
  const isContinue = useSelector(selectIsContinue);
  const canvasLineId = useSelector(selectCanvasLine);
  const hintLine = useSelector(selectHintLine);
  // const selectedLevel = useSelector(selectLevel);
  const selectedRound = useSelector(selectRound);
  const selectedLine = useSelector(selectLine);
  const indexLine = Number(canvasLineId);

  function checkLine() {
    const canvasLine = document.querySelectorAll('[data-line]');
    if (!canvasLine[indexLine]) return;
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
      dispatch(setIsContinue(true));
    }
    if (selectedLine === 9) {
      dispatch(setIsRound(false));
      // dispatch(setRound(selectedRound + 1));
      // dispatch(setLine(0));
    }
  }
  function continueRound() {
    const canvasLine = document.querySelectorAll('[data-line]');
    if (!canvasLine[indexLine]) return;
    const divHintLine = document.getElementById(hintLine);
    if (!divHintLine) return;
    Array.from(canvasLine[indexLine].children).forEach((item) => {
      const puzzle = item as HTMLCanvasElement;
      puzzle.style.animation = 'none';
      puzzle.remove();
      divHintLine.appendChild(puzzle);
    });
    console.log(selectedLine);
    if (selectedLine < 9) {
      dispatch(setLine(selectedLine + 1));
    }
    if (selectedLine === 9) {
      // dispatch(setIsRound(false));
      // dispatch(setRound(selectedRound + 1));
      // dispatch(setLine(0));
    }
    // dispatch(setLine(selectedLine + 1));
    dispatch(setIsRound(true));
    dispatch(setIsCheck(true));
    dispatch(setIsContinue(false));
  }

  function giveUpLine() {
    const canvasLine = document.querySelectorAll('[data-line]');
    if (!canvasLine[indexLine]) return;
    const divHintLine = document.getElementById(hintLine);
    if (!divHintLine) return;
    if (selectedLine < 9) {
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
    if (selectedLine === 9) {
      dispatch(setIsRound(false));
      divHintLine.remove();
    }

    dispatch(setIsContinue(true));
  }

  return (
    <div className={styles.wrapper}>
      <Button content="Give Up!" onClick={giveUpLine} />
      {isContinue ? (
        <Button content="Continue" onClick={continueRound} />
      ) : (
        <Button content="Check" disabled={isCheck} onClick={checkLine} />
      )}
    </div>
  );
};

export default ButtonGroup;
