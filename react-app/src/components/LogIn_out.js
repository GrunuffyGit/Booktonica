import React from 'react';
import {
    NavItem,
    NavLink,
    Button
  } from 'reactstrap';

export default class NaviLog extends React.Component {
    logout(){
        localStorage.clear();
        window.location.reload();
    }

    render(){
        if(localStorage.getItem("id")){
            return (
                <NavItem>
                    <Button color="" onClick={this.logout}>Log Out</Button>
                </NavItem>
            );
        }else{
            return (
                <NavItem>
                    <NavLink href="/Login">Log In</NavLink>
                </NavItem>
            );
        }
       
    }
}