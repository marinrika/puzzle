import { useDispatch, useSelector } from 'react-redux';
import styles from './play-field.module.css';
import {
  selectImageHeigthNew,
  selectImageWidthNew,
  selectIsColor,
  selectIsRound,
  selectNewImage,
  setCanvasLine,
  setHintLine,
  setIsCheck,
} from '../../../../redux/slices/play-field-slice';
import Canvas from '../canvas/canvas';
import {
  selectLevel,
  selectLine,
  selectRound,
} from '../../../../redux/slices/select-slice';
import Puzzle from '../puzzle/puzzle';
import levelSelection from '../../../../data/levels/level-selection';
import sortArray from '../../../../utils/sort-array';
import { useEffect, useRef } from 'react';

const PlayField = () => {
  const dispatch = useDispatch();

  const isRound = useSelector(selectIsRound);
  const imageHeightNew = useSelector(selectImageHeigthNew);
  const imageWidthNew = useSelector(selectImageWidthNew);
  const selectedLevel = useSelector(selectLevel);
  const selectedRound = useSelector(selectRound);
  const selectedLine = useSelector(selectLine);
  const isColor = useSelector(selectIsColor);
  const src = useSelector(selectNewImage);

  const lineRef = useRef<HTMLDivElement>(null);
  const lineRefHint = useRef<HTMLDivElement>(null);

  function puzzlesArray(
    numberLine: number,
    onClick: React.MouseEventHandler<HTMLCanvasElement> = (event) =>
      movePuzzle(event),
    isColor: boolean
  ) {
    const lineLessons = levelSelection(selectedLevel + 1).rounds[
      selectedRound
    ].words[numberLine].textExample.split(' ');
    const arrForCommonLength: number[] = [];
    const commonArrLength = lineLessons.reduce(
      (sum: number, element: string) => {
        arrForCommonLength.push(sum);
        let temp: number = sum;
        temp += element.length;
        return temp;
      },
      0
    );
    return lineLessons.map((item, index) => (
      <Puzzle
        item={item}
        index={index}
        commonArrLength={commonArrLength}
        length={lineLessons.length}
        imageWidthNew={imageWidthNew}
        imageHeightNew={imageHeightNew}
        src={src}
        selectedLine={numberLine}
        arrForCommonLength={arrForCommonLength}
        onClick={onClick}
        isColor={isColor}
        key={index}
      />
    ));
  }

  const puzzlesArraySort = sortArray(
    puzzlesArray(selectedLine, (event) => movePuzzle(event), isColor)
  );

  const arrayLine = Array(10)
    .fill(0)
    .map((_line, index) =>
      index < selectedLine ? (
        <div
          className={styles.line}
          data-line
          id={index.toString()}
          key={index}
          style={{
            width: imageWidthNew,
            minHeight: imageHeightNew / 10,
            paddingLeft: ((imageHeightNew / 10) * (Math.sqrt(3) + 2)) / 14 + 2,
          }}>
          {puzzlesArray(index, () => {}, false)}
        </div>
      ) : (
        <div
          className={styles.line}
          id={index.toString()}
          data-line
          key={index}
          style={{
            width: imageWidthNew,
            minHeight: imageHeightNew / 10,
            paddingLeft: ((imageHeightNew / 10) * (Math.sqrt(3) + 2)) / 14 + 2,
          }}></div>
      )
    );

  const divLine = lineRef.current;
  const divLineHint = lineRefHint.current;

  useEffect(() => {
    if (!divLineHint || !divLine) return;
    const divLineSelectedId = divLine.children[selectedLine].id;
    const divLineHintId = divLineHint.id;
    dispatch(setCanvasLine(divLineSelectedId));
    dispatch(setHintLine(divLineHintId));
  }, [dispatch, divLine, divLineHint, selectedLine]);

  function movePuzzle(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (!divLineHint || !divLine) return;
    const puzzle = event.target as HTMLCanvasElement;
    const divLineSelected = divLine.children[selectedLine];
    const divLineSelectedId = divLineSelected.id;
    const divLineHintId = divLineHint.id;

    if (puzzle.parentElement?.id === 'line-hint') {
      divLineHint.removeChild(puzzle);
      divLineSelected.appendChild(puzzle);
      dispatch(setCanvasLine(divLineSelectedId));
      dispatch(setHintLine(divLineHintId));
    } else {
      Array.from(divLineSelected.children).forEach((element) => {
        const puzzle = element as HTMLCanvasElement;
        puzzle.style.animation = 'none';
      });
      divLineSelected.removeChild(puzzle);
      divLineHint.appendChild(puzzle);
      dispatch(setCanvasLine(divLineSelectedId));
      dispatch(setHintLine(divLineHintId));
    }

    if (divLineSelected.childNodes.length === puzzlesArraySort.length) {
      dispatch(setIsCheck(false));
    }
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.wrapperCanvas}
        style={{
          width: imageWidthNew,
          minHeight: imageHeightNew,
        }}>
        {/* {isRound ? (
          <div ref={lineRef}>{arrayLine}</div>
        ) : (
          <div className={styles.canvas}>
            <Canvas />
          </div>
        )} */}
        <div className={isRound ? '' : styles.nonWrapperLine} ref={lineRef}>
          {arrayLine}
        </div>

        <div className={isRound ? styles.nonCanvas : styles.canvas}>
          <Canvas />
        </div>
      </div>

      <div
        className={styles.line}
        ref={lineRefHint}
        id="line-hint"
        style={{
          width: imageWidthNew - 4,
          height: imageHeightNew / 10,
          paddingLeft: ((imageHeightNew / 10) * (Math.sqrt(3) + 2)) / 14 + 2,
        }}>
        {puzzlesArraySort}
      </div>
      {isRound ? null : <p>llllllll</p>}
    </div>
  );
};

export default PlayField;
