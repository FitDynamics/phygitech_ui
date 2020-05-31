import React, { Component } from 'react'
import styles from './login.module.scss'

import top from '../../assets/icons/Top.png'
import diagram from '../../assets/icons/diagram.png'

export class login extends Component {
    render() {
        return (
            <div style = {{ overflowY: "scroll", width: 1440, height: "auto"}}>
                <div className={styles.mainrectangle}> 
                    <img src={top} alt="top" className={styles.top}></img>
                    <label className={styles.text}> Phygitech </label>
                    <label className={styles.text2}> Online Classes </label>
                </div>

                <div className={styles.line} />

                <div className={styles.mainrectangle2}>
                    <img src={diagram} alt="diagram" className={styles.image}></img>
                    <div className={styles.rectangle}>
                        <label className={styles.text3}> Sign in to your Account </label>

                        <label className={styles.text4}> Enter your email or mobile number </label>
                        <input className={styles.input} />

                        <label className={styles.text5}> Enter your Password </label>
                        <input className={styles.input} />

                        <button className={styles.button}> Log In</button>

                    </div>
                </div>
            </div>
        )
    }
}

export default login
