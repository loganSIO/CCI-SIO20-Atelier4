import { View, Text, Button } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  return (
    <View>
      <Text>{loading ? 'connexion...' : "Connectez-vous"}</Text>
      <Button title="Connexion" onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;