import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Stack, AspectRatio, Image, Center, Heading, Button, ScrollView } from "native-base";
import { useSelector } from 'react-redux';
import { IPADDRESS, PORT } from '../ipaddress';
import { TouchableOpacity } from 'react-native';

import data from '../data';

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

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <NativeBaseProvider>
      <Text alignContent="center">Your program for the week :</Text>
      <Stack space={4}>
        <ScrollView horizontal={true} style={{ width: '100%' }}>
          <Stack space={4} direction="row">
            {data.map(item => (
              <TouchableOpacity key={item.id} onPress={() => handleExerciseSelect(item)}>
                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                  <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <Image source={{ uri: item.image }} alt="image" />
                    </AspectRatio>
                    <Center bg="violet.500" _dark={{ bg: "violet.400" }} _text={{ color: "warmGray.50", fontWeight: "700", fontSize: "xs" }} position="absolute" bottom="0" px="3" py="1.5">
                      {item.Day}
                    </Center>
                  </Box>
                  <Stack p="2" space={2}>
                    <Heading size="sm" ml="-1">
                      {item.session}
                    </Heading>
                    <Text fontSize="xs" _light={{ color: "violet.500" }} _dark={{ color: "violet.400" }} fontWeight="500" ml="-0.5" mt="-1">
                      {item.duration}
                    </Text>
                  </Stack>
                </Box>
              </TouchableOpacity>
            ))}
          </Stack>
        </ScrollView>

        {selectedExercise && (
          <Box>
            <Text>Selected Exercise:</Text>
            <Text>{selectedExercise.session}</Text>
            <Text>Duration: {selectedExercise.duration}</Text>
            <Text>Calories: {selectedExercise.calories}</Text>
          </Box>
        )}
        <Center>
          <Button>Start session</Button>
        </Center>
      </Stack>
    </NativeBaseProvider>
  );
}
