import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [loggedin, setLoggedin] = useState(false);

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      {loggedin && (
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
          <Link className='navbar-brand' href='/'>
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
