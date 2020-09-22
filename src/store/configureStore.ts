import { createStore, applyMiddleware } from "redux";
import createRootReducer from "./combineReducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, createRootReducer());

export default function configureStore(preloadedState?: any) {
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);

  return { store, persistor };
}
