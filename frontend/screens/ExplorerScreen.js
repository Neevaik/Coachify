import styles from '../styles/ExplorerScreen'
import { NativeBaseProvider, Box, Text, ScrollView, AspectRatio, Image, Heading, IconButton, HStack } from "native-base";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

export default function ExplorerScreen() {

  // Définition des données des cartes
  const cardsData = [
    {
      title: "Card 1",
      image: "https://via.placeholder.com/300",
      exerciseCount: 10,
    },
    {
      title: "Card 2",
      image: "https://via.placeholder.com/300",
      exerciseCount: 15,
    },
    {
      title: "Card 3",
      image: "https://via.placeholder.com/300",
      exerciseCount: 20,
    },
    {
      title: "Card 4",
      image: "https://via.placeholder.com/300",
      exerciseCount: 25,
    },
    {
      title: "Card 5",
      image: "https://via.placeholder.com/300",
      exerciseCount: 30,
    },
    {
      title: "Card 6",
      image: "https://via.placeholder.com/300",
      exerciseCount: 35,
    },
    {
      title: "Card 7",
      image: "https://via.placeholder.com/300",
      exerciseCount: 40,
    },
    {
      title: "Card 8",
      image: "https://via.placeholder.com/300",
      exerciseCount: 45,
    },
    {
      title: "Card 9",
      image: "https://via.placeholder.com/300",
      exerciseCount: 50,
    },
    {
      title: "Card 10",
      image: "https://via.placeholder.com/300",
      exerciseCount: 55,
    }
  ];

  return (
    <NativeBaseProvider>
      {/* Header avec titre et bouton de recherche */}
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" px={4} py={2} borderBottomWidth={1} borderBottomColor="gray.200">
        <Text fontSize="xl" fontWeight="bold">Explorateur d'entrainement</Text>
        <IconButton
          icon={<MaterialIcons name="search" size={24} color="black" />}
          variant="unstyled"
        />
      </Box>
      
      {/* Défilement horizontal des cartes */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
        {cardsData.map((card, index) => (
          <Box key={index} shadow={3} rounded="lg" bg="white" width={150} height={200} mr={4}>
            <Image source={{ uri: card.image }} alt="Card image" width="100%" height={100} borderTopRadius="lg" />
            <Box p={2}>
              <Text fontSize="md" fontWeight="bold" mb={1}>{card.title}</Text>
              <Text color="gray.500" fontSize="sm">Nombre d'exercices: {card.exerciseCount}</Text>
            </Box>
          </Box>
        ))}
      </ScrollView>
    </NativeBaseProvider>
  );
}
