import { useSelector } from 'react-redux';
import { useState } from "react";
import { Modal, Input, FormControl, Button,  Center, NativeBaseProvider, Text, FlatList, Box , Icon, ChevronRightIcon, Divider, extendTheme} from "native-base";
import { IPADDRESS, PORT } from '../ipaddress';
import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/user';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { convertToDateFormat } from '../tools';

export default function SettingScreen({ navigation }) {
  //#region Native provider params
  const ICONSIZE = 7;
  //#endregion

  const user = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [birthdate, setBirthdate] = useState(convertToDateFormat(user.birthdate));
  const [activity, setActivity] = useState(user.activity.toString());
  const [height, setHeight] = useState(user.height.toString());
  

  const dispatch = useDispatch()

  
  const handleModalCancel = () => {
    setBirthdate(convertToDateFormat(user.birthdate));
    setEmail(user.email);
    setName(user.name);
    setActivity(user.activity.toString());
    setHeight(user.height.toString());
    setPassword(user.password);
    setModalVisible(false);
  }

  const handleModalSubmit = async () => {
    try {
      const requestBody = {
        user_id: user.user_id,
        name,
        birthdate,
        email,
        password,
        activity : parseInt(activity),
        height :parseInt(height)
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
        dispatch(updateUser({ name, birthdate, email, password, activity, height }));
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
      <Modal isOpen={modalVisible} onClose={() => { setModalVisible(false); }} avoidKeyboard justifyContent="flex-end" bottom="4" size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Updating user information</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={name} onChangeText={(text) => setName(text)} />
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={(text) => setEmail(text)} />
              <FormControl.Label>Password</FormControl.Label>
              <Input value={password} onChangeText={(text) => setPassword(text)} />
              <FormControl.Label>Birthdate</FormControl.Label>
              <Input value={birthdate} onChangeText={(text) => setBirthdate(text)} />
              <FormControl.Label>Height</FormControl.Label>
              <Input value={height} onChangeText={(text) => setHeight(text)} />
              <FormControl.Label>Activity</FormControl.Label>
              <Input value={activity} onChangeText={(text) => setActivity(text)}/>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group alignItems="center" direction='row' space={4} w={280}>
              <Button onPress={() => handleModalSubmit()}>
                Update
              </Button>
              <Button onPress={() => handleModalCancel()}>
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Center flex={1}>
        <Button.Group direction='column' colorScheme='blueGray' space={2} w={560} isAttached>
          <Button  onPress={() => { setModalVisible(!modalVisible) }} leftIcon = {<Icon as={AntDesign} name='profile' size={ICONSIZE} color="white" />} rightIcon={<ChevronRightIcon />}>
             My profile
          </Button>
          <Button variant="outline"  leftIcon = {<Icon as={Ionicons} name='settings-sharp' size={ICONSIZE}/>} rightIcon={<ChevronRightIcon />}>
            General settings
          </Button>
        </Button.Group>
      </Center>
    </NativeBaseProvider>
  );
}