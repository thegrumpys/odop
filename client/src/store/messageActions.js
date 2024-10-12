import {
  ADD_MESSAGE,
  DISABLE_MESSAGE,
} from './messageTypes';

export function addMessage(message, variant, header, help_url) {
  return {
    type: ADD_MESSAGE,
    payload: {
      message: message,
      variant: variant,
      header: header,
      help_url: help_url
    }
  }
}

export function disableMessage() {
  return {
    type: DISABLE_MESSAGE
  }
}
