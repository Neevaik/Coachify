import styles from '../styles/ExplorerScreen'
import { NativeBaseProvider, Box, Text, ScrollView, View, Image, Avatar, IconButton, HStack } from "native-base";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

export default function ExplorerScreen() {

  // Définition des données des cartes
  const cardsData = [
    {
      title: "Abdos",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQor8d0LzZE0qUDBhFGz5a0rt_S7seFPDpQVQ&usqp=CAU",
      exerciseCount: 10,
    },
    {
      title: "Full Body",
      image: "https://athleanx.com/wp-content/uploads/2022/12/FULL-BODY-WORKOUTS.jpg",
      exerciseCount: 15,
    },
    {
      title: "Upper Body",
      image: "https://pleineforme.co/wp-content/uploads/2021/01/pompes-prise-large-dentele%CC%81-ante%CC%81rieur-1024x536.png",
      exerciseCount: 20,
    },
    {
      title: "Biceps",
      image: "https://via.placeholder.com/300",
      exerciseCount: 25,
    },
    {
      title: "Abs",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQor8d0LzZE0qUDBhFGz5a0rt_S7seFPDpQVQ&usqp=CAU",
      exerciseCount: 30,
    },
    {
      title: "Leg day",
      image: "https://athleanx.com/wp-content/uploads/2022/09/LEG-WORKOUTS.png",
      exerciseCount: 35,
    },
    {
      title: "Streching",
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

  const thirtyDaysChallenges = [
    {
      title: "Fullbody",
      days: "30",
      image: "https://athleanx.com/wp-content/uploads/2022/12/FULL-BODY-WORKOUTS.jpg",
    },
    {
      title: "Abs",
      days: "30",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQor8d0LzZE0qUDBhFGz5a0rt_S7seFPDpQVQ&usqp=CAU",
    },
    {
      title: "UpperBody",
      days: "30",
      image: "https://pleineforme.co/wp-content/uploads/2021/01/pompes-prise-large-dentele%CC%81-ante%CC%81rieur-1024x536.png",
    },
    {
      title: "Cardio",
      days: "30",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Intense program",
      days: "30",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Streching",
      days: "30",
      image: "https://via.placeholder.com/300",
    },
  ]

  const QuickSession = [
    {
      title: "Fullbody",
      time: 45,
      image: "https://athleanx.com/wp-content/uploads/2022/12/FULL-BODY-WORKOUTS.jpg",
    },
    {
      title: "Abs",
      time: 45,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQor8d0LzZE0qUDBhFGz5a0rt_S7seFPDpQVQ&usqp=CAU",
    },
    {
      title: "UpperBody",
      time: 45,
      image: "https://pleineforme.co/wp-content/uploads/2021/01/pompes-prise-large-dentele%CC%81-ante%CC%81rieur-1024x536.png",
    },
    {
      title: "Cardio",
      time: 45,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Intense program",
      time: 45,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Streching",
      time: 45,
      image: "https://via.placeholder.com/300",
    },
  ]

  const Tendancy = [
    {
      title: "Wanna lose weight",
      level: 2,
      image: "https://premierlipo.com/wp-content/uploads/2020/06/desperate-to-lose-weight-fast.jpeg",
    },
    {
      title: "Abs like bricks",
      level: 3,
      image: "https://m.media-amazon.com/images/I/712V0EOR7qL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      title: "Shoulder large as heck",
      level: 3,
      image: "https://i.ytimg.com/vi/GE80Ri3HnVY/maxresdefault.jpg",
    },
    {
      title: "Shoulder large as heck",
      level: 3,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Shoulder large as heck",
      level: 3,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Shoulder large as heck",
      level: 3,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Shoulder large as heck",
      level: 3,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Shoulder large as heck",
      level: 3,
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Shoulder large as heck",
      level: 3,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <NativeBaseProvider>
      <ScrollView style={{ flex: 1 }}>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" px={4} py={2} borderBottomWidth={1} borderBottomColor="gray.200">
          <Text fontSize="xl" fontWeight="bold">Explorateur d'entrainement</Text>
          <IconButton
            icon={<MaterialIcons name="search" size={24} color="black" />}
            variant="unstyled"
          />
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mt={4} mx={4}>Exercices</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
            {cardsData.map((card, index) => (
              <Box key={index} shadow={3} rounded="lg" bg="white" width={150} height={200} mr={4}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: card.image }} alt="Card image" width={100} height={100} borderRadius="full" mb={2} />
                  <Box p={2} overflow="hidden">
                    <Text fontSize="md" fontWeight="bold" mb={1}>{card.title}</Text>
                    <Text color="gray.500" fontSize="sm">Nombre d'exercices: {card.exerciseCount}</Text>
                  </Box>
                </View>
              </Box>
            ))}
          </ScrollView>
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mt={4} mx={4}>30 days challenges</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
            {thirtyDaysChallenges.map((challenge, index) => (
              <Box key={index} shadow={3} rounded="lg" bg="white" width={200} height={250} mr={4}>
                <Image source={{ uri: challenge.image }} alt="Card image" width="100%" height={150} borderTopRadius="lg" />
                <Box p={2}>
                  <Text fontSize="lg" fontWeight="bold" mb={1}>{challenge.title}</Text>
                  <Text color="gray.500" fontSize="md">{challenge.days} jours</Text>
                </Box>
              </Box>
            ))}
          </ScrollView>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mt={4} mx={4}>Quick session</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
            {QuickSession.map((challenge, index) => (
              <Box key={index} shadow={3} rounded="lg" bg="white" width={200} height={250} mr={4}>
                <Image source={{ uri: challenge.image }} alt="Card image" width="100%" height={150} borderTopRadius="lg" />
                <Box p={2}>
                  <Text fontSize="lg" fontWeight="bold" mb={1}>{challenge.title}</Text>
                  <Text color="gray.500" fontSize="md">time :{challenge.time} min</Text>
                </Box>
              </Box>
            ))}
          </ScrollView>
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mt={4} mx={4}>Tendancy</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 4 }}>
            {Tendancy.map((challenge, index) => (
              <Box key={index} shadow={3} rounded="lg" bg="white" width="100%" p={4} mb={4}>
                <Avatar
                  source={{ uri: challenge.image }}
                  size="xl"
                  mb={2}
                  mx="auto"
                />
                <Box alignItems="center">
                  <Text fontSize="lg" fontWeight="bold" mb={1}>{challenge.title}</Text>
                  <Text color="gray.500" fontSize="md">Level: {challenge.level}</Text>
                </Box>
              </Box>
            ))}
          </ScrollView>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}