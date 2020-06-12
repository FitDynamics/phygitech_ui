import React, { Component } from 'react'
import styles from  './SideDrawer.module.scss'

import group from '../../assets/icons/group.png'
import profile from '../../assets/icons/profile.png'

export class SideDrawer extends Component {

    render() {

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
                        <div className={this.props.selected1 ? styles.other : styles.rectangle} onClick={() => this.props.click('tab1')}>
                            <label className={styles.label}> {this.props.tab1} </label>
                        </div>
                        : null }

                        { this.props.tab2 ? 
                        <div className={this.props.selected2 ? styles.other2 : styles.rectangle2} onClick={() => this.props.click('tab2')}>
                            <label className={styles.label}> {this.props.tab2} </label>
                        </div>
                        : null }

                        { this.props.tab3 ? 
                        <div className={this.props.selected3 ? styles.other3 : styles.rectangle3} onClick={() => this.props.click('tab3')}>
                            <label className={styles.label}> {this.props.tab3} </label>
                        </div>
                        : null }

                        { this.props.tab4 ? 
                        <div className={this.props.selected4 ? styles.other4 : styles.rectangle4} onClick={() => this.props.click('tab4')}>
                            <label className={styles.label}> {this.props.tab4} </label>
                        </div>
                        : null }

                        </div>
                </nav>
            </div>
        );
    }
};

export default SideDrawer
