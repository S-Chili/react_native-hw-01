import { combineReducers } from '@reduxjs/toolkit';
import { setUser, clearUser } from './actions';

const initialUserState = {
  username: '',
  email: '',
  selectedImage: '',
  userId: '',
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case setUser.type:
      return {
        ...state,
        ...action.payload,
        userId: action.payload.userId,
      };
    case clearUser.type:
      return initialUserState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  // додайте інші редюсери, які ви маєте
});

export default rootReducer;