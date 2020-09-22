import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DiceRollResult, http } from "../http/http";
import { State } from "../store/combineReducers";
import { addDiceResult, clearRolls } from "../store/rolls/actions";
import { Roll } from "../store/rolls/types";
import Score from "./Score";

const MOVES_LIMIT = 31;

function RollsView() {
  const rolls: Roll[] = useSelector((state: State) => state.rolls);
  const dispatch = useDispatch();

  useEffect(() => {
    const previousGame = rolls.length;
    if (previousGame > 1) {
      if (!window.confirm("Would you like to continue previus game ?")) {
        resetGame();
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

  const resetGame = () => {
    dispatch(clearRolls());
    rollDice("INIT");
  };

  const rollDice = async (status: "HIGHER" | "LOWER" | "INIT") => {
    const { dice } = await http<DiceRollResult>(
      "http://roll.diceapi.com/json/d6"
    );

    if (status === "INIT") {
      dispatch(addDiceResult(dice[0]));
    } else {
      const lastRoll = rolls[rolls.length - 1].value;
      if (lastRoll > dice[0].value) {
        dispatch(
          addDiceResult({
            ...dice[0],
            quess: status === "LOWER" ? "CORRECT" : "WRONG",
          })
        );
        console.log("lower");
      } else {
        dispatch(
          addDiceResult({
            ...dice[0],
            quess: status === "HIGHER" ? "CORRECT" : "WRONG",
          })
        );
        console.log("higher");
      }
      console.log(lastRoll, dice[0].value);
    }
  };
  return (
    <StyledDiceContainer>
      <StyledDiceElement>
        {rolls.length ? (
          <StyledDice
            dangerouslySetInnerHTML={{
              __html: getCode(rolls[rolls.length - 1].value),
            }}
          />
        ) : null}
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
      </StyledDiceElement>

      {rolls.length >= MOVES_LIMIT ? (
        <button
          onClick={() => {
            resetGame();
          }}
        >
          Reset
        </button>
      ) : null}
      <Score rolls={rolls} />
    </StyledDiceContainer>
  );
}

const StyledDiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  button {
    padding: 1em;
    margin: 1em;
    background: transparent;
    border: 0;
  }
`;

const StyledDiceElement = styled.div``;

const StyledDice = styled.div`
  text-align: center;
  font-size: 5em;
`;

export default RollsView;
