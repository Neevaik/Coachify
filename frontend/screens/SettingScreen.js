import { useSelector } from 'react-redux';
import { useState } from "react";
import { Modal, Input, FormControl, Button, Center, NativeBaseProvider, Popover, Text, Icon, ChevronRightIcon } from "native-base";
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
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [birthdate, setBirthdate] = useState(convertToDateFormat(user.birthdate));
  const [activity, setActivity] = useState(user.activity.toString());
  const [height, setHeight] = useState(user.height.toString());
  const [isPopoverOpen, setPopoverOpen] = useState(false);


  const dispatch = useDispatch()

  const handlePasswordClick = () => setShowPassword(!showPassword);

  const handleModalCancel = () => {
    setBirthdate(convertToDateFormat(user.birthdate));
    setEmail(user.email);
    setName(user.name);
    setActivity(user.activity.toString());
    setHeight(user.height.toString());
    setPassword(user.password);
    setUpdateModalVisible(false);
  }

  const handleModalSubmit = async () => {
    try {
      const requestBody = {
        user_id: user.user_id,
        name,
        birthdate,
        email,
        password,
        activity: parseInt(activity),
        height: parseInt(height)
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
        setUpdateModalVisible(false);
        setPopoverOpen(false);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }

  };

  return (
    
    <NativeBaseProvider >
      <Modal isOpen={updateModalVisible} onClose={handleModalCancel} avoidKeyboard justifyContent="center" bottom="4" size="lg" alignItems="center">
        <Modal.Content>
          <Modal.Header>Updating user information</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={name} onChangeText={(text) => setName(text)} />
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={(text) => setEmail(text)} />
              <FormControl.Label>Password</FormControl.Label>
              <Input type={showPassword ? "text" : "password"} value={password} onChangeText={(text) => setPassword(text)} InputRightElement={<Button h="full" w="1/6" onPress={handlePasswordClick}>{showPassword ? "Hide" : "Show"}</Button>} />
              <FormControl.Label>Birthdate</FormControl.Label>
              <Input value={birthdate} onChangeText={(text) => setBirthdate(text)} />
              <FormControl.Label>Height</FormControl.Label>
              <Input value={height} onChangeText={(text) => setHeight(text)} InputRightElement={<Button h="full" w="1/6" colorScheme="coolGray">cm</Button>} />
              <FormControl.Label>Activity</FormControl.Label>
              <Input value={activity} onChangeText={(text) => setActivity(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group alignItems="center" direction='row' space={3}>
              <Popover trigger={triggerProps => { return <Button {...triggerProps} onPress={() => setPopoverOpen(true)}>Update</Button>; }} isOpen={isPopoverOpen} onClose={() => setPopoverOpen(!isPopoverOpen)}>
                <Popover.Content accessibilityLabel="Update user information" w="56">
                  <Popover.Arrow />
                  <Popover.Header>Update user information</Popover.Header>
                  <Popover.Body>
                    This will update data relating to your profile. Do you want
                    to confirm operation ?
                  </Popover.Body>
                  <Popover.Footer justifyContent="center">
                    <Button.Group space={2}>
                      <Button onPress={handleModalSubmit}>Confirm update</Button>
                      <Button onPress={()=> setPopoverOpen(false)} colorScheme="danger" variant="ghost">
                        Cancel
                      </Button>
                    </Button.Group>
                  </Popover.Footer>
                </Popover.Content>
              </Popover>
              <Button colorScheme="danger" variant="ghost" onPress={() => handleModalCancel()}>
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Center flex={1}>
        <Button.Group direction='column' colorScheme='blueGray' space={2} w={560} isAttached>
          <Button onPress={() => { setUpdateModalVisible(!updateModalVisible) }} leftIcon={<Icon as={AntDesign} name='profile' size={ICONSIZE} color="white" />} rightIcon={<ChevronRightIcon />}>
            My profile
          </Button>
          <Button variant="outline"  leftIcon={<Icon as={Ionicons} name='settings-sharp' size={ICONSIZE} />} rightIcon={<ChevronRightIcon />}>
            General settings
          </Button>
        </Button.Group>
      </Center>
    </NativeBaseProvider>
    
  );
}