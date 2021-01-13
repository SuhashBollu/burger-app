import React, { Component } from 'react';
import Auxi from '../Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                <Toolbar isAuth={this.props.isAuth} open={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideSrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxi>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token!==null
    };
};

export default connect(mapStateToProps)(Layout);