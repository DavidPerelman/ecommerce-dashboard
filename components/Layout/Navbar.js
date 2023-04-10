import { auth } from '@/utils/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  const logout = () => {
    auth.signOut();
    route.push('/auth/login');
  };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      {user && (
        <div className='container-fluid'>
          <Link className='navbar-brand' href='/'>
            Dashboard
          </Link>
          <Link className='navbar-brand' href='/'>
            Products
          </Link>
          <Link className='navbar-brand' href='/'>
            Users
          </Link>
          <Link className='navbar-brand' href='/'>
            Orders
          </Link>
          <button onClick={logout} className='navbar-brand btn-light'>
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
