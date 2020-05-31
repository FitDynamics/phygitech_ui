import React, { Component } from 'react'

import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'

export class student extends Component {

    state = {
        sideDrawerOpen: true
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

    render() {

        return (
            <div style={{height: "100%"}}>
                <Toolbar drawerClickHandler={ this.drawerToggleClickHandler }/>
                {this.state.sideDrawerOpen ? 
                    <SideDrawer 
                        show={ this.backdropClickHandler } 
                        name="Org"
                        tab1="Schedule Class"
                    /> 
                : null } 
            </div>
        )
    }
}

export default student
