import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DiceRollResult, http } from "../http/http";
import { State } from "../store/combineReducers";
import { addDiceResult, clearRolls } from "../store/rolls/actions";
import { Roll } from "../store/rolls/types";

const MOVES_LIMIT = 10;

function RollsView() {
  const rolls: Roll[] = useSelector((state: State) => state.rolls.rolls);
  const dispatch = useDispatch();

  useEffect(() => {
    const previousGame = rolls.length;
    if (previousGame) {
      if (!window.confirm("Would you like to continue previus game ?")) {
        dispatch(clearRolls());
        rollDice("INIT");
      }
    }
  }, []);

  useEffect(() => {
    if (rolls.length < 1) {
      rollDice("INIT");
    }
  }, []);

  const getCode = (value: number) => {
    return String.fromCharCode(9855 + value);
  };

  const rollDice = async (status: "HIGHER" | "LOWER" | "INIT") => {
    const { dice } = await http<DiceRollResult>(
      "http://roll.diceapi.com/json/d6"
    );

    const lastRoll = rolls[rolls.length - 1].value;

    if (lastRoll < dice[0].value) {
      console.log("lower");
    } else {
      console.log("higher");
    }

    console.log(lastRoll, dice[0].value);

    dispatch(addDiceResult(dice[0]));
  };

  return (
    <div>
      <button
        disabled={rolls.length >= MOVES_LIMIT}
        onClick={() => rollDice("HIGHER")}
      >
        Higher
      </button>
      <button
        disabled={rolls.length >= MOVES_LIMIT}
        onClick={() => rollDice("LOWER")}
      >
        Lower
      </button>
      <span>{rolls.length ? rolls[rolls.length - 1].value : null}</span>
      {rolls.length ? (
        <span
          style={{
            fontSize: "5em",
          }}
          dangerouslySetInnerHTML={{
            __html: getCode(rolls[rolls.length - 1].value),
          }}
        />
      ) : null}
      {rolls.length === MOVES_LIMIT ? (
        <button
          onClick={() => {
            dispatch(clearRolls());
          }}
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}

export default RollsView;
