import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import styles from '../styles/LoginScreenStyles';

import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/user';

import { IPADDRESS, PORT } from '../ipaddress';

export default function RegistrationModal({ isVisible, setIsVisible, navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('');

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
        setIsVisible(false)
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Créer un compte</Text>
                <TextInput
                    placeholder='Name'
                    onChangeText={text => setName(text)}
                    value={name}
                    style={[styles.input, styles.inputModal]}
                    autoCapitalize="none"
                    placeholderTextColor="#000000"
                    color={styles.inputTextModal.color}
                />
                <TextInput
                    placeholder='Email'
                    onChangeText={text => setEmail(text)}
                    value={email}
                    style={[styles.input, styles.inputModal]}
                    autoCapitalize="none"
                    placeholderTextColor="#000000"
                    color={styles.inputTextModal.color}
                />
                <TextInput
                    placeholder='Password'
                    onChangeText={text => setPassword(text)}
                    value={password}
                    style={[styles.input, styles.inputModal]}
                    secureTextEntry
                    placeholderTextColor="#000000"
                    color={styles.inputTextModal.color}
                />
                <TextInput
                    placeholder='Birthdate'
                    onChangeText={text => setBirthdate(text)}
                    value={birthdate}
                    style={[styles.input, styles.inputModal]}
                    placeholderTextColor="#000000"
                    color={styles.inputTextModal.color}
                />
                <TextInput
                    placeholder='Height'
                    onChangeText={text => setHeight(text)}
                    value={height}
                    style={[styles.input, styles.inputModal]}
                    placeholderTextColor="#000000"
                    color={styles.inputTextModal.color}
                    keyboardType='numeric'
                />
                <TextInput
                    placeholder='Activity'
                    onChangeText={text => setActivity(text)}
                    value={activity}
                    style={[styles.input, styles.inputModal]}
                    placeholderTextColor="#000000"
                    color={styles.inputTextModal.color}
                    keyboardType='numeric'
                />
                <View style={styles.modalButtonContainer}>
                    <TouchableOpacity style={styles.modalButton} onPress={handleModalSubmit}>
                        <Text style={styles.textButton}>Valider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsVisible(false)}>
                        <Text style={styles.textButton}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
