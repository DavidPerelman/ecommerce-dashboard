import Image from 'next/image';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import styles from './products.modules.css';

const AllProductsList = () => {
  const [products, setProducts] = useState([
    {
      id: 'p1',
      title: 'Samsung Galaxy A52',
      category: 'Phones',
      price: 500,
      image:
        '/images/products/phones/sa-en-galaxy-a52-a525-sm-a525fzkhmea-475124311.png',
    },
    {
      id: 'p2',
      title: 'AirPods Pro (2nd generation)',
      category: 'AirPods',
      price: 249,
      image: '/images/products/airPods/MQD83.jpg',
    },
  ]);

  const columns = [
    {
      name: '#',
      selector: (row) => (
        <Image src={row.image} alt='me' width='64' height='64' />
      ),
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
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
      <button className='btn btn-primary'>Add new product</button>
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default AllProductsList;
