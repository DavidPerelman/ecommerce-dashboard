import Image from 'next/image';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const Products = () => {
  const [products, setProducts] = useState([
    {
      title: 'Samsung Galaxy A52',
      category: 'Phones',
      price: 500,
      image: '/images/sa-en-galaxy-a52-a525-sm-a525fzkhmea-475124311.png',
    },
    {
      title: 'AirPods Pro (2nd generation)',
      category: 'AirPods',
      price: 249,
      image: '/images/MQD83.jpg',
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
  ];

  return (
    <div>
      <h1>Products</h1>
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default Products;
