import { FcGoogle } from 'react-icons/fc';
import styles from './login.module.css';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

const Login = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();

  const login = async () => {
    console.log('login');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push('/auth/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push('/auth/dashboard');
    }
  }, [user, route]);

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
