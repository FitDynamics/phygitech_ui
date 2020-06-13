import React, { Component } from 'react'
import Select from 'react-select'
import styles from './branch.module.scss'
import Modal from '../Modal/Modal'
import axios from 'axios'
import config from './../../config/config'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'

import arrow from '../../assets/icons/arrow.png'

let finalDate = ''
let finalStartTime = ''
let finalEndTime = ''

const colourStyles = {
    container: (base, state) => {
        return {
            boxSizing: "border-box",
            position: 'absolute',
            top: 126,
            left: 400
        }
    },
    control: (base, state) => {
        return {
            boxSizing: "border-box",
            height: 40,
            width: 250,
            border: '1.5px solid #000000',
            borderRadius: 4,
            backgroundColor: '#FFFFFF'
        }
    },
    valueContainer: () => {
        return {
            height: 24,
            width: 100,
            color: '#939393',
            fontFamily: 'Gilroy',
            fontSize: 16,
            letterSpacing: 0,
            lineHeight: 19,
            marginTop: 12,
            marginLeft: 16
        }
    },
    singleValue: () => {
        return {
            height: 24,
            width: 100,
            color: '#3C3C3B',
            fontFamily: 'Gilroy-Bold',
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 0,
            lineHeight: 19,
            marginTop: -164
        }
    },
    indicatorsContainer: () => {
        return {
            position: 'absolute',
            top: 0,
            left: 200
        }
    },
    indicatorSeparator: () => null,
    dropdownIndicator: (base, state) => {
        return {
            ...base,
            padding: '10px',
            fontSize: '12px'
        }
    },

    input: () => {
        return {
            height: 0,
            width: 0,
            outline: 'none',
            display: 'inline-block',
            cursor: 'pointer',
            marginTop: '-5.04166vw'
        }
    },
    placeholder: () => {
        return {
            height: 24,
            width: 160,
            fontFamily: 'Gilroy',
            fontSize: 18,
            position: 'absolute',
            top: -150
        }
    },
    option: (base, state) => {
        return {
            ...base,
            height: 24,
            width: 250,
            cursor: 'pointer',
            fontFamily: 'Gilroy',
            fontSize: 16,
            padding: 6
        };
    },

    menu: (base, state) => ({
        marginTop: -0.5,
        boxShadow: "0 0px 16px 0 rgba(0,0,0,0.15)",
        backgroundColor: '#FFFFFF'
        
    }),
    menuList: (base, state) => ({
        ...base,
        padding: 0,
        boxShadow: "0 0px 16px 0 rgba(0,0,0,0.15)",
        borderRadius: 8,
        height: 'auto',
        width: 250
    }),
};

export class branch extends Component {

    state = {
        sideDrawerOpen: true,
        selectedtab1: true,
        selectedtab2: false,
        selectedtab3: false,
        selectedtab4: false,
        addorg: false,
        name: '',
        date: '',
        finalDate:'',
        starttime: '',
        endtime: '',
        details: [],
        showClassList: false,
        meetingoptions: [],
        teacheroptions: [],
        classroomoptions : [],
        studentoptions: [],
        classnameoptions: [],
        teachernameoptions: [],
        classroomname: "",
        classroomteacher: "",
        classCategory: "",
        teachername: "",
        teachernameId: "",
        teacheremail: "",
        teachermobileno: "",
        teacheraddress: "",
        teacherclassId: null,
        studentname: "",
        studentemail: "",
        studentaddress: "",
        studentmobile: ""
    };

