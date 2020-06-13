import React, { Component } from 'react'
import styles from './org.module.scss'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import Modal from '../Modal/Modal'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import axios from 'axios'
import config from '../../config/config'

import arrow from '../../assets/icons/arrow.png'

export class org extends Component {

    state = {
        sideDrawerOpen: true,
        selectedtab1: true,
        selectedtab2: false,
        addorg: false,
        addAdmin: false,
        showAdmin: false,
        showAdminList: false,
        branchOptions: [],
        adminOptions: [],
        branchId: '',
        branchName: '',
        branchEmail: '',
        branchAddress: '',
        branchMobile: '',
        adminName: '',
        adminEmail: '',
        adminMobile: ''
    };

    componentDidMount() {

        let url = "branches/" + `${this.props.orgId}`
        console.log(url)
        axios.get(config.serverUrl + url)
            .then(response => {
               if (response.status === 200){ 
                   console.log(response.data)
                this.setState({
                    branchOptions: response.data
                    })
                }}
            ) 
            .catch(error => {
                console.log("error",error);
            });
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    };

    backdropClickHandler = () => {
        this.setState({
            sideDrawerOpen: false
        })
    }

    clickhandler = () => {
        this.setState({
            addorg: !this.state.addorg
        })
    }

    adminClickhandler = () => {
        this.setState({
            addAdmin: !this.state.addAdmin
        })
    }

    adminList = branchid => {

        let url = "adminbranch/" + `${branchid}`
        axios.get(config.serverUrl + url)
        .then(response => {
           if (response.status === 200){ 
            this.setState({
                adminOptions: response.data
                })
            }}
        ) 
        .catch(error => {
            console.log("error",error);
        });
        this.setState({
            showAdminList: !this.state.showAdminList
        })
    }

    handleEvent = (event, value) => {
        this.setState({
            orgId: this.props.orgId
        })
        if( value === "name" ) {
            this.setState({
                branchName: event.target.value
            })
        } else if( value === "email" ) {
            this.setState({
                branchEmail: event.target.value
            })
        } else if( value === "address" ) {
            this.setState({
                branchAddress: event.target.value
            })
        } else if( value === "mobile" ) {
            this.setState({
                branchMobile: event.target.value
            })
        }
    }

    handleEvent2 = (event, value) => {
        if( value === "name" ) {
            this.setState({
                adminName: event.target.value
            })
        } else if( value === "email" ) {
            this.setState({
                adminEmail: event.target.value
            })
        } else if( value === "mobile" ) {
            this.setState({
                adminMobile: event.target.value
            })
        }
    }

    onFormSubmit = () => {

        let data = {
            name: this.state.branchName,
            address: {
                district: this.state.branchAddress
            },
            email: this.state.branchEmail,
            phoneList: this.state.branchMobile,
            organization: this.state.orgId
        }

        axios.post(config.serverUrl + "branch", data)
            .then(response => 
                (response.status === 200) ? console.log("ADDED") : console.log("NOT ADDED")
            ) 
            .catch(error => {
                console.log("error",error);
            });
        
        let innerobj = {
            name: this.state.branchName,
            location: this.state.branchAddress,
            email: this.state.branchEmail
        }

        this.state.branchOptions.push(innerobj)
        
        this.setState({
            addorg: !this.state.addorg
        })
    }

    onFormSubmit2 = () => {

        let data = {
            role: 'branchAdmin',
            name: this.state.adminName,
            mobileNo: this.state.adminMobile,
            email: this.state.adminEmail,
            accessLevel: this.state.branchId
        }

        axios.post(config.serverUrl + "admin", data)
            .then(response => 
                (response.status === 200) ? console.log("ADDED") : console.log("NOT ADDED")
            ) 
            .catch(error => {
                console.log("error",error);
            });

        let innerobj = {
            name: this.state.adminName,
            email: this.state.adminEmail,
            mobileNo: this.state.adminMobile
        }

        this.state.adminOptions.push(innerobj)
        
        this.setState({
            addAdmin: !this.state.addAdmin
        })
    }

    handleClick = value => {
        if (value === "tab1") {
            this.setState({
                selectedtab1: true,
                selectedtab2: false,
                selectedtab3: false
            })
        } else if (value === "tab2") {
            this.setState({
                selectedtab2: true,
                selectedtab1: false,
                selectedtab3: false
            })
        }
    }

    adminHandler = branchid => {
        this.setState({
            branchId: branchid,
            addAdmin: true
        })
    }

