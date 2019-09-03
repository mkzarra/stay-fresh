import axios from 'axios';
import { PANTRY_START, GET_PANTRY_SUCCESS, GET_PANTRY_FAIL } from './types';
import { getItems } from './itemActions';

export const pantryStart = () => ({ type: PANTRY_START });
export const getPantrySuccess = (pantry) => ({ type: GET_PANTRY_SUCCESS, pantry });
export const getPantryFail = (error) => ({ type: GET_PANTRY_FAIL, error });

export const getPantry = (currentUser, pantry) => async dispatch => {
  dispatch(pantryStart());
  dispatch(getItems());
  try {
    const res = await axios.get('/api/pantry/', {
      pantry,
      currentUser,
      headers: { Authorization: "Bearer " + currentUser }
    });
    dispatch(getPantrySuccess(res.data.pantry));
  }
  catch(error) {
    dispatch(getPantryFail(error));
  }
}

export const getPantryItem = (currentUser, pantryItem) => async dispatch => {
  dispatch(pantryStart());
  try {
    const res = await axios.get('/api/pantry/' + pantryItem.key, {
      pantryItem,
      currentUser,
      headers: { Authorization: "Bearer " + currentUser }
    });
    dispatch(getPantrySuccess(res.data.pantry._id));
  }
  catch(error) {
    dispatch(getPantryFail(error))
  }
}