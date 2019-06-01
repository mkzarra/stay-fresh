import axios from 'axios';
import {
  PANTRY_START,
  ADD_TO_PANTRY_SUCCESS,
  ADD_TO_PANTRY_FAIL,
  REMOVE_FROM_PANTRY_SUCCESS,
  REMOVE_FROM_PANTRY_FAIL,
  GET_PANTRY_SUCCESS,
  GET_PANTRY_FAIL,
  CREATE_PANTRY_SUCCESS,
  CREATE_PANTRY_FAIL
} from './types';

export const pantryStart = () => ({ type: PANTRY_START });
export const getPantrySuccess = (pantry) => ({ type: GET_PANTRY_SUCCESS, pantry });
export const getPantryFail = (error) => ({ type: GET_PANTRY_FAIL, error });
export const addToPantrySuccess = (pantry) => ({ type: ADD_TO_PANTRY_SUCCESS, pantry });
export const addToPantryFail = (error) => ({ type: ADD_TO_PANTRY_FAIL, error });
export const removeFromPantrySuccess = (pantry) => ({ type: REMOVE_FROM_PANTRY_SUCCESS, pantry });
export const removeFromPantryFail = (error) => ({ type: REMOVE_FROM_PANTRY_FAIL, error });
export const createPantrySuccess = (pantry) => ({ type: CREATE_PANTRY_SUCCESS, pantry });
export const createPantryFail = (error) => ({ type: CREATE_PANTRY_FAIL, error });

export const getPantry = ({ token, currentUser, pantryId }) => async dispatch => {
  dispatch(pantryStart());
  try {
    const res = await axios.get('/api/pantry/' + pantryId, {
      currentUser,
      headers: {
        Authorization: "Bearer " + token
      }
    });
    console.log(res.data);
    dispatch(getPantrySuccess(res.data.pantry));
  }
  catch(error) {
    console.log(error);
    dispatch(getPantryFail(error));
  }
}

export const createPantry = ({ token, currentUser }) => async dispatch => {
  dispatch(pantryStart());
  try {
    const res = await axios.post('/api/pantry', {
      currentUser,
      headers: {
        Authorization: "Bearer " + token
      }
    });
    console.log(res.data);
    dispatch(createPantrySuccess(res.data.pantry));
  }
  catch(error) {
    console.log(error);
    dispatch(createPantryFail(error));
  }
}

export const addToPantry = ({ token, currentUser, pantryId, itemId }) => async dispatch => {
  dispatch(pantryStart());
  try {
    const res = await axios.post('/api/pantry/' + pantryId, {
      currentUser,
      itemId,
      headers: {
        Authorization: "Bearer " + token
      }
    });
    console.log(res.data);
    dispatch(addToPantrySuccess(res.data.pantry.itemId));
  }
  catch(error) {
    console.log(error);
    dispatch(addToPantryFail(error));
  }
}

export const removeFromPantry = ({ token, currentUser, pantryId, itemId }) => async dispatch => {
  dispatch(pantryStart());
  try {
    const res = await axios.delete('/api/pantry/' + pantryId + '/item/' + itemId, {
      currentUser,
      headers: {
        Authorization: "Bearer " + token
      }
    });
    console.log(res);
    dispatch(removeFromPantrySuccess(res.data.pantry.itemId));
  }
  catch(error) {
    console.log(error);
    dispatch(removeFromPantryFail(error));
  }
}