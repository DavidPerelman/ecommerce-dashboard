import React, { useRef, useState } from 'react';
import styles from './new-product.module.css';
import Image from 'next/image';

const NewProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    thumbnail: '',
  });
  const [selectedImage, setSelectedImage] = useState('');
  const [categories, setCategories] = useState([
    { id: 'c1', title: 'Phones' },
    { id: 'c2', title: 'AirPods' },
  ]);

  const productTitleRef = useRef();
  const productCategoryRef = useRef();
  const productDescriptionRef = useRef();
  const productPriceRef = useRef();

  const handleChange = (e) => {
    const selectedId = e.target.value;
    console.log(selectedId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewProduct({
      title: productTitleRef.current.value,
      category: productCategoryRef.current.value,
      description: productDescriptionRef.current.value,
      price: productPriceRef.current.value,
    });
    console.log(newProduct);
  };

  return (
    <div className={styles.NewProductPage}>
      <form onSubmit={handleSubmit} className='row g-3'>
        <div className='col-md-6'>
          <label htmlFor='inputTitle4' className='form-label'>
            Title:
          </label>
          <input
            ref={productTitleRef}
            type='text'
            className='form-control'
            id='inputTitle4'
          />
        </div>
        <div className='col-md-6'>
          <label htmlFor='inputCategory' className='form-label'>
            Category:
          </label>
          <select
            onChange={handleChange}
            id='inputCategory'
            className='form-select'
          >
            <option disabled value>
              Choose Category...
            </option>
            {categories.map((category) => {
              return (
                <option
                  key={category.id}
                  value={category.id}
                  ref={productCategoryRef}
                >
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
            ref={productDescriptionRef}
            type='text'
            className='form-control'
            id='inputDescription'
          />
        </div>
        <div className='col-md-2'>
          <label htmlFor='inputZip' className='form-label'>
            Price:
          </label>
          <input
            ref={productPriceRef}
            type='text'
            className='form-control'
            id='inputZip'
          />
        </div>
        <div className='col-md-3'>
          <label htmlFor='inputThumbnail' className='form-label'>
            Thumbnail:
          </label>
          <input
            ref={productPriceRef}
            hidden
            type='file'
            className='form-control'
            id='inputThumbnail'
          />
          <div>
            {selectedImage ? (
              <Image src={selectedImage} alt='' />
            ) : (
              <button className='btn btn-secondary'>Select Image</button>
            )}
          </div>
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
