import { useDispatch, useSelector } from 'react-redux';
import styles from './play-field.module.css';
import {
  selectImageHeigthNew,
  selectImageWidthNew,
  selectIsColor,
  selectIsLineHintHidden,
  selectIsRound,
  selectIsSound,
  selectIsSoundHidden,
  selectIsTranslate,
  selectIsTranslateHidden,
  selectNewImage,
  setCanvasLine,
  setHintLine,
  setIsCheck,
  setIsContinue,
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
import { QUANTITY_LINES } from '../../../../data/variables/variables';
import soundPlay from '../../../../utils/sound';

const PlayField = () => {
  const dispatch = useDispatch();

  const isRound = useSelector(selectIsRound);
  const imageHeightNew = useSelector(selectImageHeigthNew);
  const imageWidthNew = useSelector(selectImageWidthNew);
  const selectedLevel = useSelector(selectLevel);
  const selectedRound = useSelector(selectRound);
  const selectedLine = useSelector(selectLine);
  const isColor = useSelector(selectIsColor);
  const isTranslate = useSelector(selectIsTranslate);
  const isSound = useSelector(selectIsSound);
  const src = useSelector(selectNewImage);
  const isTranslateHidden = useSelector(selectIsTranslateHidden);
  const isSoundHidden = useSelector(selectIsSoundHidden);
  const isLineHintHidden = useSelector(selectIsLineHintHidden);

  const lineRef = useRef<HTMLDivElement>(null);
  const lineRefHint = useRef<HTMLDivElement>(null);

  const description = `${
    levelSelection(selectedLevel + 1).rounds[selectedRound].levelData.author
  } - ${
    levelSelection(selectedLevel + 1).rounds[selectedRound].levelData.name
  } (${
    levelSelection(selectedLevel + 1).rounds[selectedRound].levelData.year
  })`;
  const translate = levelSelection(selectedLevel + 1).rounds[selectedRound]
    .words[selectedLine].textExampleTranslate;

  function puzzlesArray(
    numberLine: number,
    onClick: React.MouseEventHandler<HTMLCanvasElement> = (event) =>
      movePuzzle(event),
    isColor: boolean,
    draggable: boolean
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
        draggable={draggable}
        key={index}
      />
    ));
  }

  const puzzlesArraySort = sortArray(
    puzzlesArray(selectedLine, (event) => movePuzzle(event), isColor, true)
  );

  const arrayLine = Array(QUANTITY_LINES)
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
            minHeight: imageHeightNew / QUANTITY_LINES,
            paddingLeft:
              ((imageHeightNew / QUANTITY_LINES) * (Math.sqrt(3) + 2)) / 14 + 2,
          }}>
          {puzzlesArray(index, () => {}, false, false)}
        </div>
      ) : (
        <div
          className={styles.line}
          id={index.toString()}
          data-line
          key={index}
          style={{
            width: imageWidthNew,
            minHeight: imageHeightNew / QUANTITY_LINES,
            paddingLeft:
              ((imageHeightNew / QUANTITY_LINES) * (Math.sqrt(3) + 2)) / 14 + 2,
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
    } else {
      dispatch(setIsCheck(true));
      dispatch(setIsContinue(false));
    }
  }

  function play(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const sound = soundPlay(selectedLevel, selectedRound, selectedLine);
    const divSound = event.target as HTMLDivElement;
    sound.play();
    sound.onplay = () => (divSound.style.animation = 'sound 0.4s infinite');
    sound.onended = () => (divSound.style.animation = 'none');
  }

  return (
    <div className={styles.wrapper}>
      {isSound ? null : (
        <div
          className={
            isSoundHidden ? styles.buttonHintHidden : styles.buttonHint
          }
          onClick={(event) => play(event)}>
          <img src="../../../assets/images/soundOn.png" />
        </div>
      )}
      {isTranslate ? null : (
        <div
          className={
            isTranslateHidden ? styles.commonDivHidden : styles.commonDiv
          }>
          {translate}
        </div>
      )}
      <div
        className={styles.wrapperCanvas}
        style={{
          width: imageWidthNew,
          minHeight: imageHeightNew,
        }}>
        <div className={isRound ? '' : styles.nonWrapperLine} ref={lineRef}>
          {arrayLine}
        </div>

        <div className={isRound ? styles.nonCanvas : styles.canvas}>
          <Canvas />
        </div>
      </div>

      <div
        className={isLineHintHidden ? styles.lineHidden : styles.line}
        ref={lineRefHint}
        id="line-hint"
        style={{
          width: imageWidthNew - 4,
          height: imageHeightNew / QUANTITY_LINES,
          paddingLeft:
            ((imageHeightNew / QUANTITY_LINES) * (Math.sqrt(3) + 2)) / 14 + 2,
        }}>
        {puzzlesArraySort}
      </div>
      {isRound ? null : <div className={styles.commonDiv}>{description}</div>}
    </div>
  );
};

export default PlayField;
