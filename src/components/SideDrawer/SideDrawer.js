import React, { Component } from 'react'
import styles from  './SideDrawer.module.scss'

import group from '../../assets/icons/group.png'
import profile from '../../assets/icons/profile.png'

export class SideDrawer extends Component {

    state = {
        tab1: false,
        tab2: false
    }

    handleClick = value => {
        if (value === "tab1") {
            this.setState({
                tab1: true,
                tab2: false
            })
        } else if (value === "tab2") {
            this.setState({
                tab2: true,
                tab1: false
            })
        }
    }

    render() {
        console.log(this.state.tab1)
        console.log(this.state.tab2)

        return (
            <div>
                <nav className={ styles.side_drawer_open }>
                    <div className={styles.sidebar}>
                        <div className={styles.sidebar__logo}>
                            <img src={group} alt="profile" className={styles.image} />
                            <label> Phygitech </label>
                            <div className={styles.spacing} onClick={this.props.show}>
                                <button className={styles.toggle_button} onClick={ this.props.drawerClickHandler }>
                                    <div className={styles.toggle_button_line} ></div>
                                    <div className={styles.toggle_button_line} ></div>
                                    <div className={styles.toggle_button_line} ></div>
                                </button>
                            </div>
                        </div>
                        <div>
                            <img src={profile} alt="profile" className={styles.image2} />
                        </div>

                        <label className={styles.text}> {this.props.name} </label>

                        { this.props.tab1 ?
                        <div className={styles.rectangle} onClick={() => this.handleClick('tab1')}>
                            <label className={styles.label}> {this.props.tab1} </label>
                        </div>
                        : null }

                        { this.props.tab2 ? 
                        <div className={styles.rectangle2} onClick={() => this.handleClick('tab2')}>
                            <label className={styles.label}> {this.props.tab2} </label>
                        </div>
                        : null }

                        { this.props.tab3 ? 
                        <div className={styles.rectangle3} onClick={() => this.handleClick('tab3')}>
                            <label className={styles.label}> {this.props.tab3} </label>
                        </div>
                        : null }

                        </div>
                </nav>
            </div>
        );
    }
};

export default SideDrawer
