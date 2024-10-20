import { useDispatch, useSelector } from 'react-redux';
import {
  selectCanvasLine,
  selectHintLine,
  selectIsCheck,
  selectIsContinue,
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
  selectRound,
} from '../../../../redux/slices/select-slice';
import { QUANTITY_LINES } from '../../../../data/variables/variables';
import {
  selectIsStatistic,
  setIsModal,
  setIsStatistic,
  setModal,
} from '../../../../redux/slices/statistic-slice';
import levelSelection from '../../../../data/levels/level-selection';
import { ContinueRound } from '../../../../interfaces/interfaces';

const ButtonGroup = ({ onClick }: ContinueRound) => {
  const dispatch = useDispatch();

  const isCheck = useSelector(selectIsCheck);
  const isContinue = useSelector(selectIsContinue);
  const canvasLineId = useSelector(selectCanvasLine);
  const hintLine = useSelector(selectHintLine);
  const selectedLevel = useSelector(selectLevel);
  const selectedRound = useSelector(selectRound);
  const selectedLine = useSelector(selectLine);
  const indexLine = Number(canvasLineId);
  const divHintLine = document.getElementById(hintLine);
  const canvasLine = document.querySelectorAll('[data-line]');
  const isStatistic = useSelector(selectIsStatistic);

  function checkLine() {
    if (!canvasLine[indexLine] || !divHintLine) return;

    Array.from(canvasLine[indexLine].children).forEach((element, index) => {
      console.log('fffff');
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
          line: selectedLine,
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
        line: selectedLine,
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
        <Button content="Continue" onClick={onClick} />
      ) : (
        <Button content="Check" disabled={isCheck} onClick={checkLine} />
      )}
    </div>
  );
};

export default ButtonGroup;
