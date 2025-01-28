import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { atomWithStore } from "jotai-redux";

import dictionaryReducer from "./slices/dictionarySlice";
import { watchDictionarySaga } from "./sagas/dictionarySaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(watchDictionarySaga);

export const storeAtom = atomWithStore(store);

export type AppStore = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

