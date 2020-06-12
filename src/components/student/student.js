import React, { Component } from 'react'
import styles from './student.module.scss'
import axios from 'axios'
import config from './../../config/config'

import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'

export class student extends Component {

    state = {
        sideDrawerOpen: true,
        selectedtab1: true,
        selectedtab2: false,
        options: [
            { name: 'Class 5 Maths',  date: "June 2nd 2020", starttime: '3: 00 PM', endtime: '4: 00 PM' },
            { name: 'Parent Meet', date: "June 3rd 2020", starttime: '5: 00 PM', endtime: '6: 00 PM' },
            { name: 'Counselling',  date: "June 4th 2020", starttime: '2: 00 PM', endtime: '3: 00 PM' }
        ]
    };

    componentDidMount(){

        axios.get(config.serverUrl + "sessions")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    options: response.data
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


    handleClick = value => {
        if (value === "tab1") {
            this.setState({
                selectedtab1: !this.state.selectedtab1,
                selectedtab2: false,
                selectedtab3: false
            })
        } else if (value === "tab2") {
            this.setState({
                selectedtab2: !this.state.selectedtab2,
                selectedtab1: false,
                selectedtab3: false
            })
        }
    }

    buttonHandler = meetingId =>{
        window.open(`https://app.gotomeeting.com/index.html?meetingid=${meetingId}`)
    }

    render() {

        let meetingcard = this.state.options.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {item.date }</label>
                            <label className={styles.text3}> {item.starttime} </label>
                            <label className={styles.text4}> {item.endtime} </label>
                            <button onClick={() => this.buttonHandler(item.meetingId)} className={styles.button2}> Join </button>
                    </div> : 
                    <div className={styles.item2}>
                            <label className={styles.text5}> {item.name} </label>
                            <label className={styles.text6}> {item.date }</label>
                            <label className={styles.text7}> {item.starttime} </label>
                            <label className={styles.text8}> {item.endtime} </label>
                    </div> 
                    }   
                </div>
            );
        })

        return (
            <div style={{height: "100%"}}>
                <Toolbar drawerClickHandler={ this.drawerToggleClickHandler }/>
                {this.state.sideDrawerOpen ? 
                    <SideDrawer 
                        show = { this.backdropClickHandler } 
                        name = "Student"
                        tab1 = "My Classes"
                        tab2 = "My Courses"
                        click = {this.handleClick}
                        selected1 = {this.state.selectedtab1}
                        selected2 = {this.state.selectedtab2}
                    /> 
                : null } 

                {this.state.selectedtab1 ? 
                <div>
                   
                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                            <div className={styles.item3}>
                                <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '25px'}}> Meeting Name </label>
                                <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '250px'}}> Meeting Date </label>
                                <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '475px'}}> Start Time </label>
                                <label className={styles.text4} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '675px'}}> End Time</label>
                            </div>
                    </div>
                    :
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                        <div className={styles.item4}>
                            <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}> Meeting Name </label>
                            <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '400px'}}> Meeting Date </label>
                            <label className={styles.text7} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '725px'}}> Start Time  </label>
                            <label className={styles.text8} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '1050px'}}> End Time </label>
                        </div>
                    </div> }

                        { this.state.sideDrawerOpen ? 
                        <div style={{position: 'absolute', top: '300px', right: '75px'}}>
                            {meetingcard}
                        </div> 
                        : 
                        <div style={{position: 'absolute', top: '300px', right: '100px'}}>
                        {meetingcard}
                        </div> }
                    </div>
                : null }

            </div>
        )
    }
}

export default student
