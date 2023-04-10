import { FcGoogle } from 'react-icons/fc';
import styles from './login.module.css';

const Login = () => {
  const login = async () => {
    console.log('login');
  };

  return (
    <div
      id={styles['Login']}
      className='d-flex justify-content-center align-items-center'
    >
      <div
        onClick={login}
        id={styles['login-button']}
        className='flex p-3 mb-3 bg-dark text-white rounded gap-3'
      >
        <FcGoogle className='m-auto' />
        Sign in with Google
      </div>
    </div>
  );
};

export default Login;
