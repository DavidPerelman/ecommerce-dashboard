import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styles from './products.module.css';
import Link from 'next/link';
import { db } from '@/utils/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const AllProductsList = () => {
  const [products, setProducts] = useState([
    // {
    //   id: 'p1',
    //   title: 'Samsung Galaxy A52',
    //   category: 'Phones',
    //   price: 500,
    //   thumbnail:
    //     '/images/products/phones/sa-en-galaxy-a52-a525-sm-a525fzkhmea-475124311.png',
    // },
    // {
    //   id: 'p2',
    //   title: 'AirPods Pro (2nd generation)',
    //   category: 'AirPods',
    //   price: 249,
    //   thumbnail: '/images/products/airPods/MQD83.jpg',
    // },
  ]);

  const getProducts = async () => {
    const collectionRef = collection(db, 'products');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  useEffect(() => {
    getProducts();
  }, []);

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

export default AllProductsList;
