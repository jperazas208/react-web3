const change_chain = (chainId) => {
  return {
    type: 'CHAIN_CHANGED',
    payload: chainId
  }
}

const change_user_info = (userInfo) => {
  return {
    type: 'USER_INFO_CHANGED',
    payload: userInfo
  }
}

export const changeChain = (chainId) => {
  return (dispatch) => {
    dispatch(change_chain(chainId))
  }
}

export const changeUserInfo = (userInfo) => {
  return (dispatch) => {
    dispatch(change_user_info(userInfo))
  }
}