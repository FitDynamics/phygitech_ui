import React from 'react';
import styles from './Modal.module.scss'


const Modal = ({ handleClose, show, children }) => {
  
    return (
      <div className={ show ? styles.modalBlock : styles.modalNone }>
        <section className={styles.modalMain}>
          {children}
          <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
  };

export default Modal;