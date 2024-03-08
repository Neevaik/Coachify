import React, { useState } from 'react';
import { Modal, Button, FormControl, Input, Icon } from 'native-base';

import { useDispatch } from 'react-redux';
import { updateUser } from '../../reducers/user';

import { IPADDRESS, PORT } from '../../ipaddress';

export default function SurveyModal({ isOpen, onClose, navigation }) {

    const [weightGoal, setWeightGoal] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);

    const dispatch = useDispatch();


    const handleGoalSelection = (selectedGoal) => {
        setSelectedGoal(selectedGoal);
    };

    const handleCreate = () => {
        dispatch(updateUser({ goal: selectedGoal, weightGoal }));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content>
                <Modal.Header>What is your main goal?</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        {["Lose weight", "Get bigger muscles", "To tone up", "Maintain a good shape"].map((option) => (
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
                        <Input
                            value={weightGoal}
                            onChangeText={(text) => setWeightGoal(text)}
                            placeholder={`Enter weight goal in kg`}
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group>
                        <Button onPress={onClose}>Close</Button>
                        {selectedGoal && (
                            <Button onPress={handleCreate}>Create</Button>
                        )}
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}
