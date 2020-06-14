import React, { Component } from 'react'
import styles from './teacher.module.scss'
import axios from 'axios'
import config from './../../config/config'

import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'

import profile from '../../assets/icons/profile.png'

export class teacher extends Component {

    state = {
        sideDrawerOpen: true,
        selectedtab1: true,
        selectedtab2: false,
        selectedtab3: false,
        options: []
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
        } else if (value === "tab3") {
            this.setState({
                selectedtab3: true,
                selectedtab1: false,
                selectedtab2: false
            })
        }
    }

    buttonHandler = meetingId =>{
        window.open(`https://app.gotomeeting.com/index.html?meetingid=${meetingId}`)
    }

    formatAMPM = (date) =>  {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    formatDate = (date) => { 
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [day, month, year].join('-');
    }

    render() {

        console.log(this.state.options)

        let meetingcard = this.state.options.map((item) => {

            let start = new Date(item.starttime)
            let end = new Date(item.endtime)

            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {this.formatDate(item.date)}</label>
                            <label className={styles.text3}> {this.formatAMPM(start)} </label>
                            <label className={styles.text4}> {this.formatAMPM(end)} </label>
                            <button onClick={() => this.buttonHandler(item.meetingId)} className={styles.button2}> Start </button>
                    </div> : 
                    <div className={styles.item2}>
                            <label className={styles.text5}> {item.name} </label>
                            <label className={styles.text6}> {this.formatDate(item.date)}</label>
                            <label className={styles.text7}> {this.formatAMPM(start)} </label>
                            <label className={styles.text8}> {this.formatAMPM(end)} </label>
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
                        name = "Teacher"
                        tab1 = "Completed Classes"
                        tab2 = "Upcoming Classes"
                        tab3 = "My Calendar"
                        click = {this.handleClick}
                        selected1 = {this.state.selectedtab1}
                        selected2 = {this.state.selectedtab2}
                        selected3 = {this.state.selectedtab3}
                        image = {profile}
                    /> 
                : null } 


                {this.state.selectedtab1 ? 
                <div>
                   
                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                            <div className={styles.item3}>
                                <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '25px'}}> Session Name </label>
                                <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '250px'}}> Session Date </label>
                                <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '475px'}}> Start Time </label>
                                <label className={styles.text4} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '675px'}}> End Time</label>
                            </div>
                    </div>
                    :
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                        <div className={styles.item4}>
                            <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}> Session Name </label>
                            <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '400px'}}> Session Date </label>
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

export default teacher
