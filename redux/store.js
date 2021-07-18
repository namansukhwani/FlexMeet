import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import user from './slices/userSlice';
import meeting from './slices/meetingSlice';
// import storage from './storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: user,
    meeting: meeting
})

const persistreducer = persistReducer(
    persistConfig,
    rootReducer
);

export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // serializableCheck: {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],

            // },
            serializableCheck: false,
        }).concat([ReduxThunk])
    ,
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
})

export let persistStrore = persistStore(store);