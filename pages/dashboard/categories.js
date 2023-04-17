import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styles from './categories.module.css';
import { db } from '@/utils/firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const AllCategoriesList = ({ startingCategories }) => {
  const [categories, setCategories] = useState(startingCategories);

  console.log(categories);
  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Id',
      selector: (row) => row.id,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <button onClick={() => console.log(row.id)}>delete</button>
          <button onClick={() => console.log(row.id)}>edit</button>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <div>
      <h1>Categories</h1>
      <Link href='/categories/new-category'>
        <button id={styles['new-product-button']} className='btn btn-primary'>
          Add new category
        </button>
      </Link>
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export async function getStaticProps(context) {
  const collectionRef = collection(db, 'categories');

  const querySnapshot = await getDocs(collectionRef);
  if (querySnapshot.empty) {
    return {
      props: {
        products: [],
      },
    };
  }

  const categories = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    // id: doc.id,
  }));

  return {
    props: { startingCategories: JSON.parse(JSON.stringify(categories)) }, // will be passed to the page component as props
  };
}

export default AllCategoriesList;
