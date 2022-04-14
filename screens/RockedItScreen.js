import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from "tailwind-rn";

const RockedItScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={[tw('h-full bg-green-500 pt-20'), { opacity: 0.89}]}>

      <Text style={tw('text-white text-center mt-5')}>
        {userSwiped.displayName} et toi allez former un grand groupe !
      </Text>

      <View style={tw('flex-row justify-evenly mt-5')}>

        <Image
          style={tw('h-32 w-32 rounded-full')}
          source={{
            uri: loggedInProfile.photoURL,
          }}
        />

        <Image
          style={tw('h-32 w-32 rounded-full')}
          source={{
            uri: userSwiped.photoURL,
          }}
        />

      </View>

      <TouchableOpacity
        style={tw('bg-white m-5 px-10 py-8 rounded-full mt-20')}
        onPress={() => {
          navigation.goBack();
          navigation.navigate('Chat');
        }}
      >
        <Text>Envoyez un message!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RockedItScreen