import { ADD_DICE_ROLL, CLEAR_ROLLS } from "./actions";
import { Roll } from "./types";

export const initialState: Roll[] = [];

export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_DICE_ROLL:
      return state.concat(action.payload);
    case CLEAR_ROLLS:
      return [];
    default:
      return state;
  }
}

export default reducer;
