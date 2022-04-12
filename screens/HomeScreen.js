import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from "../hooks/useAuth";
// Importation via react-native-safe-area-context, sinon
// ne fonctionne pas sous Android
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-rn';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { Touchable } from 'react-native-web';

// Data provisoire pour test

const CARD_DATA = [
  {
    firstName: "Fleckos",
    photoURL : "https://scontent-cdt1-1.xx.fbcdn.net/v/t39.30808-6/277724358_3285879765021324_3871693390521386930_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=zQF8AdTYVQkAX8siESR&_nc_ht=scontent-cdt1-1.xx&oh=00_AT-kiKVUbJy66SrPlD3cPf8jqSxD70QG8gp0o1ahGcvriQ&oe=625B3F6D",
    country: "Colmar",
    description: "Batteur du groupe Aoraki",
    instrument: "Batterie",
    genre: "Rock, Metal",
    skill: "5/5",
    id: 123,
  },
  {
    firstName: "Spitz",
    photoURL: "https://scontent-cdg2-1.xx.fbcdn.net/v/t39.30808-6/241423087_4244134702337286_1759684679725022392_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=MkgShUzDlEAAX9FnfnA&_nc_ht=scontent-cdg2-1.xx&oh=00_AT_IOG-KzD3wz492yoUCpvAnVSSyDKkdcqOXPWdS0ECqYw&oe=6259D4A9",
    country: "Strasbourg",
    description: "Pianiste du groupe Aoraki",
    instrument: "Piano",
    genre: "Pop, classique, funk",
    skill: "5/5",
    id: 456,
  },
  {
    firstName: "Solène",
    photoURL: "https://scontent-cdg2-1.xx.fbcdn.net/v/t39.30808-6/277305430_792156938420488_4169909970039204982_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=iMXmiClwIVwAX9HGUkG&_nc_ht=scontent-cdg2-1.xx&oh=00_AT-8urvyRmvC1mqRuYwvehZDks6O8Ia8beIHmzGimVSWOQ&oe=6259A690",
    country: "Strasbourg",
    description: "Violoniste à son temps perdu",
    instrument: "Violon",
    genre: "Classique",
    skill: "5/5",
    id: 723,
  },
  {
    firstName: "Ruiz",
    photoURL: "https://scontent-cdg2-1.xx.fbcdn.net/v/t39.30808-6/269748605_1622964181391201_3095917633366830242_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=PBF1zLj1yS8AX9cuXA9&_nc_ht=scontent-cdg2-1.xx&oh=00_AT8TZsNFYKBlodD-JmsNSj7N5bKcnt5An3WNMLLDAGd5TQ&oe=625B527A",
    country: "Mittel",
    description: "Guitariste de fou furieux",
    instrument: "Guitare",
    genre: "LoFi",
    skill: "5/5",
    id: 963,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);

  return (
    <SafeAreaView style={tw("flex-1")}>
      {/* Header */}
        <View style={tw('flex-row items-center relative justify-between px-5')}>
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
            <Ionicons name='chatbubbles-sharp' size={30} color="#07CEB6" />
          </TouchableOpacity>

        </View>

      {/* End of Header */}
      <View style={tw('flex-1 -mt-6')}>
        <Swiper
          ref={swipeRef}
          onSwipedLeft={() => {
            console.log('Swipe non')
          }}
          onSwipedRight={() => {
            console.log('Swipe oui!')
          }}
          overlayLabels={{
            left: {
              title: "Non",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "Jouons!",
              style: {
                label: {
                  color: "green",
                },
              },
            },
          }}
          backgroundColor={"#07CEB6"}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          containerStyle={{ backgroundColor: "transparent" }}
          cards={CARD_DATA}
          renderCard={(card) => (
            <View
              key={card.id}
              style={tw('relative bg-white h-3/4 rounded-xl')}>
              <Image
                style={tw('absolute top-0 h-full w-full rounded-xl')}
                source={{ uri: card.photoURL }}
              />

              <View style={[tw(
                'absolute bg-white flex-row justify-between items-between bottom-0 w-full h-20 px-6 py-2 rounded-b-xl'
                ), styles.cardShadow,
              ]}
              >

                <View>
                  <Text style={tw('text-2xl font-bold')}>
                    {card.firstName}
                  </Text>
                  <Text style={tw('font-bold')}>
                    {card.country}
                  </Text>
                  <Text>{card.description}</Text>
                </View>
                <Text style={tw('text-2xl font-bold')}>{card.instrument}</Text>
                </View>

            </View>
          )
          }
        />
      </View>

      <View style={tw('flex flex-row justify-evenly m-2')}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw('items-center justify-center rounded-full w-16 h-16 bg-red-200')}>
          <Entypo name='thumbs-down' size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw('items-center justify-center rounded-full w-16 h-16 bg-green-200')}>
          <Entypo name='beamed-note' size={24} color="#07CEB6" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles =  StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  }
})