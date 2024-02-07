import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import hostReducer from "./slices/hostSlice";
import formReducer from "./slices/formSlice"

const persistConfig = {
  key: 'user',
  storage,

};

const reducers = combineReducers({ user: userReducer, host: hostReducer, formdata: formReducer });

const persistedReducer = persistReducer(persistConfig, reducers);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // serializableCheck: false
    }),
});

const persistor = persistStore(store);

export { store, persistor };
