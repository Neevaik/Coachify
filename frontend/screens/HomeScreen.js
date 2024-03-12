import { Text, NativeBaseProvider } from "native-base";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IPADDRESS, PORT } from '../ipaddress';

export default function HomeScreen() {
  const user = useSelector(state => state.user);
  const [objectives, setObjectives] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getObjectives = async () => {
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

    getObjectives();
  }, []);

  return (
    <NativeBaseProvider>
      {objectives.map((objective, index) => (
        <Text key={index}>The goal is : {objective.objective}</Text>
      ))}
      {error && <Text>Error: {error}</Text>}
    </NativeBaseProvider>
  );
}
