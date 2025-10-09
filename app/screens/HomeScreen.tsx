import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../constants/theme";

export default function HomeScreen() {
  const router = useRouter();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <LinearGradient
      colors={[theme.colors.background, "#0a0a15", "#000000"]}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/images/grid-bg.png")} 
        resizeMode="cover"
        style={styles.bg}
      >
        <View style={styles.header}>
          <Text style={styles.title}>NeoDex</Text>
          <Text style={styles.subtitle}>Next Generation PokéScanner</Text>
        </View>

        <Animated.View
          style={[styles.scannerContainer, { transform: [{ scale: pulseAnim }] }]}
        >
          <TouchableOpacity
            style={styles.scannerButton}
            onPress={() => router.push("/modal")}
          >
            <LinearGradient
              colors={[theme.colors.neon, theme.colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.innerButton}
            >
              <Text style={styles.scanText}>SCAN</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.hint}>Press to begin scan sequence</Text>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: 40,
    color: theme.colors.primary,
    letterSpacing: 4,
  },
  subtitle: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
    marginTop: 4,
  },
  scannerContainer: {
    borderRadius: 200,
    overflow: "hidden",
    shadowColor: theme.colors.neon,
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 15,
  },
  scannerButton: {
    borderRadius: 200,
    overflow: "hidden",
  },
  innerButton: {
    paddingHorizontal: 70,
    paddingVertical: 70,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  scanText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    letterSpacing: 5,
  },
  hint: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    position: "absolute",
    bottom: 40,
  },
});
