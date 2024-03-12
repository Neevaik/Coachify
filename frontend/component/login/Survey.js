import React, { useState } from 'react';
import { Modal, FormControl, Input, Button, Checkbox, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { IPADDRESS, PORT } from '../../ipaddress';

export default function SurveyModal({ isOpen, onClose, navigation }) {

    const [weight_goal, setWeightGoal] = useState('70');
    const [objective_description, setObjectiveDescription] = useState('i want big muscles');
    const [objective, setObjective] = useState('');
    const [starting_date, setStartingDate] = useState('2022-10-02');
    const [error, setError] = useState('');

    const user = useSelector(state => state.user);

    const handleGoalSelection = (goal) => {
        if (objective.includes(goal)) {
            setObjective(objective.replace(`${goal},`, '').replace(`${goal}`, ''));
        } else {
            setObjective(`${objective}${goal},`);
        }
    };

    const handleCreate = async () => {
        try {
            if (!weight_goal || !objective_description || !objective || !starting_date) {
                setError('Veuillez remplir tous les champs.');
                return;
            }

            const requestBody = {
                user_id: user.user_id,
                weight_goal: parseFloat(weight_goal),
                objective_description,
                objective,
                starting_date: new Date(starting_date).toLocaleDateString('fr-FR')
            };
            const response = await fetch(`http://${IPADDRESS}:${PORT}/objectives/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (response.ok) {
                onClose();
                navigation.navigate('TabNavigator');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        }
    };
    const id = user.user_id;
    console.log(id, weight_goal, objective_description, objective, starting_date)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content>
                <Modal.Header>What is your main goal?</Modal.Header>
                <Modal.Body>
                    {["To lose weight", "To gain muscles", "To tone up", "To stay in shape"].map((option) => (
                        <FormControl key={option}>
                            <Checkbox value={option} isChecked={objective.includes(option)} onChange={() => handleGoalSelection(option)}>
                                {option}
                            </Checkbox>
                        </FormControl>
                    ))}
                    <FormControl mt="3">
                        <FormControl.Label>What's your weight goal?</FormControl.Label>
                        <Input value={weight_goal} onChangeText={(text) => setWeightGoal(text)} placeholder={`Enter weight goal in kg`} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Goal description</FormControl.Label>
                        <Input value={objective_description} onChangeText={(text) => setObjectiveDescription(text)} placeholder={`Describe your goals`} />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>When do you wanna start ?</FormControl.Label>
                        <Input value={starting_date} onChangeText={(text) => setStartingDate(text)} placeholder={`Write down when you want to start you first training`} />
                    </FormControl>
                    {error ? <Text color="red.500" mt={4}>{error}</Text> : null}
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
