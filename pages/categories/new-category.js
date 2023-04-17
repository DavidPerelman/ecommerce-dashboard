import React, { useState } from 'react';
import styles from './new-category.module.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@/components/UI/Modal/Modal';
import LoadingSpinner from '@/components/UI/LoadingSpinner/LoadingSpinner';

const NewCategoryPage = () => {
  const route = useRouter();
  const [newCategory, setNewCategory] = useState({
    title: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newCategory.title === '');
    setLoading(true);

    if (newCategory.title !== '') {
      const collectionRef = collection(db, 'categories');
      addDoc(collectionRef, {
        ...newCategory,
        id: uuidv4(),
        timestamp: serverTimestamp(),
      })
        .then((data) => {
          if (data) {
            setLoading(false);
            route.push('/dashboard/categories');
          }
        })
        .catch((error) => {
          setLoading(false);
          return setError(error);
        });
    } else {
      setLoading(false);
      return setError('All fields require!');
    }
  };

  return (
    <div className={styles.NewCategoryPage}>
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
              setNewCategory((params) => ({
                ...params, // Reuse the previous properties
                title: e.target.value, // Overwrite the new ones
              }))
            }
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

export default NewCategoryPage;
