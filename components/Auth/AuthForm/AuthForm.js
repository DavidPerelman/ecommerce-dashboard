import { useContext, useRef, useState } from 'react';
import classes from './AuthForm.module.css';
import Modal from '@/components/UI/Modal/Modal';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState('');

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log(enteredEmail);
    console.log(enteredPassword);

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!enteredEmail || !enteredPassword) {
      setError('All fields require!');
      return;
    } else {
      if (!regex.test(enteredEmail)) {
        setError('The email address is not valid!');
        clearError();
        return;
      }

      if (enteredPassword.length < 7) {
        setError('The password must contain at least 6 characters!');
        clearError();
        return;
      }
    }
  };

  return (
    <>
      {error && (
        <Modal>
          <div className='alert alert-danger text-center' role='alert'>
            {error}
          </div>
          <button
            onClick={() => setError('')}
            type='button'
            className='btn btn-primary'
          >
            Close
          </button>
        </Modal>
      )}
      {isLoading && (
        <Modal>
          <h1 className={classes.loadingModalHeader}>Loading...</h1>
          <div className={classes.loadingSpinner}>
            <LoadingSpinner />
          </div>
        </Modal>
      )}
      <section className={classes.auth}>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button type='submit'>Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthForm;
