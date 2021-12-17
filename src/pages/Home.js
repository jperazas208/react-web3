import React, { useEffect } from 'react'
import { NavbarComponents } from '../components/Navbar/Navbar';
import { useDispatch, useSelector } from "react-redux";
import detectEthereumProvider from '@metamask/detect-provider';
import { addMessage } from '../redux/actions/messages/messageAction';
import { changeChain, changeUserInfo } from '../redux/actions/user/userAction';
import Message from '../components/Message/Message';
import { ethers } from "ethers";

const Home = () => {

  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.messages);
  const { currentAccount } = useSelector((state) => state.user);

  const addMessageError = (data) => {
    dispatch(addMessage(data))
  }

  useEffect(async() => {
    
    const provider = await detectEthereumProvider();
    const ethProvider = new ethers.providers.Web3Provider(provider)

    if(!provider) {
      addMessageError({ head : "Wallet not found", body: `Please install MetaMask!`, variant: 'danger' });
    } else {
      // Este metodo sirve para poder conectarse no mas entrar a la app
      try {
        await window.ethereum.enable();

        const id = await window.ethereum.request({ method: 'eth_chainId' })
        dispatch(changeChain(parseChainId(id)))
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

        let provider = new ethers.providers.EtherscanProvider();
        let history = await provider.getHistory(accounts[0]);
        console.log(history);
        
        if(parseChainId(id) === 1) {
          const ensName = await ethProvider.lookupAddress(accounts[0]);
          dispatch(changeUserInfo({ isLogged: true, currentAccount: accounts[0], ensName: !ensName ? '' : ensName }));
        } else {
          dispatch(changeUserInfo({ isLogged: true, currentAccount: accounts[0], ensName: '' }));
        }
        
      } catch (err) {
        if (err.code === 4001) {
          addMessageError({head : "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'danger'})
        } else if(err.code === -32002) {
          addMessageError({head : "User Request Pending", body: 'Please unlock MetaMask and try agin.', variant: 'danger'})
        } else {
          console.error(err);
          addMessageError({head : "Error", body: err.message, variant: 'danger'})
        }
      } 
    }
  }, []);

  useEffect(() => {

    window.onbeforeunload = function() { return "Prevent reload" }
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    window.ethereum.on('chainChanged', (_chainId) => {
      dispatch(changeChain(parseChainId(_chainId)))
    });

  }, [])

  const parseChainId = (_chainId) => {
    return parseInt(_chainId, 16)
  }

  const handleAccountsChanged = async (accounts) => {
    const provider = await detectEthereumProvider();
    const ethProvider = new ethers.providers.Web3Provider(provider);

    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      addMessageError({head : "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info'})
    } else if (accounts[0] !== currentAccount) {
      const id = await window.ethereum.request({ method: 'eth_chainId' })
      if(parseChainId(id) === 1) {
        const ensName = await ethProvider.lookupAddress(accounts[0]);
        dispatch(changeUserInfo({ isLogged: true, currentAccount: accounts[0], ensName: !ensName ? '' : ensName }));
      } else {
        dispatch(changeUserInfo({ isLogged: true, currentAccount: accounts[0], ensName: '' }));
      }
      addMessageError({head : "Account Changed", body: `addres: ${accounts[0]}`, variant: 'warning'})
    }
  }

  const SignIn = async () => {
    //Detect Provider
    const provider = await detectEthereumProvider()
    const ethProvider = new ethers.providers.Web3Provider(provider)

    if(!provider) {

      addMessageError({head : "Wallet not found", body: `Please install MetaMask!`, variant: 'warning'})

    } else {

      const address = await ConnectWallet(ethProvider)
      if (address)
        addMessageError({head : "User Login", body: `addres: ${address}`, variant: 'success'})

    }
    
}

  const ConnectWallet = async (ethProvider) => {

    try {
      await window.ethereum.enable();

      const id = await window.ethereum.request({ method: 'eth_chainId' })
      dispatch(changeChain(parseChainId(id)))

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

      if(parseChainId(id) === 1) {
        const ensName = await ethProvider.lookupAddress(accounts[0]);
        dispatch(changeUserInfo({ isLogged: true, currentAccount: accounts[0], ensName: !ensName ? '' : ensName }));
      } else {
        dispatch(changeUserInfo({ isLogged: true, currentAccount: accounts[0], ensName: '' }));
      }
      return accounts[0]

    } catch(err) {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.')
        addMessageError({head : "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'danger'})
      } else if(err.code === -32002) {
        console.log('Please unlock MetaMask.')
        addMessageError({head : "User Request Pending", body: 'Please unlock MetaMask and try agin.', variant: 'danger'})
      } else {
        console.error(err);
        addMessageError({head : "Error", body: err.message, variant: 'danger'})
      }

    }
    
  }

  const SignOut = async () => {
    dispatch(changeUserInfo({ isLogged: false, currentAccount: '', ensName: '' }))
  }

  return (
    <div>
      <NavbarComponents signIn={SignIn} signOut={SignOut} />
      <div className='message-list'>
        {
          messages.map((item,i) => (
            <Message head={item.head} body={item.body} variant={item.variant} id={i} key={i} />
          ))
        }
      </div>
    </div>
  )
}


export default Home;
