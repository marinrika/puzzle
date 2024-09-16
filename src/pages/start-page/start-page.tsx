import styles from './start-page.module.css';
import Button from '../../components/Button/button';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');

  function goMainPage() {
    localStorage.setItem('isLogin', 'true');
    navigate('/');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperContent}>
        <h1 className={styles.title}>ENGLISH PUZZLE</h1>
        <div className={styles.content}>
          <h2 className={styles.subTitle}>
            Welcome {firstName} {lastName}!
          </h2>
        </div>
        <div className={styles.content}>
          Learn English by solving puzzles with works of art. Explore six levels
          of varying difficulty, each consisting of multiple rounds, with ten
          phrases in each round. Practice pronunciation with audio cues. Earn
          rewards at the end of each round while enjoying the view of world art
          masterpieces. Find out how many phrases out of ten you were able to
          assemble independently, reviewing the round statistics. Have fun
          gaming!
        </div>
        <Button content="Start game" onClick={goMainPage}></Button>
        <Navigate to="" />
      </div>
    </div>
  );
};

export default StartPage;
