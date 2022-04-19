import { View, Text, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Header from "../components/Header";
import { SafeAreaView } from 'react-native-safe-area-context';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import useAuth from "../hooks/useAuth";
import { useRoute } from '@react-navigation/native'
import tw from "tailwind-rn";
import { FlatList } from 'react-native-web';

const MessageScreen = () => {
  const user = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const { matchDetails } = params;

  const sendMessage = () => {};

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Header title={getMatchedUserInfo(matchDetails.users, user.uid).displayName} callEnabled />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw('flex-1')}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw('pl-4')}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                messages.userId === user.uid ? (
                  <SenderMessage key={message.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={tw(
            'flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2'
          )}
        >
          <TextInput
            style={tw('h-10 text-lg')}
            placeholder="Envoyer un message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Envoyer" color="#07CEB6" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default MessageScreen