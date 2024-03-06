import React, { useState } from 'react';
import { FormControl, Input, Button, Modal, Box, Stack, Text, Slider } from "native-base";

import { useDispatch } from 'react-redux';
import { updateUser } from '../../reducers/user';

import { IPADDRESS, PORT } from '../../ipaddress';

export default function RegistrationModal({ isOpen, onClose, navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('');
    const [onChangeValue, setOnChangeValue] = useState(1);

    const dispatch = useDispatch();

    const handleModalSubmit = async () => {
        try {
            const requestBody = {
                name,
                email,
                password,
                birthdate,
                height: parseInt(height),
                activity: parseInt(activity)
            };
            const response = await fetch(`http://${IPADDRESS}:${PORT}/users/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();

            if (response.ok) {
                dispatch(updateUser({ email, password, name }));
                navigation.navigate('TabNavigator');
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>New account</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input value={name} onChangeText={(text) => setName(text)} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Email</FormControl.Label>
                        <Input value={email} onChangeText={(text) => setEmail(text)} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Password</FormControl.Label>
                        <Input value={password} onChangeText={(text) => setPassword(text)} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Birthdate</FormControl.Label>
                        <Input value={birthdate} onChangeText={(text) => setBirthdate(text)} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Height</FormControl.Label>
                        <Input value={height} onChangeText={(text) => setHeight(text)} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Activity</FormControl.Label>
                        <Input value={activity} onChangeText={(text) => setActivity(text)} />
                    </FormControl>
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
                </Modal.Body>
                
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button onPress={handleModalSubmit}>
                            Create
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}