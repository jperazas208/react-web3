const change_chain = (chainId) => {
  return {
    type: 'CHAIN_CHANGED',
    payload: chainId
  }
}

export const changeChain = (chainId) => {
  return (dispatch) => {
    dispatch(change_chain(chainId))
  }
}
