import { combineReducers } from "redux";
import messages from './messages/messagesReducers';
import chainId from './chain/chainReducers';
import user from './user/userReducers';

const rootReducer = combineReducers({
  messages,
  chainId,
  user
})

export default rootReducer;