import axios from 'axios';
import { PANTRY_START, GET_PANTRY_SUCCESS, GET_PANTRY_FAIL } from './types';

export const pantryStart = () => ({ type: PANTRY_START });
export const getPantrySuccess = (pantry) => ({ type: GET_PANTRY_SUCCESS, pantry });
export const getPantryFail = (error) => ({ type: GET_PANTRY_FAIL, error });

export const getPantry = (currentUser, pantry) => async dispatch => {
  dispatch(pantryStart());
  try {
    const res = await axios.get('/api/pantry/', {
      pantry,
      currentUser,
      headers: { Authorization: "Bearer " + currentUser }
    });
    console.log(res.data.pantry);
    dispatch(getPantrySuccess(res.data.pantry));
  }
  catch(error) {
    console.log(error);
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
    console.log("\n\ngetPantryItem res.data:\n" + res.data);
    dispatch(getPantrySuccess(res.data.pantry._id));
  }
  catch(error) {
    console.log("\n\nerror getting pantryItem:\n" + error);
    dispatch(getPantryFail(error))
  }
}