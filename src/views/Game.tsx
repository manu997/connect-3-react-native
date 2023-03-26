import React, { useContext } from "react";
import { Text, View } from "react-native";
import Board from "../components/Board";
import { PlayerContext } from "../components/PlayerContext";

export const Game = () => {
  const playerContext = useContext(PlayerContext);
  return (
    <View>
      <Text className="text-2xl text-center">Turno del jugador {playerContext.player.id}</Text>
      <View className="my-20">
        <Board />
      </View>
    </View>
  );
};
