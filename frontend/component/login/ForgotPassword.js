import React, { useState } from 'react';
import { VStack, Input, Button, Modal, KeyboardAvoidingView, Center, Heading, Text, Box } from "native-base";

import { useDispatch } from 'react-redux';
import { updateUser } from '../../reducers/user';

import { IPADDRESS, PORT } from '../../ipaddress';

export default function ForgotPasswordModal({ isOpen, onClose, navigation }) {



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <KeyboardAvoidingView h={{
                base: "400px",
                lg: "auto"
            }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Center>
                    <Box bg="white" p="4" borderRadius="md">
                        <VStack flex="1" justifyContent="flex-end" w="100%" maxW="300">
                            <Heading mb="3">Forgot Password</Heading>
                            <Text color="muted.400">
                                Not to worry! Enter email address associated with your account and
                                we’ll send a link to reset your password.
                            </Text>
                            <Input placeholder="Email Address" mt="10" mb="4" />
                            {/* add logic to proceed */}
                            <Button mb="4" onPress={onClose}>Proceed</Button>
                        </VStack>
                    </Box>
                </Center>
            </KeyboardAvoidingView>;
        </Modal>
    )
}
