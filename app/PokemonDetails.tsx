import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PokemonDetails() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ffcc" />
      </View>
    );
  }

  if (!pokemon) return null;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: pokemon.sprites.other["official-artwork"].front_default }}
        style={styles.image}
      />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.type}>Tipo: {pokemon.types.map((t: any) => t.type.name).join(", ")}</Text>
      <Text style={styles.info}>Altura: {pokemon.height / 10} m</Text>
      <Text style={styles.info}>Peso: {pokemon.weight / 10} kg</Text>

      <Text style={styles.statsTitle}>Status Base</Text>
      {pokemon.stats.map((s: any) => (
        <Text key={s.stat.name} style={styles.stat}>
          {s.stat.name}: {s.base_stat}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  name: {
    color: "#00ffcc",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  type: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  info: {
    color: "#ccc",
    textAlign: "center",
    marginBottom: 5,
  },
  statsTitle: {
    color: "#00ffcc",
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  stat: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
    textTransform: "capitalize",
  },
});
