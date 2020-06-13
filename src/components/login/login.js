import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './../../store/actions'
import styles from './login.module.scss'
import axios from 'axios'
import config from './../../config/config'
import top from '../../assets/icons/Top.png'
import diagram from '../../assets/icons/diagram.png'

export class login extends Component {

    state = {
        email: '',
        pwd: ''
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

    handleClick = () => {
        let data = {
            email: this.state.email,
            password: this.state.pwd
        }

        axios.post(config.serverUrl + "login", data)
        .then(response => {
            //console.log(response)
            if (response.status === 200){ 
                console.log(response)
                this.props.getRole = response.data.data.role;
                this.props.accessToken = response.data.accessToken;
            }
        }) 
        .catch(error => {
            console.log("error",error);
        });
        //this.props.accessToken.push(response.data.accessToken);
        //this.props.onGetPageData(email, password)
        console.log(this.props);
        if (this.props.getRole === "super-admin") {
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
