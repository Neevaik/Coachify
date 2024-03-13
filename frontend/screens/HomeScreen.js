import { Text, NativeBaseProvider, Box, Button, HStack, VStack, Image, ScrollView } from "native-base";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IPADDRESS, PORT } from '../ipaddress';
import { TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const user = useSelector(state => state.user);
  const [objectives, setObjectives] = useState([]);
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const fetchObjectives = async () => {
    try {
      const response = await fetch(`http://${IPADDRESS}:${PORT}/objectives/getByUserId?user_id=${user.user_id}`);
      if (!response.ok) {
        throw new Error('Error please restart');
      }
      const data = await response.json();
      setObjectives(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, []);

  const data = [
    { id: 1, title: 'Exercice 1', duration: '30 min', calories: 150, image: 'https://medias.pourlascience.fr/api/v1/images/view/5d1b663a8fe56f77c8671165/wide_1300/image.jpg' },
    { id: 2, title: 'Exercice 2', duration: '45 min', calories: 200, image: 'https://medias.pourlascience.fr/api/v1/images/view/5d1b663a8fe56f77c8671165/wide_1300/image.jpg' },
    { id: 3, title: 'Exercice 3', duration: '20 min', calories: 100, image: 'https://medias.pourlascience.fr/api/v1/images/view/5d1b663a8fe56f77c8671165/wide_1300/image.jpg' },
    { id: 4, title: 'Exercice 4', duration: '20 min', calories: 100, image: 'https://medias.pourlascience.fr/api/v1/images/view/5d1b663a8fe56f77c8671165/wide_1300/image.jpg' },
    { id: 5, title: 'Exercice 5', duration: '20 min', calories: 100, image: 'https://medias.pourlascience.fr/api/v1/images/view/5d1b663a8fe56f77c8671165/wide_1300/image.jpg' },
    { id: 6, title: 'Exercice 6', duration: '20 min', calories: 100, image: 'https://medias.pourlascience.fr/api/v1/images/view/5d1b663a8fe56f77c8671165/wide_1300/image.jpg' },
    { id: 7, title: 'Exercice 7', duration: '20 min', calories: 100, image: 'https://medias.pourlascience.fr/api/v1/images/view/5d1b663a8fe56f77c8671165/wide_1300/image.jpg' },
  ];

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <NativeBaseProvider>
      <VStack space={4} alignItems="center">
        {objectives.map((objective, index) => (
          <Text key={index}>Your goal is : {objective.objective}</Text>
        ))}
        {error && <Text>Error: {error}</Text>}
        <Text>Your progam :</Text>
        <ScrollView horizontal={true} style={{ width: '100%' }}>
          <HStack space={4} alignItems="center">
            {data.map(item => (
              <TouchableOpacity key={item.id} onPress={() => handleExerciseSelect(item)}>
                <Box width="250px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <Image source={{ uri: item.image }} alt="Exercise" height="150px" width="100%" />
                  <Box p="4">
                    <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
                    <Text>Duration: {item.duration}</Text>
                    <Text>Calories: {item.calories}</Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            ))}
          </HStack>
        </ScrollView>
      </VStack>

      {selectedExercise && (
        <Box>
          <Text>Selected Exercise:</Text>
          <Text>{selectedExercise.title}</Text>
          <Text>Duration: {selectedExercise.duration}</Text>
          <Text>Calories: {selectedExercise.calories}</Text>
        </Box>
      )}
      <Box alignItems="center">
        <Button>Start session</Button>
      </Box>
    </NativeBaseProvider>
  );
}
