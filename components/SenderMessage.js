import { View, Text } from 'react-native'
import React from 'react'
import tw from "tailwind-rn";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={[
        tw('bg-gray-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2'),
        { alignSelf: "flex-start", marginLeft: "auto" },
      ]}
    >
      <Text
        style={tw('text-white')}
      >
        {message.message}
      </Text>
    </View>
  )
}

export default SenderMessage