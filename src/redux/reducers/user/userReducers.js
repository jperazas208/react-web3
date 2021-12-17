const initialState = {
  chainId: -1,
  isLogged: false,
  currentAccount: '',
  ensName: ''
}

const user = (state = initialState, action) => {
  switch(action.type) {
    
    case 'CHAIN_CHANGED':
      return {
        ...state,
        chainId: action.payload
      }
    
    case 'USER_INFO_CHANGED':
      return {
        ...state,
        isLogged: action.payload.isLogged,
        currentAccount: action.payload.currentAccount,
        ensName: action.payload.ensName
      }
    default:
      return state
  }
}

export default user;