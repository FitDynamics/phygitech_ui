import React from 'react';
import styles from './Toolbar.module.scss'

const Toolbar = props => {
    return (
        <div>
            <header className={styles.toolbar}>
                <nav className={styles.toolbar__navigation}>
                    <div>
                        <button className={styles.toggle_button} onClick={ props.drawerClickHandler }>
                            <div className={styles.toggle_button_line} ></div>
                            <div className={styles.toggle_button_line} ></div>
                            <div className={styles.toggle_button_line} ></div>
                        </button>
                    </div>
                    <div className={styles.toolbar__logo}>
                        <label className={styles.text}> Phygitech Online Classes </label>
                    </div>

                    <div className={styles.text2}>
                        Hi, Welcome ( Successfully Logged In )
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Toolbar;