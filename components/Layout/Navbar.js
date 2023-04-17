import { auth } from '@/utils/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './Navbar.module.css';

const Navbar = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  const loginPage = route.pathname === '/auth/login';

  const logout = () => {
    auth.signOut();
    return route.push('/auth/login');
  };

  return (
    <>
      {!loginPage && (
        <nav className='navbar navbar-expand-lg bg-body-tertiary bg-info'>
          {user && (
            <div className='container-fluid'>
              <Link className='navbar-brand' href='/'>
                Dashboard
              </Link>
              <Link className='navbar-brand' href='/dashboard/products'>
                Products
              </Link>
              <Link className='navbar-brand' href='/dashboard/categoriess'>
                Categories
              </Link>
              <Link className='navbar-brand' href='/dashboard/users'>
                Users
              </Link>
              <Link className='navbar-brand' href='/dashboard/orders'>
                Orders
              </Link>
              <div
                id={styles['logout-button']}
                onClick={logout}
                className='navbar-brand'
              >
                Sign out
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
