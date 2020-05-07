import axios from 'axios';
import { PANTRY_START, GET_PANTRY_SUCCESS, GET_PANTRY_FAIL, EDIT_PANTRY_ITEM_SUCCESS, EDIT_PANTRY_ITEM_FAIL } from './types';

export const pantryStart = () => ({ type: PANTRY_START });
export const getPantrySuccess = (pantry) => ({ type: GET_PANTRY_SUCCESS, pantry });
export const getPantryFail = (error) => ({ type: GET_PANTRY_FAIL, error });
export const editPantryItemSuccess = (pantry) => ({ type: EDIT_PANTRY_ITEM_SUCCESS, pantry });
export const editPantryItemFail = (error) => ({ type: EDIT_PANTRY_ITEM_FAIL, error });

export const getPantry = (currentUser, pantry) => async dispatch => {
  console.log(pantry);
  dispatch(pantryStart());
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
    dispatch(getPantryFail(error));
  }
}

export const editPantryItem = (currentUser, pantryItem, pantry) => async dispatch => {
  dispatch(pantryStart());
  try {
    const res = await axios.patch('/api/pantry/' + pantryItem.id, {
      pantryItem,
      headers: { Authorization: "Bearer " + currentUser }
    });
    dispatch(editPantryItemSuccess(res.config.data.pantryItem));
    dispatch(getPantry(currentUser, pantry))
  }
  catch(error) {
    dispatch(editPantryItemFail(error));
  }
}