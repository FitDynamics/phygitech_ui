import React, { Component } from 'react'
import styles from './admin.module.scss'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import Modal from '../Modal/Modal'
import ReactPlayer from 'react-player'
import config from '../../config/config'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

import arrow from '../../assets/icons/arrow.png'

export class admin extends Component {

    state = {
        sideDrawerOpen: true,
        selectedtab1: true,
        selectedtab2: false,
        addorg: false,
        addAdmin: false,
        showAdmin: false,
        showAdminList: false,
        orgOptions: [],
        adminOptions: [],
        orgId: '',
        orgName: '',
        orgEmail: '',
        orgAddress: '',
        orgMobile: '',
        adminName: '',
        adminEmail: '',
        adminMobile: '',
        selectedUrl: '',
        showVideo: false,
        contentoptions: []
    };

    componentDidMount(){

        axios.get(config.serverUrl + "organizations")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    orgOptions: response.data
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

    adminList = orgId => {

        let url = "admin/" + `${orgId}`
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
        if( value === "name" ) {
            this.setState({
                orgName: event.target.value
            })
        } else if( value === "email" ) {
            this.setState({
                orgEmail: event.target.value
            })
        } else if( value === "address" ) {
            this.setState({
                orgAddress: event.target.value
            })
        } else if( value === "mobile" ) {
            this.setState({
                orgMobile: event.target.value
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
            displayName: this.state.orgName,
            location: this.state.orgAddress,
            email: this.state.orgEmail,
            contactNo: this.state.orgMobile
        }

        axios.post(config.serverUrl + "organization", data)
            .then(response => 
                (response.status === 200) ? console.log("ADDED") : console.log("NOT ADDED")
            ) 
            .catch(error => {
                console.log("error",error);
            });
        
        let innerobj = {
            name: this.state.orgName,
            address: this.state.orgAddress,
            contactNo: this.state.orgMobile
        }

        this.state.orgOptions.push(innerobj)
        
        this.setState({
            addorg: !this.state.addorg
        })
    }

    onFormSubmit2 = orgId => {

        let data = {
            role: 'orgAdmin',
            name: this.state.adminName,
            mobileNo: this.state.adminMobile,
            email: this.state.adminEmail,
            orgAccess: orgId
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
                selectedtab2: false
            })
        } else if (value === "tab2") {
            this.setState({
                selectedtab2: true,
                selectedtab1: false
            })

            axios.get(config.serverUrl + "content")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    contentoptions: response.data
                    })
                }}
            ) 
            .catch(error => {
                console.log("error",error);
            });
        }
    }

    redirect = (name, id) => {

        this.props.onSendData(name, id)

        this.props.history.push({
            pathname: "/org",
            state: true })
    }

    adminHandler = orgid => {
        this.setState({
            orgId: orgid,
            addAdmin: true
        })
    }

    onButtonClick = (url) => {
        this.setState({
            selectedUrl: url,
            showVideo: true
        })
    }

    closeModal = () => {
        this.setState({
            showVideo: false
        })
    }


    render() {

        let contentcard = this.state.contentoptions.map((item) => {
            return (
                <div className={styles.item8}>
                    <label className={styles.text17}> {item.name} </label>
                    <label className={styles.text18}> {item.category} </label>
                    <button onClick={() => this.onButtonClick(item.url)} className={styles.button6}> Play Video </button>
                </div>
            )
        })

        let admincard = this.state.adminOptions.map((item) => {
            return (
                <div className={styles.item5}> 
                            <label className={styles.text8}> {item.name} </label>
                            <label className={styles.text9}> {item.email }</label>
                            <label className={styles.text10}> {item.mobileNo} </label> 
                    </div>
            )
        })

        let orgcard = this.state.orgOptions.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div>
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {item.address}</label>
                            <label className={styles.text3}> {item.contactNo} </label>
                            <button onClick={() => this.adminHandler(item.id)} className={styles.button4}> + admin </button>
                            <button onClick={() => this.redirect(item.name, item.id)} className={styles.button5}> branch > </button>
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

        console.log(this.state.orgId)
        return (
            
            <div>
                <div style={{height: "100%"}}>
                    <Toolbar drawerClickHandler={ this.drawerToggleClickHandler }/>
                    {this.state.sideDrawerOpen ? 
                        <SideDrawer 
                            show = { this.backdropClickHandler } 
                            name = "Admin"
                            tab1 = "Organization List"
                            tab2 = "Content Organization"
                            click = {this.handleClick}
                            selected1 = {this.state.selectedtab1}
                            selected2 = {this.state.selectedtab2}
                        /> 
                    : null } 
                </div>

                {this.state.selectedtab1 ? 
                <div>
                    <button onClick={this.clickhandler} className={styles.button}> + add organization </button>

                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                            <div className={styles.item3}>
                                <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '50px'}}> Org Name </label>
                                <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '300px'}}> Org Location </label>
                                <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '500px'}}> Org Contact No </label>
                            </div>
                    </div>
                    :
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                        <div className={styles.item4}>
                            <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}> Org Name </label>
                            <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '400px'}}> Org Location </label>
                            <label className={styles.text7} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '675px'}}> Org Contact No </label>
                        </div>
                    </div> }

                    { this.state.sideDrawerOpen ? 
                    <div  style={ this.state.showAdminList ? {position: 'absolute', top: '300px', right: '75px'}: {position: 'absolute', top: '300px', right: '75px'}}>
                        {orgcard}
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
                    {orgcard}
                    { this.state.showAdminList ? 
                    <div>
                        {admincard}
                    </div>
                    : null }
                    </div> }

                    { this.state.addorg ? 
                    <div> 
                        <Modal type="org" show={this.state.addorg}>
                            <div>
                                <h1 className={styles.heading}> Organization Details Form </h1>
                                <label className={styles.label}> Name </label>
                                <input value={this.state.orgName} className={styles.input} type="text" onChange={(event) => this.handleEvent(event, "name")} />

                                <label className={styles.label}> Email </label>
                                <input value={this.state.orgEmail} className={styles.input} type="text" onChange={(event) => this.handleEvent(event, "email")} />

                                <label className={styles.label}> Address </label>
                                <input value={this.state.orgAddress} className={styles.input} type="text" onChange={(event) => this.handleEvent(event, "address")} />

                                <label className={styles.label}> Phone Number </label>
                                <input value={this.state.orgMobile} className={styles.input} type="text" onChange={(event) => this.handleEvent(event, "mobile")} />

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
                                <button onClick={() => this.onFormSubmit2(this.state.orgId)} className={styles.button3}> Submit </button>
                            </div>
                        </Modal>
                    </div>
                    : null }
                    </div>
                    
                : null }

                {this.state.selectedtab2 ? 
                    
                    <div>
                    <label className={styles.heading}> Content Available </label>
                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '150px'}}>
                            <div className={styles.item7}>
                                <label className={styles.text14} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '525px'}}> Content Name </label>
                                <label className={styles.text15} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '775px'}}> Category </label>
                                <label className={styles.text16} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '1050px'}}> Action </label>
                            </div>
                    </div>
                    :
                    <div style={{position: 'absolute', top: '150px'}}>
                        <div className={styles.item4}>
                            <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}> Content Name </label>
                            <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '400px'}}> Category </label>
                            <label className={styles.text7} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '675px'}}> OAction </label>
                        </div>
                    </div> }

                    <div style={{position: 'absolute', top: '250px', right: '165px'}}>
                    {contentcard}
                    </div> 

                    { this.state.showVideo ? 
                    <div> 
                        <Modal type="video" show={this.state.showVideo}>
                            <div>
                            <div className={styles.player}>
                                    <ReactPlayer 
                                            url={this.state.selectedUrl}
                                            playing={true}
                                            controls={true}
                                            loop={true}
                                            width={900}
                                            height={500}
                                        />
                                    </div> 
                                <button onClick={this.closeModal} className={styles.button7}> Cancel </button>
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

const mapDispatchToProps = dispatch => {
    return {
        onSendData: (name, id) => dispatch(actions.sendData(name, id))
    };
};

export default withRouter(connect(null, mapDispatchToProps)(admin))
