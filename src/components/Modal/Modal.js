import React from 'react';
import styles from './Modal.module.scss'


const Modal = ({ handleClose, show, type, children }) => {
  
    return (
      <div className={ show ? styles.modalBlock : styles.modalNone }>
        <section className={ ((type === "org") ? styles.modalMain : null) || ((type === "admin") ? styles.modalMain2 : null)}>
          {children}
        </section>
      </div>
    );
  };

export default Modal;