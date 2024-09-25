import { useDispatch, useSelector } from 'react-redux';
import styles from './statistic-window.module.css';
import {
  selectLevel,
  selectRound,
} from '../../../../redux/slices/select-slice';
import levelSelection from '../../../../data/levels/level-selection';
import {
  selectModal,
  setClearModal,
  setIsModal,
  setIsStatistic,
} from '../../../../redux/slices/statistic-slice';
import { selectNewImage } from '../../../../redux/slices/play-field-slice';
import Button from '../../../../components/Button/button';

const StatisticWindow = () => {
  const dispatch = useDispatch();

  const selectedLevel = useSelector(selectLevel);
  const selectedRound = useSelector(selectRound);
  const modalArray = useSelector(selectModal);
  const src = useSelector(selectNewImage);

  const image = new Image();
  image.src = src;

  const giveUpArray = modalArray.filter((item) => item.giveUp === true);
  const notGiveUpArray = modalArray.filter((item) => item.giveUp === false);

  const description = `${
    levelSelection(selectedLevel + 1).rounds[selectedRound].levelData.author
  } - ${
    levelSelection(selectedLevel + 1).rounds[selectedRound].levelData.name
  } (${
    levelSelection(selectedLevel + 1).rounds[selectedRound].levelData.year
  })`;

  function continueRound() {
    dispatch(setClearModal());
    dispatch(setIsModal(false));
    dispatch(setIsStatistic(false));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <img src={src} alt="image" style={{ width: 250 }} />
        {description}
      </div>
      <div className={styles.title}>{`Give Up (${giveUpArray.length})`}</div>
      <div className={styles.content}>
        {giveUpArray.map((item, index) => (
          <div key={index} className={styles.lesson}>
            <img
              src="../../../assets/images/soundOn.png"
              className={styles.image}
            />
            {item.content}
          </div>
        ))}
      </div>
      <div
        className={styles.title}
      >{`Dont't Give Up (${notGiveUpArray.length})`}</div>
      <div className={styles.content}>
        {notGiveUpArray.map((item, index) => (
          <div key={index} className={styles.lesson}>
            <img
              src="../../../assets/images/soundOn.png"
              className={styles.image}
            />
            {item.content}
          </div>
        ))}
      </div>
      <div style={{ alignSelf: 'center' }}>
        <Button content="Continue" onClick={continueRound} />
      </div>
    </div>
  );
};

export default StatisticWindow;
