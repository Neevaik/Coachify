import { useSelector } from 'react-redux';
import { useState, useRef } from "react";
import { Modal, Input, FormControl, Button, VStack,Center, NativeBaseProvider, Text } from "native-base";
import {IPADDRESS, PORT} from '../ipaddress';
import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/user';

export default function SettingScreen({ navigation }) {
  const user = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(user.email); // Créer une référence pour le composant Input
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [name, setName] = useState(user.name);
  
  const dispatch = useDispatch()


  const handleModalCancel = () =>{
    setBirthdate(user.birthdate);
    setEmail(user.email);
    setName(user.name);
    setModalVisible(false);
  }

  const handleModalSubmit = async () => {
    try {
      const requestBody = {
        user_id : user.user_id,
        name,
        birthdate
      };
      const response = await fetch(`http://${IPADDRESS}:${PORT}/users/update`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(updateUser({ birthdate }));
        navigation.navigate('TabNavigator');
        setModalVisible(false);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
    
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
      <Modal isOpen={modalVisible} onClose={() => { setModalVisible(false); }} avoidKeyboard justifyContent="flex-end" bottom="4" size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Updating user information</Modal.Header>
          <Modal.Body>
            <FormControl mt="3">
              <FormControl.Label>Birthdate</FormControl.Label>
              <Input value={birthdate} onChangeText={(text) => setBirthdate(text)}/>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={name} onChangeText={(text) => setName(text)}/>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => handleModalSubmit()}>
              Update
            </Button>
            <Button flex="1" onPress={() => handleModalCancel()}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <VStack space={8} alignItems="center">
        <Button w="104" onPress={() => {setModalVisible(!modalVisible)}}>
          My profile
        </Button>
      </VStack>
      </Center>
    </NativeBaseProvider>
  );
}