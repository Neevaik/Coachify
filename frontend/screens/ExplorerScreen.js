import styles from '../styles/ExplorerScreen'
import { NativeBaseProvider, Box, Text,Stack,Slider } from "native-base";
import React, { useState } from "react";

export default function ExplorerScreen() {


  const [onChangeValue, setOnChangeValue] = useState(1);


  return (
    <NativeBaseProvider>
      <Box alignItems="center" w="100%">
        <Stack space={4} alignItems="center" w="75%" maxW="300">
          <Text textAlign="center">Activity : {onChangeValue}</Text>
          <Slider
            defaultValue={1}
            minValue={1}
            maxValue={5}
            colorScheme="cyan"
            onChange={(v) => setOnChangeValue(Math.floor(v))}
            value={onChangeValue}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Stack>
      </Box>
    </NativeBaseProvider>
  );
}