import React, { useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal = ({ onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const portalElement = document.getElementById('overlays');

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return (
      <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
        {ReactDOM.createPortal(
          <ModalOverlay>{children}</ModalOverlay>,
          portalElement
        )}
      </Fragment>
    );
  }
};

export default Modal;
