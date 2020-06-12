import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './../../store/actions'
import styles from './login.module.scss'

import top from '../../assets/icons/Top.png'
import diagram from '../../assets/icons/diagram.png'

export class login extends Component {


    handleClick = () => {
        let email = "himanshusinghal829@gmail.com"
        let password = "POC@2020"

        this.props.onGetPageData(email, password)

        if (this.props.getRole === "admin") {
            this.props.history.push({
                pathname: "/admin",
                state: true })
        }
    }

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

                        <button onClick={this.handleClick} className={styles.button}> Log In</button>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        getRole: state.role
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetPageData: (email, password) => dispatch(actions.getPageData(email, password))
    };
};

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(login)))
