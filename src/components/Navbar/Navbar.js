import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import logo from '../../logo.svg'
import Chain from '../../components/Chain/Chain'
import { useSelector } from "react-redux";

export const NavbarComponents = ({ signIn, signOut }) => {

  const { isLogged, currentAccount, ensName } = useSelector((state) => state.user);

  const shortAddr = () => {

    if(ensName !== '')
      return ensName;
    return `${currentAccount.substr(0,4)}...${currentAccount.substring(currentAccount.length - 4, currentAccount.length)}`
  }

  return (
      <Navbar bg="dark" className="justify-content-between" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top App-logo"
          />{' '}
          React Web3
          
        </Navbar.Brand>
        <div>
          <Chain />{' '}
          <Button className="connect-button" disabled={isLogged} onClick={signIn} variant="primary">{isLogged ? shortAddr() : "Connect"}</Button>{' '}
          <Button onClick={signOut} style={{visibility: isLogged ? "visible" : "hidden"}} variant="danger">X</Button>
        </div>
      </Navbar>
  )
}
