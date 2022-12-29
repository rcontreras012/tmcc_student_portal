import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import { AuthReducer } from './reducers/userReducer';

const combine = combineReducers({

    user: AuthReducer

})




const persistConfig = {
    key: 'tmcc',
    storage: storage,
    version: 0,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const persistedReducer = persistReducer(persistConfig, combine);
export const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk)),
);
export const persistor = persistStore(store);