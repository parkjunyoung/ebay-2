import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Header extends Component {

    render() {
        const Login = ()=>{
            return (
                <LinkContainer to="/login">
                    <NavItem>LOGIN</NavItem>
                </LinkContainer>
            )
        };

        const Logout = ()=>{
            return (
                <NavItem>LOGOUT</NavItem>
            )
        };

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">MyStore</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/admin/products">
                            <NavItem>ADMIN</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/join">
                            <NavItem>JOIN</NavItem>
                        </LinkContainer>
                        { this.props.isLogin ? <Logout/>  : <Login/> }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;