import React, { useState } from 'react';
import styles from './new-product.module.css';
import Image from 'next/image';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'next/router';

const NewProductPage = () => {
  const route = useRouter();
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    thumbnail: '',
  });
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const [categories, setCategories] = useState([
    { id: 'c1', title: 'Phones' },
    { id: 'c2', title: 'AirPods' },
  ]);

  const changeCategoryHandler = (e) => {
    e.preventDefault();

    console.log('fdfd');

    for (let i = 0; i < categories.length; i++) {
      console.log(categories[i].id === e.target.value);

      setNewProduct((params) => ({
        ...params, // Reuse the previous properties
        category: categories[i], // Overwrite the new ones
      }));
    }
  };

  const inputChangeHandler = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setNewProduct((params) => ({
        ...params, // Reuse the previous properties
        thumbnail: `/products-images/${e.target.files[0].name}`, // Overwrite the new ones
      }));
    } else {
      setNewProduct((params) => ({
        ...params, // Reuse the previous properties
        thumbnail: '', // Overwrite the new ones
      }));
    }
  };

  const isObjEmpty = async (obj) => {
    return Object.values(obj).length === 0 && obj.constructor === Object;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const property in newProduct) {
      if (newProduct[property] === '') {
        return console.log('All fields require!');
      }
    }

    if (selectedFile) {
      const body = new FormData();
      body.append('file', selectedFile);
      const response = await fetch('/api/upload/c1', {
        method: 'POST',
        body,
      });

      const data = await response.json();
      const failedUploadedImage = await isObjEmpty(data);

      if (failedUploadedImage) {
        return console.log('No image found!');
      } else {
        const collectionRef = collection(db, 'products');
        const productAdded = await addDoc(collectionRef, {
          ...newProduct,
          timestamp: serverTimestamp(),
        });

        if (productAdded) {
          route.push('/');
        }
      }
    }
  };

  return (
    <div className={styles.NewProductPage}>
      <form onSubmit={handleSubmit} className='row g-3'>
        <div className='col-md-6'>
          <label htmlFor='inputTitle4' className='form-label'>
            Title:
          </label>
          <input
            type='text'
            className='form-control'
            id='inputTitle4'
            onChange={(e) =>
              setNewProduct((params) => ({
                ...params, // Reuse the previous properties
                title: e.target.value, // Overwrite the new ones
              }))
            }
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor='inputCategory' className='form-label'>
            Category:
          </label>
          <select
            onChange={(e) => changeCategoryHandler(e)}
            // onChange={handleChange}
            id='inputCategory'
            className='form-select'
          >
            <option disabled value>
              Choose Category...
            </option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className='col-12'>
          <label htmlFor='inputDescription' className='form-label'>
            Description:
          </label>
          <input
            type='text'
            className='form-control'
            id='inputDescription'
            onChange={(e) =>
              setNewProduct((params) => ({
                ...params, // Reuse the previous properties
                description: e.target.value, // Overwrite the new ones
              }))
            }
          />
        </div>
        <div className='col-md-2'>
          <label htmlFor='inputPrice' className='form-label'>
            Price:
          </label>
          <input
            type='text'
            className='form-control'
            id='inputPrice'
            onChange={(e) =>
              setNewProduct((params) => ({
                ...params, // Reuse the previous properties
                price: e.target.value, // Overwrite the new ones
              }))
            }
          />
        </div>
        <div className='col-md-3'></div>
        <div className='col-md-3'></div>
        <div className='col-md-3'></div>
        <div className='col-md-3'>
          <label htmlFor='inputThumbnail' className='form-label'>
            Thumbnail:
          </label>
          <input
            type='file'
            className='form-control'
            id='inputThumbnail'
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProductPage;
