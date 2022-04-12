import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from "tailwind-rn";
import { db } from "../firebase";
import useAuth from '../hooks/useAuth';

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [country, setCountry] = useState(null);
  const [description, setDescription] = useState(null);
  const [instrument, setInstrument] = useState(null);
  const [genre, setGenre] = useState(null);
  const [skill, setSkill] = useState(null);

  const incompleteForm = !country || !description || !instrument || !genre || !skill;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      country: country,
      description: description,
      instrument: instrument,
      genre: genre,
      skill: skill,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
    })
      .catch((error) => {
        alert(error.message);
    });
  };

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
        1. Ville
      </Text>
      <TextInput
        value={country}
        onChangeText={setCountry}
        style={tw("text-center pb-2")}
        maxLength={38}
        placeholder="La ville dans laquelle tu habites"
      />

      <Text style={tw('text-center p-4 font-bold')}>
        2. Bio
      </Text>
      <TextInput
        value={description}
        multiline={true}
        maxLength={280}
        onChangeText={setDescription}
        style={tw("text-center pb-2")}
        placeholder="Brève description"
      />
      {/* Ajouter un dropdown, plus pratique */}
      <Text style={tw('text-center p-4 font-bold')}>
        3. Instrument(s)
      </Text>
      <TextInput
        value={instrument}
        maxLength={280}
        onChangeText={setInstrument}
        style={tw("text-center pb-2")}
        placeholder="Instrument(s) maitrisé(s)"
      />
      {/* Ajouter un dropdown, plus pratique */}
      <Text style={tw('text-center p-4 font-bold')}>
        4. Genre(s)
      </Text>
      <TextInput
        value={genre}
        maxLength={280}
        onChangeText={setGenre}
        style={tw("text-center pb-2")}
        placeholder="Genre(s) musical"
      />

      <Text style={tw('text-center p-4 font-bold')}>
        5. Niveau
      </Text>
      <TextInput
        value={skill}
        onChangeText={setSkill}
        style={tw("text-center pb-2")}
        keyboardType="numeric"
        maxLength={3}
        placeholder="Estimation de ton niveau de 1 à 5"
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={[
          tw('w-64 p-3 rounded-xl absolute bottom-10 bg-green-400'),
          incompleteForm ? tw('bg-gray-400') : tw('bg-green-400'),
          ]}
        onPress={updateUserProfile}
      >

        <Text style={tw('text-center text-black text-xl')}>Mettre à jour le profil</Text>
      </TouchableOpacity>

    </View>
  );
};

export default ModalScreen