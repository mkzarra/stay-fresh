import { FETCH_USER } from '../actions/types';

const initialState = {
  payload: null,
  currentUser: null
}

export default function (state = initialState, { type, payload, currentUser }) {
  switch (type) {
    case FETCH_USER: return { payload, currentUser } || false;
    default: return state;
  }
}