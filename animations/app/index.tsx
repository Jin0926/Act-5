import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const deck = suits.flatMap((suit) => ranks.map((rank) => `${rank}${suit}`));

export default function Index() {
  const [index, setIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const showNextCard = () => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: width,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex((prev) => (prev + 1) % deck.length);
    });
  };

  const resetDeck = () => {
    setIndex(0);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { transform: [{ translateX }] }]}>
        <Text style={styles.cardText}>{deck[index]}</Text>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={showNextCard}>
        <Text style={styles.buttonText}>Next Card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.reset]} onPress={resetDeck}>
        <Text style={styles.buttonText}>Reset Deck</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: 200,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },
  cardText: {
    fontSize: 48,
    color: "#000",
  },
  button: {
    backgroundColor: "#61dafb",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: 160,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  reset: {
    backgroundColor: "#f54242",
  },
});
