import axios from 'axios';
import fetchedItems from '../utilities/objectLooper';
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
} from './types';
import { getPantry, pantryStart } from './pantryActions';

export const itemStart = () => ({ type: ITEMS_START });
export const getItemsSuccess = (items) => ({ type: GET_ITEMS_SUCCESS, items });
export const getItemsFail = (error) => ({ type: GET_ITEMS_FAIL, error });
export const createItemSuccess = (items) => ({ type: CREATE_ITEM_SUCCESS, items });
export const createItemFail = (error) => ({ type: CREATE_ITEM_FAIL, error });
export const deleteItemSuccess = (items) => ({ type: DELETE_ITEM_SUCCESS, items });
export const deleteItemFail = (error) => ({ type: DELETE_ITEM_FAIL, error });
export const updateItemSuccess = (items) => ({ type: UPDATE_ITEM_SUCCESS, items });
export const updateItemFail = (error) => ({ type: UPDATE_ITEM_FAIL, error });
export const addToPantrySuccess = (pantryItem, pantry, message) => ({ type: ADD_TO_PANTRY_SUCCESS, pantryItem, pantry, message });
export const addToPantryFail = (error) => ({ type: ADD_TO_PANTRY_FAIL, error });
export const removeFromPantrySuccess = (pantry) => ({ type: REMOVE_FROM_PANTRY_SUCCESS, pantry });
export const removeFromPantryFail = (error) => ({ type: REMOVE_FROM_PANTRY_FAIL, error });

export const getItems = () => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.get('/api/items');
    const items = fetchedItems(res.data.items);
    dispatch(getItemsSuccess(items));
  }
  catch(error) {
    dispatch(getItemsFail(error));
  }
}

export const createItem = (item, token, history) => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.post('/api/items', {
      item, headers: { Authorization: "Bearer " + token }
    });
    history.push('/items');
    dispatch(createItemSuccess(res.data.item));
  }
  catch(error) {
    dispatch(createItemFail(error));
  }
}

export const deleteItem = (itemId, token) => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.delete('/api/items' + itemId, {
      headers: { Authorization: "Bearer " + token }
    });
    dispatch(deleteItemSuccess(res.data.item.id));
  }
  catch(error) {
    dispatch(deleteItemFail(error));
  }
}

export const updateItem = (itemId, token) => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.patch('/items/' + itemId, { headers: { Authorization: "Bearer " + token } });
    dispatch(updateItemSuccess(res.data.items.item));
  }
  catch(error) {
    dispatch(updateItemFail(error));
  }
}

export const addToPantry = (currentUser, item, items, message) => async dispatch => {
  dispatch(itemStart());
  dispatch(pantryStart());
  console.log("\n\naddToPantry:\n", items);
  try {
    const res = await axios.post('/api/pantry/', {
      _user: currentUser,
      _item: item._id,
      itemName: item.itemName,
      category: item.category,
      storage: item.storage,
      datePurchased: new Date(),
      expiration: new Date(Date.now() + 3600000 * 24 * 7),
      headers: { Authorization: "Bearer " + currentUser }
    });
    const { _id, _user, _item, itemName, category, storage, datePurchased, expiration } = res.config.data;
    dispatch(addToPantrySuccess({ _id, _user, _item, itemName, category, storage, datePurchased, expiration }, items, message ));
  }
  catch(error) {
    dispatch(addToPantryFail(error));
  }
}

export const removeFromPantry = (currentUser, pantryItem) => async dispatch => {  
  dispatch(pantryStart());
  try {
    const res = await axios.delete('/api/pantry/' + pantryItem._id, {
      headers: { Authorization: "Bearer " + currentUser }
    });
    const pantry = dispatch(getPantry(res._user));
    dispatch(removeFromPantrySuccess(pantry));
  }
  catch(error) {
    dispatch(removeFromPantryFail(error));
  }
}