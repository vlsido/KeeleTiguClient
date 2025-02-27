import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { atomWithStore } from "jotai-redux";

import dictionaryReducer from "./slices/dictionarySlice";
import settingsReducer from "./slices/settingsSlice";
import { watchDictionarySaga } from "./sagas/dictionarySaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  dictionary: dictionaryReducer,
  settings: settingsReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    preloadedState
  });
}

const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(watchDictionarySaga);

export const storeAtom = atomWithStore(setupStore());

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore["dispatch"];

export default store;

