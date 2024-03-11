import React, { useState } from 'react';
import { FormControl, Input, Button, Modal, Box, Stack, Text, Slider, Select, HStack, Checkbox } from "native-base";

import { useDispatch } from 'react-redux';
import { updateUser } from '../../reducers/user';

import SurveyModal from './Survey';

import { IPADDRESS, PORT } from '../../ipaddress';

export default function RegistrationModal({ isOpen, onClose, navigation }) {

    const [name, setName] = useState('');
    const [maleChecked, setMaleChecked] = useState(false);
    const [femaleChecked, setFemaleChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState({ day: '', month: '', year: '' });
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState(1);
    const [showSurveyModal, setShowSurveyModal] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleModalSubmit = async () => {
        try {
            if (!name || (!maleChecked && !femaleChecked) || !email || !password || !birthdate.day || !birthdate.month || !birthdate.year || !height || !activity) {
                setError('Veuillez remplir tous les champs.');
                return;
            }

            const gender = maleChecked ? 'M' : 'F'; 

            const formattedBirthdate = new Date(`${birthdate.year}-${birthdate.month}-${birthdate.day}`).toLocaleDateString('en-GB');

            const requestBody = {
                name,
                gender,
                email,
                password,
                birthdate: formattedBirthdate,
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
                dispatch(updateUser({ email, gender, password, name, birthdate: formattedBirthdate, activity, height, user_id: data.user.user_id }));
                onClose();
                setShowSurveyModal(true);
            } else {
                setError(data.error);
                console.error('Error:', data.error);
            }
        } catch (error) {
            setError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
            console.error('Network error:', error);
        }
    };

    const handleHeightChange = (text) => {
        if (!isNaN(text)) {
            setHeight(text);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>New account</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input value={name} onChangeText={(text) => setName(text)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Gender</FormControl.Label>
                            <HStack space={4}>
                                <Checkbox value="male" isChecked={maleChecked} onChange={() => { setMaleChecked(!maleChecked); setFemaleChecked(false); }}>
                                    Male
                                </Checkbox>
                                <Checkbox value="female" isChecked={femaleChecked} onChange={() => { setFemaleChecked(!femaleChecked); setMaleChecked(false); }}>
                                    Female
                                </Checkbox>
                            </HStack>
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
                            <Stack direction="row">
                                <Select
                                    selectedValue={birthdate.day}
                                    minWidth={100}
                                    placeholder="Day"
                                    onValueChange={(itemValue) => setBirthdate({ ...birthdate, day: itemValue })}>
                                    {[...Array(31).keys()].map((day) => (
                                        <Select.Item key={day + 1} label={`${day + 1}`} value={`${day + 1}`} />
                                    ))}
                                </Select>
                                <Select
                                    selectedValue={birthdate.month}
                                    minWidth={100}
                                    placeholder="Month"
                                    onValueChange={(itemValue) => setBirthdate({ ...birthdate, month: itemValue })}>
                                    {[...Array(12).keys()].map((month) => (
                                        <Select.Item key={month + 1} label={`${month + 1}`} value={`${month + 1}`} />
                                    ))}
                                </Select>
                                <Select
                                    selectedValue={birthdate.year}
                                    minWidth={100}
                                    placeholder="Year"
                                    onValueChange={(itemValue) => setBirthdate({ ...birthdate, year: itemValue })}>
                                    {[...Array(100).keys()].map((year) => (
                                        <Select.Item key={year + 1920} label={`${year + 1920}`} value={`${year + 1920}`} />
                                    ))}
                                </Select>
                            </Stack>
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label>Height</FormControl.Label>
                            <Input
                                value={height}
                                onChangeText={(text) => handleHeightChange(text)}
                                keyboardType="numeric"
                                placeholder="Enter height in cm" />
                        </FormControl>
                        <Box alignItems="center" w="100%">
                            <Stack space={4} alignItems="center" w="75%" maxW="300">
                                <Text textAlign="center">Sport activity frequency : {activity}</Text>
                                <Slider
                                    defaultValue={1}
                                    minValue={1}
                                    maxValue={5}
                                    colorScheme="cyan"
                                    onChange={(v) => setActivity(Math.floor(v))}
                                    value={activity}>
                                    <Slider.Track>
                                        <Slider.FilledTrack />
                                    </Slider.Track>
                                    <Slider.Thumb />
                                </Slider>
                            </Stack>
                        </Box>
                    </Modal.Body>
                    <Modal.Footer>
                        {error ? <Text color="red.500" mb={2}>{error}</Text> : null}
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button onPress={handleModalSubmit}>
                                Next
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <SurveyModal isOpen={showSurveyModal} onClose={() => setShowSurveyModal(false)} navigation={navigation} />
        </>
    );
}
