import React from "react";
import { Roll } from "../store/rolls/types";

interface ScoreProps {
  rolls: Roll[];
}

const Score: React.FC<ScoreProps> = ({ rolls }) => {
  console.log(rolls);

  const renderScroll = () => {
    return rolls
      .filter((el: Roll, index) => index !== 0)
      .map((el: Roll, index) => (
        <div key={index}>
          {el.value} - {el.quess}
        </div>
      ));
  };

  const calculateScore = () => {
    const clearRolls = rolls.filter(
      (el: Roll, index) => index !== 0 && el.quess === "CORRECT"
    );

    return <h3>Score: {(clearRolls.length * 0.1).toFixed(1)}</h3>;
  };

  return (
    <>
      <div>{renderScroll()}</div>
      <div>{calculateScore()}</div>
    </>
  );
};

export default Score;
