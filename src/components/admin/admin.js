import React, { Component } from 'react'
import styles from './admin.module.scss'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import Modal from '../Modal/Modal'

export class student extends Component {

    state = {
        sideDrawerOpen: true,
        addorg: false,
        options: [
            { name: 'Orchid International', id: 'ORG1234', branch: 'Marathahalli', location: 'Bangalore' },
            { name: 'RV School', id: 'RV1234', branch: 'Vijaynagar', location: 'Bangalore' },
            { name: 'BGS Public School', id: 'BGS1234', branch: 'Vivek Nagar', location: 'New Delhi' },
            { name: 'Swargarani School', id: 'SWA1234', branch: 'Andheri', location: 'Mumbai' },
            { name: 'Delhi Public School', id: 'DPS1234', branch: 'J P Nagar', location: 'Bangalore' },
        ]
    };

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

    render() {

        let orgcard = this.state.options.map((item) => {
            return (
                <div>
                    { this.state.sideDrawerOpen ? 
                    <div className={styles.item}>
                            <label className={styles.text}> {item.name} </label>
                            <label className={styles.text2}> {item.id }</label>
                            <label className={styles.text3}> {item.branch} </label>
                            <label className={styles.text4}> {item.location} </label>
                    </div> : 
                    <div className={styles.item2}>
                            <label className={styles.text5}> {item.name} </label>
                            <label className={styles.text6}> {item.id }</label>
                            <label className={styles.text7}> {item.branch} </label>
                            <label className={styles.text8}> {item.location} </label>
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
                            show={ this.backdropClickHandler } 
                            name="Admin"
                            tab1="Organization List"
                            tab2="Content Organization"
                        /> 
                    : null } 
                </div>

                <button onClick={this.clickhandler} className={styles.button}> + add organization </button>

                { this.state.sideDrawerOpen ? 
                <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                        <div className={styles.item3}>
                            <label className={styles.text} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '50px'}}> Org Name </label>
                            <label className={styles.text2} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '325px'}}> Org ID </label>
                            <label className={styles.text3} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '500px'}}> Org Branch </label>
                            <label className={styles.text4} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '725px'}}> Org Location </label>
                        </div>
                </div>
                :
                <div style={{position: 'absolute', top: '200px', right: '50px'}}>
                    <div className={styles.item4}>
                        <label className={styles.text5} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '75px'}}> Org Name </label>
                        <label className={styles.text6} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '450px'}}> Org ID </label>
                        <label className={styles.text7} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '725px'}}> Org Branch </label>
                        <label className={styles.text8} style={{fontSize: '24px', padding: '16px 24px', fontWeight: 'bold', left: '1050px'}}> Org Location </label>
                    </div>
                </div> }

                { this.state.sideDrawerOpen ? 
                <div style={{position: 'absolute', top: '300px', right: '75px'}}>
                    {orgcard}
                </div> 
                : 
                <div style={{position: 'absolute', top: '300px', right: '100px'}}>
                {orgcard}
                </div> }

                { this.state.addorg ? 
                <div> 
                    <Modal show={this.state.addorg} handleClose={this.clickhandler}>
                        <div>
                            <label className={styles.label}> Enter Organization Name </label>
                            <input className={styles.input} type="text" />

                            <label className={styles.label}> Enter Organization Branch </label>
                            <input className={styles.input} type="text" />

                            <label className={styles.label}> Enter Organization Location </label>
                            <input className={styles.input} type="text" />

                            <label className={styles.label}> Enter Organization Phone Number </label>
                            <input className={styles.input} type="text" />
                        </div>
                    </Modal>
                </div>
                : null }
            
            </div>
        )
    }
}

export default student
