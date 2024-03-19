import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Text, Stack, AspectRatio, Image, Center, Heading, Button, ScrollView } from "native-base";
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

  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
  };

  const program = [
    {
      program_id: "1",
      user_id: "1",
      program_duration: "3 days",
      sessions: {
        1: {
          session_title: "Leg day",
          image: "https://lh3.googleusercontent.com/proxy/-5j7L-If8Bb6mVvuPAFvPY_2aeUFukUHNHoY0by3StKYsWFBfUP5I5pCuo4N697imoBgRpc_1b7ugffA0ctIVjb-QLKUWQ2ySfsXX_TqkinGZcUv2aYhEYrvNVc2KuU3sg-gOSqgzqfDafqiz0MMVkWihBGBZh_g2WXn",
          session_duration: 30,
          exercises: {
            1: {
              exercise_name: "Squat",
              phase: "warm-up",
              value: 10,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            },
            2: {
              exercise_name: "Pompe",
              phase: "session core",
              value: 12,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",

            },
            3: {
              exercise_name: "Fente avant",
              phase: "session core",
              value: 15,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            },
            4: {
              exercise_name: "Crunch",
              phase: "stretching",
              value: 10,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            }
          }
        },

        2: {
          session_title: "Biceps",
          image: "https://devenez-sportif.com/wp-content/uploads/2016/02/bicep.jpg",
          session_duration: 30,
          exercises: {
            1: {
              exercise_name: "Squat",
              phase: "warm-up",
              value: 12,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            },
            2: {
              exercise_name: "Pompe",
              phase: "session core",
              value: 15,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            },
            3: {
              exercise_name: "Fente avant",
              phase: "session core",
              value: 12,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            },
            4: {
              exercise_name: "Dips",
              phase: "stretching",
              value: 10,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            }
          }
        },
        3: {
          session_title: "Abs",
          image: "https://www.ericfavre.com/lifestyle/wp-content/uploads/2020/06/comment-se-muscler-les-abdos-1024x683.jpg",
          session_duration: 30,
          exercises: {
            1: {
              exercise_name: "Crunch",
              phase: "warm-up",
              value: 12,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            },
            2: {
              exercise_name: "Pompe",
              phase: "session core",
              value: 15,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            },
            3: {
              exercise_name: "Fente avant",
              phase: "session core",
              value: 12,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            },
            4: {
              exercise_name: "Dips",
              phase: "stretching",
              value: 10,
              exercise_type: "reps",
              location: "in the gym",
              gif_link: "example",
              video_link: "example",
              exercice_image: "https://via.placeholder.com/300",
            }
          }
        },
      }
    }
  ];

  return (
    <NativeBaseProvider>
      <Text>Don't forget your goals: {objectives && objectives.length > 0 && objectives[0].objective}</Text>
      <Text alignContent="center">Your program for the week :</Text>
      <Stack space={4}>
        <ScrollView horizontal={true} style={{ width: '100%' }}>
          <Stack space={4} direction="row">
            {program.map(programItem => (
              Object.values(programItem.sessions).map((session, index) => (
                <TouchableOpacity key={session.session_title} onPress={() => handleExerciseSelect(session)}>
                  <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                    <Box>
                      <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{ uri: session.image }} alt="image" />
                      </AspectRatio>
                      <Center bg="violet.500" _dark={{ bg: "violet.400" }} _text={{ color: "warmGray.50", fontWeight: "700", fontSize: "xs" }} position="absolute" bottom="0" px="3" py="1.5">
                        {index + 1}
                      </Center>
                    </Box>
                    <Stack p="2" space={2}>
                      <Heading size="sm" ml="-1">
                        {session.session_title}
                      </Heading>
                      <Text fontSize="xs" _light={{ color: "violet.500" }} _dark={{ color: "violet.400" }} fontWeight="500" ml="-0.5" mt="-1">
                        {session.session_duration} min
                      </Text>
                    </Stack>
                  </Box>
                </TouchableOpacity>
              ))
            ))}
          </Stack>
        </ScrollView>

        {selectedExercise && (
          <Box>
            <Text>Your session contains :</Text>
            <Text>Exercises:</Text>
            <ScrollView style={{ maxHeight: 500 }}>
              <Stack space={4}>
                {Object.values(selectedExercise.exercises).map(exercise => (
                  <TouchableOpacity key={exercise.exercise_name}>
                    <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                      <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                          <Image source={{ uri: exercise.exercice_image }} alt="image" />
                        </AspectRatio>
                      </Box>
                      <Stack p="2" space={2}>
                        <Heading size="sm" ml="-1">
                          {exercise.exercise_name}
                        </Heading>
                        <Text fontSize="xs" _light={{ color: "violet.500" }} _dark={{ color: "violet.400" }} fontWeight="500" ml="-0.5" mt="-1">
                          {exercise.value} reps
                        </Text>
                      </Stack>
                    </Box>
                  </TouchableOpacity>
                ))}
              </Stack>
            </ScrollView>
          </Box>
        )}
        <Center>
          <Button>Start session</Button>
        </Center>
      </Stack>
    </NativeBaseProvider>
  );
}