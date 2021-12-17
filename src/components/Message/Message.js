import React from 'react'
import { Alert } from 'react-bootstrap';
import { removeMessage } from '../../redux/actions/messages/messageAction';
import { useDispatch } from "react-redux";

const Message = ({ variant, head, body, id }) => {

  const dispatch = useDispatch();

  const close = () => {
    dispatch(removeMessage(id))
  }

  return (
    <Alert variant={variant ? variant : 'dark'} onClose={close} dismissible>
      <Alert.Heading>{head}</Alert.Heading>
      <p>
        {body}
      </p>
    </Alert>
  )

}

export default Message;