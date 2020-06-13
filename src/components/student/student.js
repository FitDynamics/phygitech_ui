import React, { Component } from 'react'
import styles from './student.module.scss'
import axios from 'axios'
import config from './../../config/config'
import ReactPlayer from 'react-player'
import Modal from '../Modal/Modal'


import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'

export class student extends Component {

    state = {
        sideDrawerOpen: true,
        selectedtab1: true,
        selectedtab2: false,
        options: [],
        selectedUrl: '',
        showVideo: false,
        contentoptions: []
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

    buttonHandler = meetingId =>{
        window.open(`https://app.gotomeeting.com/index.html?meetingid=${meetingId}`)
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

        console.log(this.state.selectedtab2)

        let contentcard = this.state.contentoptions.map((item) => {
            return (
                <div className={styles.item8}>
                    <label className={styles.text17}> {item.name} </label>
                    <label className={styles.text18}> {item.category} </label>
                    <button onClick={() => this.onButtonClick(item.url)} className={styles.button6}> Play Video </button>
                </div>
            )
        })

        let meetingcard = this.state.options.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {this.formatDate(item.date)}</label>
                            <label className={styles.text3}> {item.starttime} </label>
                            <label className={styles.text4}> {item.endtime} </label>
                            <button onClick={() => this.buttonHandler(item.meetingId)} className={styles.button2}> Join </button>
                    </div> : 
                    <div className={styles.item2}>
                            <label className={styles.text5}> {item.name} </label>
                            <label className={styles.text6}> {this.formatDate(item.date)}</label>
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

export default student