    render() {

        let admincard = this.state.adminOptions.map((item) => {
            return (
                <div className={styles.item5}> 
                        <label className={styles.text8}> {item.name} </label>
                        <label className={styles.text9}> {item.email }</label>
                        <label className={styles.text10}> {item.mobileNo} </label> 
                </div>
            )
        })
        let branchcard = this.state.branchOptions.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div>
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {item.location }</label>
                            <label className={styles.text3}> {item.email} </label>
                            <button onClick={() => this.adminHandler(item.id)} className={styles.button4}> + admin </button>
                            <img onClick={() => this.adminList(item.id)} src={arrow} alt="arrow" style={{marginLeft: 910, height: 12, width: 20, marginTop: 20}} />
                    </div> 
                    </div>: 
                    <div className={styles.item2}>
                            <label className={styles.text5}> {item.name} </label>
                            <label className={styles.text6}> {item.location }</label>
                            <label className={styles.text7}> {item.contactNo} </label>
                    </div> 
                    }   
                </div>
            );
        })

        return (
            <div>
                <div style={{height: "100%"}}>
                    <Toolbar drawerClickHandler={ this.drawerToggleClickHandler }/>
                    {this.state.sideDrawerOpen ? 
                        <SideDrawer 
                            show = { this.backdropClickHandler } 
                            name = "Admin"
                            tab1 = "Branch List"
                            //click = {this.handleClick}
                            selected1 = {this.state.selectedtab1}
                        /> 
                    : null } 
                </div>

                {this.state.selectedtab1 ? 
                <div>
                    <button onClick={this.clickhandler} className={styles.button}> + add branch </button>

                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                            <div className={styles.item3}>
                                <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '50px'}}> Branch Name </label>
                                <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '300px'}}> Branch Address </label>
                                <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '525px'}}> Branch Email </label>
                            </div>
                    </div>
                    :
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                        <div className={styles.item4}>
                            <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}> Branch Name </label>
                            <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '400px'}}> Branch Address </label>
                            <label className={styles.text7} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '675px'}}> Branch Email </label>
                        </div>
                    </div> }

                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '300px', right: '75px'}}>
                        {branchcard}
                        { this.state.showAdminList ? 
                            <div>
                                <div style={{marginLeft: 70}}>
                                <div style={{display: 'flex', marginTop: '25px'}}>
                                    <div className={styles.item6}>
                                        <label className={styles.text11} style={{fontSize: '20px', fontWeight: 'bold'}}> Admin Name </label>
                                        <label className={styles.text12} style={{fontSize: '20px', fontWeight: 'bold'}}> Admin Email </label>
                                        <label className={styles.text13} style={{fontSize: '20px', fontWeight: 'bold'}}> Admin Mobile No </label>
                                    </div>
                                </div>
                                    {admincard}
                            </div>
                            </div>
                        : null }
                    </div> 
                    : 
                    <div style={{position: 'absolute', top: '300px', right: '100px'}}>
                    {branchcard}
                    </div> }

                    { this.state.addorg ? 
                    <div> 
                        <Modal type="org" show={this.state.addorg}>
                            <div>
                                <h1 className={styles.heading}> Branch Details Form </h1>
                                <label className={styles.label}> Name </label>
                                <input value={this.state.branchName} className={styles.input} type="text" onChange={(event) => this.handleEvent(event, "name")} />

                                <label className={styles.label}> Email </label>
                                <input value={this.state.branchEmail} className={styles.input} type="text" onChange={(event) => this.handleEvent(event, "email")} />

                                <label className={styles.label}> Address </label>
                                <input value={this.state.branchAddress} className={styles.input} type="text" onChange={(event) => this.handleEvent(event, "address")} />

                                <label className={styles.label}> Phone Number </label>
                                <input value={this.state.branchMobile} className={styles.input} type="text" onChange={(event) => this.handleEvent(event, "mobile")} />

                                <button onClick={this.clickhandler} className={styles.button2}> Cancel </button>
                                <button onClick={this.onFormSubmit} className={styles.button3}> Submit </button>
                            </div>
                        </Modal>
                    </div>
                    : null }

                    { this.state.addAdmin ? 
                    <div> 
                        <Modal type="admin" show={this.state.addAdmin}>
                            <div>
                                <h1 className={styles.heading}> Admin Details Form </h1>
                                <label className={styles.label}> Name </label>
                                <input value={this.state.adminName} className={styles.input} type="text" onChange={(event) => this.handleEvent2(event, "name")} />

                                <label className={styles.label}> Email </label>
                                <input value={this.state.adminEmail} className={styles.input} type="text" onChange={(event) => this.handleEvent2(event, "email")} />

                                <label className={styles.label}> Mobile Number </label>
                                <input value={this.state.adminMobile} className={styles.input} type="text" onChange={(event) => this.handleEvent2(event, "mobile")} />

                                <button onClick={this.adminClickhandler} className={styles.button2}> Cancel </button>
                                <button onClick={this.onFormSubmit2} className={styles.button3}> Submit </button>
                            </div>
                        </Modal>
                    </div>
                    : null }
                    </div>
                : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orgId: state.orgId,
        orgName: state.orgName
    }
}

export default (withRouter(connect(mapStateToProps, null)(org)))
