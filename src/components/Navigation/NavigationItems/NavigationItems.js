import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth?<NavigationItem link="/orders">My Orders</NavigationItem>:null}
        {props.isAuth
            ?<NavigationItem link="/logout">Logout</NavigationItem>
            :<NavigationItem link="/auth">Login</NavigationItem>}
    </ul>);
}

export default navigationItems;