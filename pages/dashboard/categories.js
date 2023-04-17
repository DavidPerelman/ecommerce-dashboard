import Link from 'next/link';
import React from 'react';
import styles from './categories.module.css';

const Categories = () => {
  return (
    <div>
      <h1>Categories</h1>
      <Link href='/categories/new-category'>
        <button id={styles['new-product-button']} className='btn btn-primary'>
          Add new category
        </button>
      </Link>
    </div>
  );
};

export default Categories;
