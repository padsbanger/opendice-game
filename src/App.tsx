import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store/configureStore";
import "./App.css";
import RollsView from "./components/RollsView";

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading</div>} persistor={persistor}>
        <div className="App">
          <RollsView />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
