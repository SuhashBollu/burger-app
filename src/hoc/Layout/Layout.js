import React, { Component } from 'react';
import Auxi from '../Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideSrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideSrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return {showSideSrawer : !prevState.showSideSrawer};
        });
    }

    render() {
        return (
            <Auxi>
                <Toolbar open={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideSrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        );
    }
}

export default Layout;