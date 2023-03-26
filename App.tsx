import React, { useContext } from "react";
import { StatusBar, Text, View } from "react-native";
import { GameContext, GameProvider } from "./src/components/GameContext";
import { PlayerContext, PlayerProvider } from "./src/components/PlayerContext";
import { FinishedGame } from "./src/views/FinishedGame";
import { Game } from "./src/views/Game";

const App = () => {
  const gameContext = useContext(GameContext);
  const playerContext = useContext(PlayerContext);

  return (
    <GameProvider>
      <PlayerProvider>
        <View className="flex-1 items-center justify-center bg-sky-500">
          <Text className="text-6xl mb-10">connect-3</Text>
          {gameContext.finishGame != "" ? ( // Si el juego ha acabado
            <FinishedGame
              text={
                gameContext.finishGame == "tie"
                  ? "Empate"
                  : `Victoria del jugador ${playerContext.player.id}`
              }
            />
          ) : (
            // Si el juego no ha acabado
            <Game />
          )}
          <StatusBar />
        </View>
      </PlayerProvider>
    </GameProvider>
  );
};

export default App;
