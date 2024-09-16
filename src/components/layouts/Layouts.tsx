import { Navigate } from 'react-router-dom';

const Layouts = () => {
  return (
    <>
      {localStorage.getItem('firstName') ? (
        <Navigate to="start" />
      ) : (
        <Navigate to="login" />
      )}
    </>
  );
};

export default Layouts;
