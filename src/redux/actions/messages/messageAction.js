const add_message = (data) => {
  return {
    type: 'ADD_MESSAGE',
    payload: data
  }
}

const remove_message= (id) => {
  return {
    type: 'REMOVE_MESSAGE',
    payload: id
  }
}

export const addMessage = (data) => {
  return (dispatch) => {
    dispatch(add_message(data))
  }
}

export const removeMessage = (id) => {
  return (dispatch) => {
    dispatch(remove_message(id))
  }
}