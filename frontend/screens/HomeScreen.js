import React from 'react';
import { Text, NativeBaseProvider, Box, Stack, Slider } from "native-base";
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function HomeScreen() {

  const user = useSelector(state=> state.user)
  

  return (
    <NativeBaseProvider>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.password}</Text>
      <Text>{user.gender}</Text>
      <Text>{user.activity}</Text>
      <Text>{user.height}</Text>
      <Text>{user.birthdate}</Text>
    </NativeBaseProvider>
  );
}
