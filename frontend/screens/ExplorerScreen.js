import React from "react";
import { View } from 'react-native';
import styles from '../styles/ExplorerScreen'
import { NativeBaseProvider, Box, FormControl,Stack,Input,WarningOutlineIcon } from "native-base";

export default function ExplorerScreen() {

  const Example = () => {
    return <Box alignItems="center">
      <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" defaultValue="12345" placeholder="password" />
            <FormControl.HelperText>
              Must be atleast 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl>
      </Box>
    </Box>;
  };




  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Example></Example>
      </View>
    </NativeBaseProvider>
  );
}