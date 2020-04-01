import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';
import NaviLog from "../components/LogIn_out"

export default class NaviBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    render(){
        const toggle = () => {
            this.setState({open: !this.state.open});
        }
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/"><h1>Booktonica</h1></NavbarBrand>
                <NavbarText>Your home for reading.</NavbarText>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={this.state.open} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/">Books</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/MyList">My Lists</NavLink>
                    </NavItem>
                    <NaviLog></NaviLog>
                  </Nav>
                </Collapse>
            </Navbar>
          );
    }
}