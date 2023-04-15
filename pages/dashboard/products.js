import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styles from './products.module.css';
import Link from 'next/link';
import { db } from '@/utils/firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const AllProductsList = ({ startingProducts }) => {
  const [products, setProducts] = useState(startingProducts);

  const columns = [
    {
      name: '#',
      selector: (row) => (
        <Image src={row.thumbnail} alt='me' width='64' height='64' />
      ),
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category.title,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
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
    <div className={styles.AllProductsList}>
      <Link href='/products/new-product'>
        <button id={styles['new-product-button']} className='btn btn-primary'>
          Add new product
        </button>
      </Link>
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export async function getStaticProps(context) {
  const collectionRef = collection(db, 'products');

  const querySnapshot = await getDocs(collectionRef);
  if (querySnapshot.empty) {
    return {
      props: {
        products: [],
      },
    };
  }

  const products = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return {
    props: { startingProducts: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default AllProductsList;
