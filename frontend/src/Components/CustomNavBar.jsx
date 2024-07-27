import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';

import { NavLink as ReactLink, useNavigate } from 'react-router-dom';

import React, { useContext, useEffect, useState } from 'react';
import { doLogout, getCurrentUserDetails, isLoggedIn } from '../Auth';
import UserContext from '../context/UserContext';
  
const CustomNavBar = () => {
    const userContextData = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)

    useEffect(()=> {
      setLogin(isLoggedIn())
      setUser(getCurrentUserDetails())
    }, [login])

    let navigate = useNavigate()

    const logout = () => {
      doLogout(() => {
        setLogin(false)
        userContextData.setUser({
          data: null,
          login: false
        })
        navigate("/")
      })
    }

    return (
            <div>
              <Navbar color='dark' expand="md" fixed='' dark className='px-5'>
                <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                  <Nav className="me-auto" navbar>
                  <NavItem>
                      <NavLink tag={ReactLink} to="/">New Feed</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/service">Services</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        More
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>Contact Us</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Settings</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                  <Nav navbar>
                    {login && (
                      <>
                      <NavItem>
                      <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                        Profile Info
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/user/dashboard">
                        {user.email}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={logout}>
                        Logout
                      </NavLink>
                    </NavItem>
                      </>
                    )}
                    { !login && (
                      <>
                      <NavItem>
                      <NavLink tag={ReactLink} to="/login">
                        Login
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={ReactLink} to="/signup">
                        Signup
                      </NavLink>
                    </NavItem>
                      </>
                    )}
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
};

export default CustomNavBar;