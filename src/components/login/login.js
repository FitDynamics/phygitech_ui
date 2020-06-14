import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './login.module.scss'
import axios from 'axios'
import config from './../../config/config'
import top from '../../assets/icons/Top.png'
import diagram from '../../assets/icons/diagram.png'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

class login extends Component {

    state = {
        email: '',
        pwd: '',
        role: ''
    };
    handlePwdEvent = event => {
        this.setState({
            pwd: event.target.value
        })
    }
    handleEmailEvent = event => {
        this.setState({
            email: event.target.value
        })
    }

    getRole = (email, password) => {
        return new Promise((resolve, reject) => {
            let data = {
                email: email,
                password: password
            }

            axios.post(config.serverUrl + "login", data)
            .then(response => {
                //console.log(response)
                if (response.status === 200){ 
                    console.log(response.data)
                    resolve(response.data.data.role)
                    this.props.onSendData(null, response.data.data.orgID)
                }
            }) 
            .catch(error => {
                console.log("error",error);
            });
        })
    }

    handleClick = async () => {

        const role = await this.getRole(this.state.email, this.state.pwd)

        if(role === "super-admin") {
            this.props.history.push({
                pathname: "/admin",
                state: true
            })
        } else if (role === "org-admin") {
            this.props.history.push({
                pathname: "/org",
                state: true
            })
        } else if (role === "branch-admin") {
            this.props.history.push({
                pathname: "/branch",
                state: true
            })
        } else if (role === "teacher") {
            this.props.history.push({
                pathname: "/teacher",
                state: true
            })
        } else if (role === "student") {
            this.props.history.push({
                pathname: "/student",
                state: true
            })
        }
    }

    render() {

        return (
            <div style = {{ overflowY: "scroll", width: 1440, height: "auto"}}>
                <div className={styles.mainrectangle}> 
                    <img src={top} alt="top" className={styles.top}></img>
                    <label className={styles.text}> Phygitech </label>
                    <label className={styles.text2}> learning solutions </label>
                </div>

                <div className={styles.line} />

                <div className={styles.mainrectangle2}>
                    <img src={diagram} alt="diagram" className={styles.image}></img>
                    <div className={styles.rectangle}>
                        <label className={styles.text3}> Sign in to your Account </label>

                        <label className={styles.text4}> email </label>
                        <input name="email" placeholder="enter your email" value={this.state.email} className={styles.input} type="text" onChange={(event) => this.handleEmailEvent(event)} />

                        <label className={styles.text5}> password </label>
                        <input  name="password" placeholder="enter your password" value={this.state.pwd} className={styles.input} type="password" onChange={(event) => this.handlePwdEvent(event)} />

                        <button onClick={this.handleClick} className={styles.button}> log in</button>

                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSendData: (name, id) => dispatch(actions.sendData(name, id))
    };
};


export default withRouter(connect(null, mapDispatchToProps)(login))
