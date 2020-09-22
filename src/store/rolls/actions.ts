import { DiceRollResult } from "../../http/http";

export const ADD_DICE_ROLL = "ADD_DICE_ROLL";

export const CLEAR_ROLLS = "CLEAR_ROLLS";

export const addDiceResult = (diceRoll: DiceRollResult) => {
  return {
    type: ADD_DICE_ROLL,
    payload: diceRoll,
  };
};

export const clearRolls = () => {
  return {
    type: CLEAR_ROLLS,
  };
};

export default {};
