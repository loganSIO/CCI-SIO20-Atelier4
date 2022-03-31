import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from "../hooks/useAuth";
// Importation via react-native-safe-area-context, sinon
// ne fonctionne pas sous Android
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView>
      {/* Header */}
        <View style={tw(' flex-row items-center relative justify-between px-5')}>
          <TouchableOpacity onPress={logout}>
            <Image
              style={tw('h-10 w-10 rounded-full')}
              source={{ uri: user.photoURL }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
            <Image
              style={tw('h-auto w-auto mt-2')}
              source={require('../images/ePhony.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name='chatbubble-sharp' size={30} color="black" />
          </TouchableOpacity>

        </View>

      {/* End of Header */}


      {/* <Text>HomeScreen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate("Chat")}
      />

      <Button
        title="Déconnexion"
        onPress={logout}
       /> */}
    </SafeAreaView>
  )
}

export default HomeScreen