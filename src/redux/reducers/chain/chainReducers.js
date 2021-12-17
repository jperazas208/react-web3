const initialState = {
  chainId: -1
}

const chainId = (state = initialState, action) => {
  switch(action.type) {
    case 'CHAIN_CHANGED':
      return {
        ...state,
        chainId: action.payload
      }
      default:
        return state
  }
}

export default chainId;