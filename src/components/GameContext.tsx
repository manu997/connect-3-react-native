import { createContext, ReactNode, useState } from "react";

export const GameContext = createContext({
  finishGame: "",
  changeGameState: (state: string) => {},
});

export const GameProvider = ({ children }: PlayerProviderProps) => {
  const [finishGame, setFinishGame] = useState("");

  const changeGameState = (state: string) => {
    setFinishGame(state);
  };

  return (
    <GameContext.Provider value={{ finishGame, changeGameState }}>
      {children}
    </GameContext.Provider>
  );
};
interface PlayerProviderProps {
  children: ReactNode;
}
