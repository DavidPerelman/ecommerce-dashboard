import React, { useState } from 'react';
import styles from './new-product.module.css';
import Image from 'next/image';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@/components/UI/Modal/Modal';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';

const NewProductPage = () => {
  const route = useRouter();
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
  });

  const [selectedImage, setSelectedImage] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const [imageThumbnail, setImageThumbnail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([
    { id: 'c1', title: 'Phones' },
    { id: 'c2', title: 'AirPods' },
  ]);

  const changeCategoryHandler = (e) => {
    e.preventDefault();

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === e.target.value) {
        setNewProduct((params) => ({
          ...params, // Reuse the previous properties
          category: categories[i], // Overwrite the new ones
        }));
      }
    }
  };

  const inputChangeHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.files.length);
    if (e.target.files && e.target.files[0] && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImageThumbnail(URL.createObjectURL(file));
      setImageSelected(true);
    } else {
      setImageSelected(false);
    }
  };

  const uploadImageToStorage = async (imageRef) => {
    const image = await uploadBytes(imageRef, selectedImage);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (imageSelected) {
      const newProductObject = Object.values(newProduct);
      for (let i = 0; i < newProductObject.length - 1; i++) {
        if (newProductObject[i] === '') {
          setLoading(false);
          return setError('All fields require!');
        }
      }

      const imageName = `image-${uuidv4()}`;

      const imageRef = ref(
        storage,
        `images/${newProduct.category.title}/${imageName}`
      );

      const url = await uploadImageToStorage(imageRef);

      if (url) {
        const collectionRef = collection(db, 'products');
        addDoc(collectionRef, {
          ...newProduct,
          thumbnail: url,
          timestamp: serverTimestamp(),
        })
          .then((data) => {
            if (data) {
              setLoading(false);
              route.push('/dashboard/products');
            }
          })
          .catch((error) => {
            setLoading(false);
            return setError(error);
          });
      } else {
        setLoading(false);
        return setError('error');
      }
    } else {
      setLoading(false);
      return setError('All fields require!');
    }
  };

  return (
    <div className={styles.NewProductPage}>
      {error && (
        <Modal>
          <div className='alert alert-danger text-center' role='alert'>
            {error}
          </div>
          <button
            onClick={() => setError('')}
            type='button'
            className='btn btn-primary'
          >
            Close
          </button>
        </Modal>
      )}
      {loading && (
        <Modal>
          <h1 className={styles.loadingModalHeader}>Loading...</h1>
          <div className={styles.loadingSpinner}>
            <LoadingSpinner />
          </div>
        </Modal>
      )}
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
            defaultValue={'default'}
          >
            <option value={'default'} disabled>
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
        {/* <div className='col-md-3'></div> */}
        {/* <div className='col-md-3'></div> */}
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
        {imageSelected ? (
          <div className='col-md-3'>
            <Image src={imageThumbnail} alt='' width={70} height={70} />
          </div>
        ) : (
          ''
        )}
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
