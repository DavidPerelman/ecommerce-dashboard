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
  const [selectedFile, setSelectedFile] = useState();

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

  const inputChangeHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append('file', selectedFile);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body,
    });

    return await response.json();
  };

  const isObjEmpty = async (obj) => {
    return Object.values(obj).length === 0 && obj.constructor === Object;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadImage = await uploadToServer();
    const failedUploadedImage = await isObjEmpty(uploadImage);
    if (!failedUploadedImage) {
      console.log(uploadImage.file.name);
      setNewProduct({
        title: productTitleRef.current.value,
        category: productCategoryRef.current.value,
        description: productDescriptionRef.current.value,
        price: productPriceRef.current.value,
        thumbnail: `/products-images/${uploadImage.file.name}`,
      });
      console.log(newProduct);
    } else {
      console.log('error');
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
          <label htmlFor='inputPrice' className='form-label'>
            Price:
          </label>
          <input
            ref={productPriceRef}
            type='text'
            className='form-control'
            id='inputPrice'
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
            // hidden
            type='file'
            // className='form-control'
            id='inputThumbnail'
            onChange={(e) => inputChangeHandler(e)}
          />
          <button
            className='btn btn-primary'
            type='submit'
            onClick={uploadToServer}
          >
            Send to server
          </button>
          {/* <div>
            {selectedImage ? (
              <Image src={selectedImage} alt='' />
            ) : (
              <div
                id={styles['input-thumbnail-input']}
                className='d-flex justify-content-center align-items-center rounded'
              >
                Select Image
              </div>
            )}
          </div> */}
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
