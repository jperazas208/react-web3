const initialState = {
  messages: []
}

const messages = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_MESSAGE': 
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((item, index) => index !== action.payload)
      }
      default:
        return state
  }
}

export default messages;