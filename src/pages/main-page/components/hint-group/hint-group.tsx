import { useDispatch, useSelector } from 'react-redux';
import styles from './hint-group.module.css';
import {
  selectIsColor,
  selectIsSound,
  selectIsTranslate,
  setIsColor,
  setIsSound,
  setIsTranslate,
} from '../../../../redux/slices/play-field-slice';

function HintGroup() {
  const dispatch = useDispatch();

  const isColor = useSelector(selectIsColor);
  const isSound = useSelector(selectIsSound);
  const IsTranslate = useSelector(selectIsTranslate);

  function soundHint() {
    dispatch(setIsSound());
  }

  function translateHint() {
    dispatch(setIsTranslate());
  }

  function colorHint() {
    dispatch(setIsColor());
  }

  return (
    <div className={styles.wrapper}>
      <div
        onClick={soundHint}
        className={styles.hint}
        title={isSound ? 'Turn on sound' : 'Turn off sound'}>
        {isSound ? (
          <img
            src="../../../assets/images/audioOff.png"
            style={{ width: 40 }}
          />
        ) : (
          <img src="../../../assets/images/audioOn.png" style={{ width: 40 }} />
        )}
      </div>
      <div
        onClick={translateHint}
        className={styles.hint}
        title={IsTranslate ? 'Turn on translation' : 'Turn off translation'}>
        {IsTranslate ? (
          <img
            src="../../../assets/images/translateOff.png"
            style={{ width: 40 }}
          />
        ) : (
          <img
            src="../../../assets/images/translateOn.png"
            style={{ width: 40 }}
          />
        )}
      </div>
      <div
        onClick={colorHint}
        className={styles.hint}
        title={isColor ? 'Turn on image' : 'Turn off image'}>
        {isColor ? (
          <img
            src="../../../assets/images/puzzleOff.png"
            style={{ width: 40 }}
          />
        ) : (
          <img
            src="../../../assets/images/puzzleOn.png"
            style={{ width: 40 }}
          />
        )}
      </div>
    </div>
  );
}

export default HintGroup;
