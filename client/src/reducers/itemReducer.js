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
  UPDATE_ITEM_FAIL
} from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  error: null,
  showForm: false
}

const itemStart = (state, action) => updateObject(state, { loading: true });
const getItemsSuccess = (state, { items }) => updateObject(state, { items, loading: false });
const getItemsFail = (state, { error }) => updateObject(state, { error, loading: false });
const createItemSuccess = (state, { items }) => updateObject(state, { items, loading: false });
const createItemFail = (state, { error }) => updateObject(state, { error, loading: false });
const deleteItemSuccess = (state, { items }) => updateObject(state, { items, loading: false });
const deleteItemFail = (state, { error }) => updateObject (state, { error, loading: false });
const updateItemSuccess = (state, { items }) => updateObject(state, { items, loading: false });
const updateItemFail = (state, { error }) => updateObject(state, { error, loading: false });

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
    default: return state;
  }
}