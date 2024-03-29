import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "tailwind-rn";
import { onSnapshot, collection, query, where } from '@firebase/firestore';
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "../components/ChatRow";

const ChatList = () => {

  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'rockedit'),
          where('usersRockedIt', 'array-contains', user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );

  return matches.length > 0 ? (
      <FlatList
        style={tw('h-full')}
        data={matches}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
        <ChatRow matchDetails={item} />}
      />
    ) : (
      <View style={tw('p-5')}>
        <Text style={tw('text-center text-lg')}>Aucun musiciens pour le moment</Text>
      </View>
    )

}

export default ChatList