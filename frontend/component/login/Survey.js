import React, { useState } from 'react';
import { Modal, Button, FormControl, Input, Icon } from 'native-base';

import { useDispatch } from 'react-redux';
import { updateUser } from '../../reducers/user';

import { useSelector } from 'react-redux';

import { IPADDRESS, PORT } from '../../ipaddress';

export default function SurveyModal({ isOpen, onClose, navigation }) {

    const [weightGoal, setWeightGoal] = useState('');
    const [weightdescription, setWeightDescription] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [startingsDate, setStartingDate] = useState('')
    const [error, setError] = useState('');

    const dispatch = useDispatch();


    const user = useSelector(state => state.user)

    const handleGoalSelection = (selectedGoal) => {
        setSelectedGoal(selectedGoal);
    };

    const handleCreate = () => {
        dispatch(updateUser({}));
        onClose();
        navigation.navigate('TabNavigation')
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content>
                <Modal.Header>{user.name}{user.gender}{user.email}{user.password}{user.birthdate}{user.height}{user.activity}What is your main goal?</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        {["To lose weight", "To gain muscles", "To tone up", "To stay in shape"].map((option) => (
                            <Button
                                key={option}
                                onPress={() => handleGoalSelection(option)}
                                startIcon={<Icon name={selectedGoal === option ? 'check-circle' : 'circle'} />}
                                >
                                {option}
                            </Button>
                        ))}
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>What's your weight goal?</FormControl.Label>
                        <Input value={weightGoal} onChangeText={(text) => setWeightGoal(text)} placeholder={`Enter weight goal in kg`} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Goal description</FormControl.Label>
                        <Input value={weightdescription} onChangeText={(text) => setWeightDescription(text)} placeholder={`Describe your goals`} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>When do you wanna start ?</FormControl.Label>
                        <Input value={startingsDate} onChangeText={(text) => setStartingDate(text)} placeholder={`Write down when you want to start you first training`} />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group>
                        <Button onPress={onClose}>Close</Button>
                        <Button onPress={handleCreate}>Create</Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}
