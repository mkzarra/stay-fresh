import updateObject from '../utilities/updateObject';
import {
  ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAIL,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  ADD_TO_PANTRY_SUCCESS,
  ADD_TO_PANTRY_FAIL,
  REMOVE_FROM_PANTRY_SUCCESS,
  REMOVE_FROM_PANTRY_FAIL
} from '../actions/types';

const initialState = {
  items: [],
  message: '',
  loading: false,
  error: null,
  showForm: false
}

const itemStart = (state, action) => updateObject(state, { loading: true });
const getItemsSuccess = (state, { items }) => updateObject(state, { items, loading: false });
const getItemsFail = (state, { error }) => updateObject(state, { error, loading: false });
const createItemSuccess = (state, { items }) => updateObject(state, { items });
const createItemFail = (state, { error }) => updateObject(state, { error, loading: false });
const deleteItemSuccess = (state, { items }) => updateObject(state, { items, loading: false });
const deleteItemFail = (state, { error }) => updateObject (state, { error, loading: false });
const updateItemSuccess = (state, { items }) => updateObject(state, { items, loading: false });
const updateItemFail = (state, { error }) => updateObject(state, { error, loading: false });
const addToPantrySuccess = (state, { pantry, message }) => updateObject(state, { pantry, message, loading: false });
const addToPantryFail = (state, { error }) => updateObject(state, { error, loading: false });
const removeFromPantrySuccess = (state, { pantry }) => updateObject(state, { pantry, loading: false });
const removeFromPantryFail = (state, { error }) => updateObject(state, { error, loading: false });


export default function (state = initialState, action) {
  switch(action.type) {
    case ITEMS_START: return itemStart(state, action);
    case GET_ITEMS_SUCCESS: return getItemsSuccess(state, action);
    case GET_ITEMS_FAIL: return getItemsFail(state, action);
    case CREATE_ITEM_SUCCESS: return createItemSuccess(state, action);
    case CREATE_ITEM_FAIL: return createItemFail(state, action);
    case DELETE_ITEM_SUCCESS: return deleteItemSuccess(state, action);
    case DELETE_ITEM_FAIL: return deleteItemFail(state, action);
    case UPDATE_ITEM_SUCCESS: return updateItemSuccess(state, action);
    case UPDATE_ITEM_FAIL: return updateItemFail(state, action);
    case ADD_TO_PANTRY_SUCCESS: return addToPantrySuccess(state, action);
    case ADD_TO_PANTRY_FAIL: return addToPantryFail(state, action);
    case REMOVE_FROM_PANTRY_SUCCESS: return removeFromPantrySuccess(state, action);
    case REMOVE_FROM_PANTRY_FAIL: return removeFromPantryFail(state, action);
    default: return state;
  }
}