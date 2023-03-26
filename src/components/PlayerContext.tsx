import { createContext, ReactNode, useState } from "react";

const players = [
  { id: 1, token: "X" },
  { id: 2, token: "O" },
];

export const PlayerContext = createContext({
  player: players[0],
  togglePlayer: () => {},
});

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [player, setPlayer] = useState(players[0]);

  const togglePlayer = () => {
    setPlayer(player.id === 1 ? players[1] : players[0]);
  };

  return (
    <PlayerContext.Provider value={{ player, togglePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
interface PlayerProviderProps {
  children: ReactNode;
}
