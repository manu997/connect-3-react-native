import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { GameContext } from "../components/GameContext";

export const FinishedGame = ({ text }: FinishedGameProps) => {
  const gameContext = useContext(GameContext);
  return (
    <View>
      <Text className="text-4xl">{text}</Text>
      <Button
        title="Volver a jugar"
        onPress={() => gameContext.setFinishGame("")}
      />
    </View>
  );
};

interface FinishedGameProps {
  text: string;
}