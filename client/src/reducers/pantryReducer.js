import updateObject from  '../utilities/updateObject';
import {
  PANTRY_START,
  ADD_TO_PANTRY_SUCCESS,
  ADD_TO_PANTRY_FAIL,
  REMOVE_FROM_PANTRY_SUCCESS,
  REMOVE_FROM_PANTRY_FAIL,
  GET_PANTRY_SUCCESS,
  GET_PANTRY_FAIL,
  EDIT_PANTRY_ITEM_SUCCESS,
  EDIT_PANTRY_ITEM_FAIL
} from '../actions/types';

const initialState = {
  pantry: [],
  loading: false,
  error: null,
}

const pantryStart = (state, action) => updateObject(state, { loading: true });
const addToPantrySuccess = (state, { pantry }) => updateObject(state, { pantry, loading: false });
const addToPantryFail = (state, { error }) => updateObject(state, { error, loading: false });
const getPantrySuccess = (state, { pantry }) => updateObject(state, { pantry, loading: false });
const getPantryFail = (state, { error }) => updateObject(state, { error, loading: false });
const removeFromPantrySuccess = (state, { pantry }) => {
  console.log('removeFromPantrySuccess: state =', state, 'removeFromPantrySuccess: pantry =', pantry)
  return updateObject(state, { pantry });
}
const removeFromPantryFail = (state, { error }) => updateObject(state, { error, loading: false });
const editPantryItemSuccess = (state, { pantry }) => updateObject(state, {  ...pantry, loading: false });
const editPantryItemFail = (state, { error }) => updateObject(state, { error, loading: false });

export default (state = initialState, action) => {
  console.log('pantry state:', state, '\n\npantry action:', action)
  switch(action.type) {
    case PANTRY_START: return pantryStart(state, action);
    case ADD_TO_PANTRY_SUCCESS: return addToPantrySuccess(state, action);
    case ADD_TO_PANTRY_FAIL: return addToPantryFail(state, action);
    case GET_PANTRY_SUCCESS: return getPantrySuccess(state, action);
    case GET_PANTRY_FAIL: return getPantryFail(state, action);
    case REMOVE_FROM_PANTRY_SUCCESS: return removeFromPantrySuccess(state, action);
    case REMOVE_FROM_PANTRY_FAIL: return removeFromPantryFail(state, action);
    case EDIT_PANTRY_ITEM_SUCCESS: return editPantryItemSuccess(state, action);
    case EDIT_PANTRY_ITEM_FAIL: return editPantryItemFail(state, action);
    default: return state;
  }
}