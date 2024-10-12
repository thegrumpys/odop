import {
  ENABLE_SPINNER,
  DISABLE_SPINNER,
} from './spinnerTypes';

export function enableSpinner() {
  return {
    type: ENABLE_SPINNER
  }
}

export function disableSpinner() {
  return {
    type: DISABLE_SPINNER
  }
}
