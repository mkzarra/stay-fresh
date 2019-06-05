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

export const itemStart = () => ({ type: ITEMS_START });
export const getItemsSuccess = (items) => ({ type: GET_ITEMS_SUCCESS, items });
export const getItemsFail = (error) => ({ type: GET_ITEMS_FAIL, error });
export const createItemSuccess = (items) => ({ type: CREATE_ITEM_SUCCESS, items });
export const createItemFail = (error) => ({ type: CREATE_ITEM_FAIL, error });
export const deleteItemSuccess = (items) => ({ type: DELETE_ITEM_SUCCESS, items });
export const deleteItemFail = (error) => ({ type: DELETE_ITEM_FAIL, error });
export const updateItemSuccess = (items) => ({ type: UPDATE_ITEM_SUCCESS, items });
export const updateItemFail = (error) => ({ type: UPDATE_ITEM_FAIL, error });
export const addToPantrySuccess = (pantry) => ({ type: ADD_TO_PANTRY_SUCCESS, pantry });
export const addToPantryFail = (error) => ({ type: ADD_TO_PANTRY_FAIL, error });
export const removeFromPantrySuccess = (pantry) => ({ type: REMOVE_FROM_PANTRY_SUCCESS, pantry });
export const removeFromPantryFail = (error) => ({ type: REMOVE_FROM_PANTRY_FAIL, error });


export const getItems = () => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.get('/api/items');
    const items = fetchedItems(res.data.items);
    console.log("\n\nFETCHED_ITEMS:\n" + JSON.stringify(items));
    dispatch(getItemsSuccess(items));
  }
  catch(error) {
    console.log("\n\n\nGET_ITEMS_ERROR:\n" + error);
    dispatch(getItemsFail(error));
  }
}

export const createItem = (item, token) => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.post('/api/items', {
      item, headers: { Authorization: "Bearer " + token }
    });
    console.log("\n\n\nCREATE_ITEM_RESPONSE_DATA:\n" + res.data);
    dispatch(createItemSuccess(res.data.item));
  }
  catch(error) {
    console.log("\n\n\nCREATE_ITEM_ERROR:\n" + error);
    dispatch(createItemFail(error));
  }
}

export const deleteItem = (itemId, token) => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.delete('/api/items' + itemId, {
      headers: { Authorization: "Bearer " + token }
    });
    console.log("\n\n\nDELETE_ITEM_RESPONSE_DATA:\n" + res.data);
    dispatch(deleteItemSuccess(res.data.item.id));
  }
  catch(error) {
    console.log("\n\n\nDELETE_ITEM_ERROR:\n" + error);
    dispatch(deleteItemFail(error));
  }
}

export const updateItem = (itemId, token) => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.patch('/items/' + itemId, { headers: { Authorization: "Bearer " + token } });
    console.log("\n\n\nUPDATE_ITEM_RESPONSE_DATA:\n" + res.date);
    dispatch(updateItemSuccess(res.data.items.item));
  }
  catch(error) {
    console.log(error);
    dispatch(updateItemFail(error));
  }
}

export const addToPantry = (currentUser, itemId) => async dispatch => {
  console.log("\n\naddToPantry itemActions.js:\ncurrentUser = " + currentUser)
  dispatch(itemStart());
  try {
    const res = await axios.post('/api/pantry/', {
      _user: currentUser, _item: itemId, headers: { Authorization: "Bearer " + currentUser }
    });
    console.log(res.data);
    dispatch(addToPantrySuccess(res.data.pantry.itemId));
  }
  catch(error) {
    console.log(error);
    dispatch(addToPantryFail(error));
  }
}

export const removeFromPantry = (currentUser, pantryItem) => async dispatch => {
  dispatch(itemStart());
  try {
    const res = await axios.delete('/api/pantry/' + pantryItem.key, {
      headers: { Authorization: "Bearer " + currentUser }
    });
    console.log("\n\nRemove From Pantry" + res.data);
    dispatch(removeFromPantrySuccess(res.data.pantry._id));
  }
  catch(error) {
    console.log(error);
    dispatch(removeFromPantryFail(error));
  }
}