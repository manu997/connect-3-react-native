import { useContext, useState } from "react";
import { Button, Text, TouchableWithoutFeedback, View } from "react-native";
import { GameContext, GameProvider } from "./GameContext";
import { PlayerContext, PlayerProvider } from "./PlayerContext";

const Board = () => {
  const gameContext = useContext(GameContext);
  const playerContext = useContext(PlayerContext);

  const [cells, setCells] = useState(Array(9).fill(" "));

  const cellPressed = (key: number) => {
    const auxArr: string[] = [...cells];
    if (cells[key] === " ") {
      // Si la casilla está libre
      if (playerContext.player.id === 1) {
        auxArr[key] = playerContext.player.token; // Se introduce el token del jugador 1 a la celda que pulse
      } else {
        auxArr[key] = playerContext.player.token; // Se introduce el token del jugador 2 a la celda que pulse
      }
      setCells(auxArr);
      checkFinishGame(auxArr); // Se comprueba si el juego ha terminado en empate o en victoria del jugador actual del contexto PlayerContext
    }
  };

  const checkFinishGame = (arr: string[]) => {
    if (
      checkRows(arr, playerContext.player.token) ||
      checkCols(arr, playerContext.player.token) ||
      checkDiagonals(arr, playerContext.player.token)
    ) {
      // Si hay alguna linea con los mismos símbolos, gana el jugador actual del contexto PlayerContext
      gameContext.changeGameState("victory");
    } else if (!arr.includes(" ")) {
      // Si nadie ha ganado pero se han rellenado todas las casillas, es empate
      gameContext.changeGameState("tie");
    } else {
      playerContext.togglePlayer(); // Si el juego no ha terminado, cambia de jugador
    }
  };

  const checkRows = (arr: string[], token: string) => {
    let isVictory = true;
    for (let i = 0; i < 7; i += 3) {
      for (let j = i; j < i + 3; j++) {
        if (arr[j] != token) {
          isVictory = false;
        }
      }
      if (isVictory === true) {
        return isVictory;
      } else {
        isVictory = true;
      }
    }
    isVictory = false;
    return isVictory;
  };

  const checkCols = (arr: string[], token: string) => {
    let isVictory = true;
    for (let i = 0; i < 3; i++) {
      for (let j = i; j < 9; j += 3) {
        if (arr[j] != token) {
          isVictory = false;
        }
      }
      if (isVictory === true) {
        return isVictory;
      } else {
        isVictory = true;
      }
    }
    isVictory = false;
    return isVictory;
  };

  const checkDiagonals = (arr: string[], token: string) => {
    if (arr[0] == token) {
      if (arr[4] == arr[0] && arr[8] == arr[0]) {
        return true;
      }
      return false;
    } else if (arr[2] == token) {
      if (arr[4] == arr[2] && arr[6] == arr[2]) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  };

  const resetGame = () => {
    if (playerContext.player.id === 2) {
      playerContext.togglePlayer()
    }
    setCells(new Array(9).fill(" "));
  };

  return (
    <GameProvider>
      <PlayerProvider>
        <View className="flex-row flex-wrap w-80">
          {cells.map((item, key) => {
            return (
              <TouchableWithoutFeedback
                onPressIn={() => {
                  cellPressed(key);
                }}
                key={key}
              >
                <View className="bg-sky-900 w-1/3 h-100 border-4 border-sky-200 items-center justify-center">
                  <Text className="text-7xl py-5 text-sky-200">{item}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
          <Button title="Volver a empezar el juego" onPress={resetGame} />
        </View>
      </PlayerProvider>
    </GameProvider>
  );
};

export default Board;
