import styles from '../styles/PlanningScreeStyles'
import { View } from 'react-native';
import { NativeBaseProvider, FormControl, Input, Center, HStack, VStack, Button, Modal } from "native-base";
import { useState } from 'react';


export default function PlanningScreen() {

  const [showModal, setShowModal] = useState(false);

  return (
    <NativeBaseProvider>
        <View style={styles.container}>
      <Center>
        <Button onPress={() => setShowModal(true)}>Button</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Contact Us</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Email</FormControl.Label>
                <Input />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                  setShowModal(false);
                }}>
                  Cancel
                </Button>
                <Button onPress={() => {
                  setShowModal(false);
                }}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>

        </View>
    </NativeBaseProvider>
  )
};