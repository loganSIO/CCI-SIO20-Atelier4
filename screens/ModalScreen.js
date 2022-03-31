import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import tw from "tailwind-rn";
import useAuth from '../hooks/useAuth';

const ModalScreen = () => {
  const { user } = useAuth();

  return (
    <View style={tw('flex-1 items-center pt-1')}>
      <Image
        style={tw('h-20')}
        resizeMode="contain"
        source={require('../images/ePhony.png')}
      />

      <Text
        style={tw('text-xl text-gray-500 p-2 font-bold')}
      >
        Bienvenue {user.displayName} !
      </Text>

      <Text style={tw('text-center p-4 font-bold')}>
        1. Photo de profile
      </Text>
      <TextInput

      />
    </View>
  )
}

export default ModalScreen