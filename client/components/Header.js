import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Header extends Component {

    componentDidMount() {
        this.props.getCart();
        this.props.requestStatus();
    }

    handleLogout(){
        this.props.requestLogout().then( ()=>{
            alert('로그아웃 되었습니다.')
            this.props.history.push("/");
            return true;
        });
    }

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
                <NavItem onClick={ this.handleLogout.bind(this) }>LOGOUT</NavItem>
            )
        };

        const Join = () => {
            return (
                <LinkContainer to="/join">
                    <NavItem>JOIN</NavItem>
                </LinkContainer>
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
                        <LinkContainer to="/cart">
                            <NavItem>CART</NavItem>
                        </LinkContainer>
                        { this.props.isLogin ? "" : <Join/> }
                        { this.props.isLogin ? <Logout/>  : <Login/> }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;