    componentDidMount(){

        axios.get(config.serverUrl + "sessions")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    meetingoptions: response.data
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

    handleClick = value => {
        if (value === "tab1") {
            this.setState({
                selectedtab1: true,
                selectedtab2: false,
                selectedtab3: false,
                selectedtab4: false
            })
        } else if (value === "tab2") {
            this.setState({
                selectedtab2: true,
                selectedtab1: false,
                selectedtab3: false,
                selectedtab4: false
            })

            axios.get(config.serverUrl + "classrooms")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    classroomoptions: response.data
                    })
                }}
            ) 
            .catch(error => {
                console.log("error",error);
            });

            axios.get(config.serverUrl + "teachers")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    teachernameoptions: response.data
                    })
                }}
            ) 
            .catch(error => {
                console.log("error",error);
            });

        } else if (value === "tab3") {
            this.setState({
                selectedtab3: true,
                selectedtab1: false,
                selectedtab2: false,
                selectedtab4: false,
            })

            axios.get(config.serverUrl + "classrooms")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    classnameoptions: response.data
                    })
                }}
            ) 
            .catch(error => {
                console.log("error",error);
            });

            axios.get(config.serverUrl + "teachers")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    teacheroptions: response.data
                    })
                }}
            ) 
            .catch(error => {
                console.log("error",error);
            });

        } else if (value === "tab4") {
            this.setState({
                selectedtab4: true,
                selectedtab1: false,
                selectedtab2: false,
                selectedtab3: false,
            })

            axios.get(config.serverUrl + "classrooms")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    classnameoptions: response.data
                    })
                }}
            ) 
            .catch(error => {
                console.log("error",error);
            });

            axios.get(config.serverUrl + "students")
            .then(response => {
               if (response.status === 200){ 
                this.setState({
                    studentoptions: response.data
                    })
                }}
            ) 
            .catch(error => {
                console.log("error",error);
            });
        }
    }

    handleEvent = event => {
        this.setState({
            name: event.target.value
        })
    }

    handleClassEvent = (event, value) => {
        if (value === "name") {
            this.setState({
                classroomname: event.target.value
            })
        } else if (value === "branch") {
            this.setState({
                classroombranch: event.target.value
            })
        } else if (value === "teacher") {
            this.setState({
               classroomteacher: event.target.value
            })
        }
    }

    handleTeacherEvent = (event, value) => {
        if (value === "name") {
            this.setState({
                teachername: event.target.value
            })
        } else if (value === "email") {
            this.setState({
                teacheremail: event.target.value
            })
        } else if (value === "address") {
            this.setState({
               teacheraddress: event.target.value
            })
        } else if (value === "mobile") {
            this.setState({
               teachermobileno: event.target.value
            })
        }
    }

    handleStudentEvent = (event, value) => {
        if (value === "name") {
            this.setState({
                studentname: event.target.value
            })
        } else if (value === "email") {
            this.setState({
                studentemail: event.target.value
            })
        } else if (value === "address") {
            this.setState({
               studentaddress: event.target.value
            })
        } else if (value === "mobile") {
            this.setState({
               studentmobile: event.target.value
            })
        }
    }


    convertDate= (date) => {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString();
        var dd  = date.getDate().toString();
      
        var mmChars = mm.split('');
        var ddChars = dd.split('');
      
        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
      }

    handleEvent2 = date => {
    
        finalDate = this.convertDate(date)
        this.setState({
            date: date
        })
    }

    handleEvent3 = date => {

        let ISO = date.toISOString()
        finalStartTime = ISO.substring(10,24)
        this.setState({
            starttime: date
        })
    }

    handleEvent4 = date => {

        let ISO = date.toISOString()
        finalEndTime = ISO.substring(10,24)
        this.setState({
            endtime: date
        })
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

    sendMeetingData = async (name, date, starttime, endtime) => {
        return new Promise((resolve, reject) => {
            let subject = name
            let meetingstarttime = `${date}${starttime}`
            let meetingendtime = `${date}${endtime}`
    
            let sample = {
                subject: subject,
                starttime: meetingstarttime,
                endtime: meetingendtime,
                passwordrequired: false,
                conferencecallinfo: "VoIP",
                timezonekey: "India",
                meetingtype: "immediate"
              }
    
            let url = config.meetingUrl+'/meetings'
            console.log(url)
            axios.post(url, sample, {
                headers: {
                  'Authorization': config.meetingToken,
                  'Content-Type': 'application/json',
                  'accept': 'application/json'
                }
              }).then(response => {
                resolve(response.data[0].uniqueMeetingId)
              }) 
        })
    }

    sendMeetingUrl = async () => {

        const meetingID = await this.sendMeetingData(this.state.name, finalDate, finalStartTime, finalEndTime)

        let date = this.state.date.toDateString()
        let starttime = this.formatAMPM(this.state.starttime)
        let endtime = this.formatAMPM(this.state.endtime)

        let data = {
            name: this.state.name,
            scheduledDate: date,
            startTime: starttime,
            endTime: endtime,
            uniqueMeetingId: meetingID
        }

        axios.post(config.serverUrl + "session", data)
            .then(response => 
                (response.status === 200) ? console.log("ADDED") : console.log("NOT ADDED")
            ) 
            .catch(error => {
                console.log("error",error);
            });

        let innerobj = {
            name: this.state.name,
            date: date,
            starttime: starttime,
            endtime: endtime
        }

        this.state.meetingoptions.push(innerobj)

        this.setState({
            addorg: !this.state.addorg
        })
    }

    onFormClassSubmit = () => {

        let data = {
            name: this.state.classroomname,
            category: this.state.classCategory,
            classTeacher: this.state.teacherclassId.value
        }

        axios.post(config.serverUrl + "classroom", data )
            .then(response => 
                (response.status === 200) ? console.log("ADDED") : console.log("NOT ADDED")
            ) 
            .catch(error => {
                console.log("error",error);
            });

        let innerobj = {
            name: this.state.classroomname,
            category: this.state.classCategory,
            teacher: this.state.teacherclassId.label
        }

        this.state.classroomoptions.push(innerobj)

        this.setState({
            addorg: !this.state.addorg
        })
    }

    onFormTeacherSubmit = () => {

        let data = {
            name: this.state.teachername,
            mobileNo: this.state.teachermobileno,
            email: this.state.teacheremail,
            class: this.state.teacherclassId.value,
            address: {
                city: this.state.teacheraddress
            }
        }

        axios.post(config.serverUrl + "teacher", data )
            .then(response => 
                (response.status === 200) ? console.log("ADDED") : console.log("NOT ADDED")
            ) 
            .catch(error => {
                console.log("error",error);
            });
        let innerobj = {
            name: this.state.teachername,
            mobileNo: this.state.teachermobileno,
            address: this.state.teacheraddress,
            class: this.state.teacherclassId.label
        }

        this.state.teacheroptions.push(innerobj)

        this.setState({
            addorg: !this.state.addorg
        })
    }

    onFormStudentSubmit = () => {

        let data = {
            name: this.state.studentname,
            mobileNo: this.state.studentmobile,
            email: this.state.studentemail,
            class: this.state.teacherclassId.value,
            address: {
                city: this.state.studentaddress
            }
        }

        axios.post(config.serverUrl + "student", data )
            .then(response => 
                (response.status === 200) ? console.log("ADDED") : console.log("NOT ADDED")
            ) 
            .catch(error => {
                console.log("error",error);
            });

        let innerobj = {
            name: this.state.studentname,
            mobileNo: this.state.studentmobile,
            address: this.state.studentaddress,
            class: this.state.teacherclassId.label
        }

        this.state.studentoptions.push(innerobj)

        this.setState({
            addorg: !this.state.addorg
        })
    }


    handleChange = teacherclassId => {

        this.setState({ teacherclassId });
        console.log(`Option selected:`, teacherclassId);
    };

    classList = () => {
        console.log("REACHED")
        this.setState({
            showClassList: !this.state.showClassList
        })
    }

    handleOptionChange (event) {
        this.setState({
            classCategory: event.target.value
        })
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

        let classcard = this.state.classnameoptions.map((item) => {
            return (<div>
                <select value={this.state.classname} onChange={this.handleChange} >
                         <option value={item.value}> {item.label} </option>
                </select>
            </div>
            )
        })

        let studentcard = this.state.studentoptions.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {item.mobileNo }</label>
                            <label className={styles.text3}> {item.address} </label>
                            <label className={styles.text4}> {item.class} </label>
                    </div> : 
                    <div className={styles.item2}>
                            <label className={styles.text5}> {item.name} </label>
                            <label className={styles.text6}> {item.mobileNo }</label>
                            <label className={styles.text7}> {item.address} </label>
                            <label className={styles.text8}> {item.class} </label>
                    </div> 
                    }   
                </div>
            );
        })

        let classroomcard = this.state.classroomoptions.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div className={styles.item}>
                            <label className={styles.text9}> {item.name} </label>
                            <label className={styles.text10}> {item.teacher }</label>
                            <label className={styles.text11}> {item.category} </label>
                    </div> : 
                    <div className={styles.item2}>
                            <label className={styles.text5}> {item.name} </label>
                            <label className={styles.text6}> {item.teacher }</label>
                            <label className={styles.text7}> {item.category} </label>
                            <label className={styles.text8}> {item.branch} </label>
                    </div> 
                    }   
                </div>
            );
        })

        let teachercard = this.state.teacheroptions.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {item.mobileNo }</label>
                            <label className={styles.text3}> {item.address} </label>
                            <label className={styles.text4}> {item.class} </label>
                            <img onClick={this.classList} src={arrow} alt="arrow" style={{marginLeft: 875, height: 12, width: 20, marginTop: 18}} />
                    </div> : 
                    <div className={styles.item2}>
                            <label className={styles.text5}> {item.name} </label>
                            <label className={styles.text6}> {item.mobileNo }</label>
                            <label className={styles.text7}> {item.address} </label>
                            <label className={styles.text8}> {item.class} </label>
                    </div> 
                    }   
                </div>
            );
        })

        let meetingcard = this.state.meetingoptions.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {this.formatDate(item.date)}</label>
                            <label className={styles.text3}> {item.starttime} </label>
                            <label className={styles.text4}> {item.endtime} </label>
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

        console.log(this.state.teacherclassId)

        return (
            <div style={{height: "100%"}}>
                <Toolbar drawerClickHandler={ this.drawerToggleClickHandler }/>
                {this.state.sideDrawerOpen ? 
                    <SideDrawer 
                        show={ this.backdropClickHandler } 
                        name = "Institution"
                        tab1 = "Schedule Class"
                        tab2 = "Classrooms"
                        tab3 = "Teacher List"
                        tab4 = "Student List"
                        click = {this.handleClick}
                        selected1 = {this.state.selectedtab1}
                        selected2 = {this.state.selectedtab2}
                        selected3 = {this.state.selectedtab3}
                        selected4 = {this.state.selectedtab4}
                    /> 
                : null } 

                {this.state.selectedtab1 ? 
                <div>
                    <button onClick={this.clickhandler} className={styles.button}> + add session </button>

                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                            <div className={styles.item3}>
                                <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '50px'}}> Session Name </label>
                                <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '300px'}}> Session Date </label>
                                <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '550px'}}> Start Time </label>
                                <label className={styles.text4} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '775px'}}> End Time</label>
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

                    { this.state.addorg ? 
                    <div> 
                        <Modal type="org" show={this.state.addorg}>
                            <div>
                                <h1 className={styles.heading}> Session Details Form </h1>
                                <label className={styles.label}> Name </label>
                                <input placeholder="enter the meeting name" value={this.state.name} className={styles.input} type="text" onChange={(event) => this.handleEvent(event)} />

                                <label className={styles.label}> Date </label>
                                <DatePicker showPopperArrow={false} placeholderText="click to select a date" dateFormat="yyyy-MM-dd" selected={this.state.date} onChange={this.handleEvent2} className={styles.input} />

                                <label className={styles.label}> Start Time </label>
                                <DatePicker
                                    placeholderText="enter the start time"
                                    selected={this.state.starttime}
                                    onChange={this.handleEvent3}
                                    showPopperArrow={false}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className={styles.input}
                                    />

                                <label className={styles.label}> End Time </label>
                                <DatePicker
                                    placeholderText="enter the end time"
                                    selected={this.state.endtime}
                                    onChange={this.handleEvent4}
                                    showPopperArrow={false}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className={styles.input2}
                                    />

                                <button onClick={this.clickhandler} className={styles.button2}> Cancel </button>
                                <button onClick={this.sendMeetingUrl} className={styles.button3}> Submit </button>
                            </div>
                        </Modal>
                    </div>
                    : null }
                    </div>
                : null }

                {this.state.selectedtab2 ? 
                    <div> 
                        <button onClick={this.clickhandler} className={styles.button}> + add classroom </button>

                        { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                            <div className={styles.item3}>
                                <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '50px'}}> Classroom Name </label>
                                <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '375px'}}> Class Teacher </label>
                                <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '650px'}}> Class Category</label>
                            </div>
                    </div>
                    :
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                        <div className={styles.item4}>
                            <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}>  Classroom Name </label>
                            <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '400px'}}> Class Teacher </label>
                            <label className={styles.text7} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '725px'}}> Class Category </label>
                        </div>
                    </div> }

                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '300px', right: '75px'}}>
                        {classroomcard}
                    </div> 
                    : 
                    <div style={{position: 'absolute', top: '300px', right: '100px'}}>
                        {classroomcard}
                    </div> }

                    { this.state.addorg ? 
                    <div> 
                        <Modal type="admin" show={this.state.addorg}>
                            <div>
                                <h1 className={styles.heading}> Classroom Details Form </h1>
                                <label className={styles.label}> Name </label>
                                <input value={this.state.classroomname} className={styles.input} type="text" onChange={(event) => this.handleClassEvent(event, "name")} />

                                <label className={styles.droplabel}> Class Teacher </label>
                                <Select
                                        styles={colourStyles}
                                        value={this.state.teacherclassId}
                                        placeholder="Tap to view teachers"
                                        onChange={this.handleChange}
                                        options={this.state.teachernameoptions}
                                    />

                                <label className={styles.label3}>  Category </label>
                                <div className={styles.radio}>
                                            <label className={styles.radiolabel}>
                                                <input type="radio" value="Pre-Primary" checked={this.state.classCategory === 'Pre-Primary'} onChange={this.handleOptionChange.bind(this)} />
                                                Pre Primary
                                            </label>
                                            <label className={styles.radiolabel}>
                                                <input type="radio" value="Primary" checked={this.state.classCategory === 'Primary'} onChange={this.handleOptionChange.bind(this)}/>
                                                Primary
                                            </label>
                                            </div> <div className={styles.radio}>
                                            <label className={styles.radiolabel}>
                                                <input type="radio" value="Secondary" checked={this.state.classCategory === 'Secondary'} onChange={this.handleOptionChange.bind(this)}/>
                                                Secondary
                                            </label>
                                            <label className={styles.radiolabel}>
                                                <input type="radio" value="Senior-Secondary" checked={this.state.classCategory === 'Senior-Secondary'} onChange={this.handleOptionChange.bind(this)}/>
                                                Senior Secondary
                                            </label>
                                            </div>

                                <button onClick={this.clickhandler} className={styles.button2}> Cancel </button>
                                <button onClick={this.onFormClassSubmit} className={styles.button3}> Submit </button>
                            </div>
                        </Modal>
                    </div>
                    : null }
                    </div>
                : null}

                {this.state.selectedtab3 ? 
                    <div> 
                        <button onClick={this.clickhandler} className={styles.button}> + add teacher </button>

                        { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                            <div className={styles.item3}>
                                <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '50px'}}> Teacher Name </label>
                                <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '300px'}}> Teacher Mobile No </label>
                                <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '550px'}}> Teacher Address </label>
                                <label className={styles.text4} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '775px'}}> Class Name</label>
                            </div>
                    </div>
                    :
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                        <div className={styles.item4}>
                            <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}>  Teacher Name </label>
                            <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '400px'}}> Teacher Mobile No </label>
                            <label className={styles.text7} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '725px'}}> Teacher Address  </label>
                            <label className={styles.text8} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '1050px'}}> Class Name </label>
                        </div>
                    </div> }

                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '300px', right: '75px'}}>
                        {teachercard}
                        {this.state.showClassList ? 
                            <div>
                                {classcard}
                            </div>
                         :null}
                    </div> 
                    : 
                    <div style={{position: 'absolute', top: '300px', right: '100px'}}>
                        {teachercard}
                    </div> }

                    { this.state.addorg ? 
                    <div> 
                        <Modal type="org" show={this.state.addorg}>
                        <div>
                                <h1 className={styles.heading}> Teacher Details Form </h1>
                                <div> 
                                    <label className={styles.label}> Name </label>
                                    <input value={this.state.teachername} className={styles.input} type="text" onChange={(event) => this.handleTeacherEvent(event, "name")} />

                                    <label className={styles.droplabel}> Class </label>
                                    <Select
                                        styles={colourStyles}
                                        value={this.state.teacherclassId}
                                        placeholder="Tap to view classes"
                                        onChange={this.handleChange}
                                        options={this.state.classnameoptions}
                                    />
                                </div>

                                <label className={styles.label}> Email </label>
                                <input value={this.state.teacheremail} className={styles.input} type="text" onChange={(event) => this.handleTeacherEvent(event, "email")} />

                                <label className={styles.label}> Address </label>
                                <input value={this.state.teacheraddress} className={styles.input} type="text" onChange={(event) => this.handleTeacherEvent(event, "address")} />

                                <label className={styles.label}> Phone Number </label>
                                <input value={this.state.teachermobileno} className={styles.input} type="text" onChange={(event) => this.handleTeacherEvent(event, "mobile")} />

                                <button onClick={this.clickhandler} className={styles.button2}> Cancel </button>
                                <button onClick={this.onFormTeacherSubmit} className={styles.button3}> Submit </button>
                            </div>
                        </Modal>
                    </div>
                    : null }

                    </div>
                : null}

                {this.state.selectedtab4 ? 
                    <div> 
                        <button onClick={this.clickhandler} className={styles.button}> + add student </button>

                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                            <div className={styles.item3}>
                                <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '50px'}}> Student Name </label>
                                <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '300px'}}> Student Mobile No </label>
                                <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '550px'}}> Student Address </label>
                                <label className={styles.text4} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '775px'}}> Class Name</label>
                            </div>
                    </div>
                    :
                    <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                        <div className={styles.item4}>
                            <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}>  Student Name </label>
                            <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '400px'}}> Student Mobile No </label>
                            <label className={styles.text7} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '725px'}}> Student Address  </label>
                            <label className={styles.text8} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '1050px'}}> Class Name </label>
                        </div>
                    </div> }

                    { this.state.sideDrawerOpen ? 
                    <div style={{position: 'absolute', top: '300px', right: '75px'}}>
                        {studentcard}
                    </div> 
                    : 
                    <div style={{position: 'absolute', top: '300px', right: '100px'}}>
                        {studentcard}
                    </div> }

                    { this.state.addorg ? 
                    <div> 
                        <Modal type="org" show={this.state.addorg}>
                        <div>
                                <h1 className={styles.heading}> Student Details Form </h1>
                                <div> 
                                    <label className={styles.label}> Name </label>
                                    <input value={this.state.studentname} className={styles.input} type="text" onChange={(event) => this.handleStudentEvent(event, "name")} />

                                    <label className={styles.droplabel}> Class </label>
                                    <Select
                                        styles={colourStyles}
                                        value={this.state.classname}
                                        placeholder="Tap to view classes"
                                        onChange={this.handleChange}
                                        options={this.state.classnameoptions}
                                    />
                                </div>

                                <label className={styles.label}> Email </label>
                                <input value={this.state.studentemail} className={styles.input} type="text" onChange={(event) => this.handleStudentEvent(event, "email")} />

                                <label className={styles.label}> Address </label>
                                <input value={this.state.studentaddress} className={styles.input} type="text" onChange={(event) => this.handleStudentEvent(event, "address")} />

                                <label className={styles.label}> Phone Number </label>
                                <input value={this.state.studentmobile} className={styles.input} type="text" onChange={(event) => this.handleStudentEvent(event, "mobile")} />

                                <button onClick={this.clickhandler} className={styles.button2}> Cancel </button>
                                <button onClick={this.onFormStudentSubmit} className={styles.button3}> Submit </button>
                            </div>
                        </Modal>
                    </div>
                    : null }
                    </div>
                : null}
            </div>
        )
    }
}


export default branch
