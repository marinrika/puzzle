import { FormEvent, useState } from 'react';
import Input from './components/input';
import styles from './login-page.module.css';
import Button from '../../components/Button/button';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const regex: RegExp = /^[A-Z][a-zA-Z-]*$/;

  const lengthFirst = 3;
  const lengthLast = 4;

  const [isValidFirst, setIsValidFirst] = useState(false);
  const [isValidLast, setIsValidLast] = useState(false);
  const [isValidFirstError, setIsValidFirstError] = useState(true);
  const [isValidLastError, setIsValidLastError] = useState(true);

  function handleInputChangeFirst(e: React.ChangeEvent<HTMLInputElement>) {
    if (!regex.test(e.target.value) || e.target.value.length < lengthFirst) {
      setIsValidFirstError(false);
    } else {
      setIsValidFirstError(true);
      setIsValidFirst(true);
      localStorage.setItem('firstName', e.target.value);
    }
  }

  function handleInputChangeLast(e: React.ChangeEvent<HTMLInputElement>) {
    if (!regex.test(e.target.value) || e.target.value.length < lengthLast) {
      setIsValidLastError(false);
    } else {
      setIsValidLastError(true);
      setIsValidLast(true);
      localStorage.setItem('lastName', e.target.value);
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isValidFirst && isValidLast) {
      navigate('/start');
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.inputForm} onSubmit={handleFormSubmit}>
        <Input
          placeholder="First name"
          length={lengthFirst}
          onChangeFirst={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChangeFirst(event)
          }
          isValid={isValidFirstError}
        />
        <Input
          placeholder="Last name"
          length={lengthLast}
          onChangeLast={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChangeLast(event)
          }
          isValid={isValidLastError}
        />
        {isValidFirst && isValidLast ? (
          <Button content="Login" type="submit"></Button>
        ) : (
          <Button content="Login" type="submit" disabled={true}></Button>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
