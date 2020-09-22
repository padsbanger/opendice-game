import { combineReducers } from "redux";

import rollsReducer from "./rolls/reducer";
import { Roll } from "./rolls/types";

export default () =>
  combineReducers({
    rolls: rollsReducer,
  });

export interface State {
  rolls: Roll[];
}
