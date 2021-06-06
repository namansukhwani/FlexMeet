import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import user from './slices/userSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: user,
})

const persistreducer = persistReducer(
    persistConfig,
    rootReducer
);

export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([ReduxThunk, logger])
    ,
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
})

export let persistStrore = persistStore(store);