import { ADD_DICE_ROLL, CLEAR_ROLLS } from "./actions";
import { Rolls } from "./types";

export const initialState: Rolls = { loading: false, rolls: [] };

export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_DICE_ROLL:
      return {
        ...state,
        rolls: state.rolls.concat(action.payload),
      };
    case CLEAR_ROLLS:
      return {
        ...state,
        rolls: [],
      };
    default:
      return state;
  }
}

export default reducer;
