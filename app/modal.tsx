import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "./constants/theme";

export default function ScannerModal() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchPokemon = async () => {
    if (!query) return;
    setLoading(true);
    setPokemon(null);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      const data = await res.json();
      setPokemon(data);
    } catch (err) {
      setPokemon(undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[theme.colors.background, "#05050a", "#000000"]} style={styles.container}>
      <Text style={styles.title}>🔍 SCAN MODE</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon name..."
        placeholderTextColor="rgba(255,255,255,0.4)"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={fetchPokemon}
      />

      <TouchableOpacity style={styles.scanButton} onPress={fetchPokemon}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.accent]}
          style={styles.scanButtonInner}
        >
          <Text style={styles.scanButtonText}>SCAN</Text>
        </LinearGradient>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 30 }} />}

      {pokemon === undefined && !loading && (
        <Text style={styles.notFound}>No Pokémon found.</Text>
      )}

      {pokemon && !loading && (
        <View style={styles.result}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
          />
          <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.type}>
            {pokemon.types.map((t: any) => t.type.name).join(" / ")}
          </Text>
          <Text style={styles.id}>#{pokemon.id}</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
  },
  title: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    letterSpacing: 2,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderColor: theme.colors.neon,
    borderWidth: 1,
    borderRadius: 12,
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  scanButton: {
    marginTop: 20,
    borderRadius: 999,
    overflow: "hidden",
  },
  scanButtonInner: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 3,
    fontFamily: theme.fonts.bold,
  },
  notFound: {
    marginTop: 30,
    color: "red",
    fontFamily: theme.fonts.regular,
  },
  result: {
    marginTop: 40,
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
  },
  name: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.bold,
    fontSize: 24,
    marginTop: 10,
  },
  type: {
    color: theme.colors.text,
    opacity: 0.8,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    marginTop: 4,
  },
  id: {
    color: theme.colors.accent,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
    marginTop: 2,
  },
});
