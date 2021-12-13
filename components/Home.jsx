import React, {
  useEffect, useState, useContext, useMemo, useRef,
} from 'react';
import {
  TouchableOpacity, View, Text, TextInput, TouchableHighlight, Button, Image, Animated,
} from 'react-native';
import { fromJS, Map as ImmutableMap } from 'immutable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithCredential,
} from 'firebase/auth';
import {
  getDatabase, ref, child, get,
} from 'firebase/database';
import { SocialIcon } from 'react-native-elements';
import restaurantPhoto from '../assets/restaurant.jpg';
import { storeUser } from '../resources/handleLocalStorage';
import UserContext from '../contexts/User';
import CartScreen from './Cart';
import MenuScreen from './Menu';
import globalStyle from '../styles/globalStyle';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';


WebBrowser.maybeCompleteAuthSession();

function HomeScreen({ mainNavigation, app, dbRef }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '423705489168-gk4jkgrchprnpbnd37ckglebm6kivm1a.apps.googleusercontent.com',
    },
  );
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const auth = getAuth();
      // const provider = new GoogleAuthProvider();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then(r => {
        console.log('this is r after sign in ', r)
        get(child(dbRef, `users/${r.user.uid}`)).then((snapshot) => {
          // if there are things under this id, set local cache storage data to be the one fetched from firebase.

          if (snapshot.exists()) {
            console.log(snapshot.val());
            mutateUser(fromJS(snapshot.val()));
          } else {
            console.log('No data available');
          }
        }).catch((error) => {
          console.error(error);
        });
        mutateUser(user.set('name',  r.user.displayName).set('id', r.user.uid));
      } );
    }
  }, [response]);
  const { user, mutateUser } = useContext(UserContext);
  const [userNameInput, userNameInputOnChange] = React.useState('');
  const [submitting, setSubmitting] = useState(false);
  const WelcomeString = 'Welcome, Please sign in to use the app';
  // get(child(dbRef, ))
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const submitButtonClicked = () => {
    setSubmitting(true);
    mutateUser(user.set('name', userNameInput));
  };
  
  function googleSignIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    app.auth().signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const googleUser = result.user;
        
        get(child(dbRef, `users/${googleUser.uid}`)).then((snapshot) => {
          // if there are things under this id, set local cache storage data to be the one fetched from firebase.
          if (snapshot.exists()) {
            console.log(snapshot.val());
            mutateUser(fromJS(snapshot.val()));
          } else {
            console.log('No data available');
          }
        }).catch((error) => {
          console.error(error);
        });
        mutateUser(user.set('name', googleUser.displayName).set('id', googleUser.uid));
        console.log(googleUser, token, credential);
        // ...
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  
  useEffect(() => {
    if (submitting) storeUser(user);
  }, [submitting]);
  useMemo(() => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  }, []);
  return (
    <View style={globalStyle.homeStyles}>
      <Text style={globalStyle.homeTitle}>
        Welcome to the restaurant
      
      </Text>
      <Animated.View
        style={[
          globalStyle. HomeImageContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          source={restaurantPhoto}
          style={globalStyle.homeImage}
        />
      </Animated.View>
      <SocialIcon
        button
        onPress={promptAsync}
        title="Sign In With Google"
        type="google"
        style={{paddingHorizontal: 8}}
      />
      <View style={globalStyle.buttonContainer}>
        <AwesomeButtonRick stretch onPress={() => mainNavigation.navigate('Cart')} style={globalStyle.buttonStyle}> Go To Cart</AwesomeButtonRick>
        <AwesomeButtonRick stretch onPress={() => mainNavigation.navigate('Menu')} style={globalStyle.buttonStyle}> Go To Menu</AwesomeButtonRick>
      </View>
      <Text>{user.get('name') ? `Hello Dear ${user.get('name')}` : WelcomeString}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
export function AppMainTabView({
  app, database, dbRef, mainNavigation, menuData,
}) {
  const [data, setGlobalData] = useState(new ImmutableMap({
    orderedItemList: [],
  }));
  return (
    <Tab.Navigator>
      <Tab.Screen
        children={() => <HomeScreen app={app} data={data} dbRef={dbRef} mainNavigation={mainNavigation} setGlobalData={setGlobalData} />}
        name="Home"
      />
      <Tab.Screen
        children={() => (
          <MenuScreen
            app={app}
            data={data}
            database={database}
            dbRef={dbRef}
            mainNavigation={mainNavigation}
            menuData={menuData}
            setGlobalData={setGlobalData}
          />
        )}
        name="Menu"
      />
      <Tab.Screen children={() => <CartScreen data={data} mainNavigation={mainNavigation} menuData={menuData} setGlobalData={setGlobalData} />} name="Cart" />
    </Tab.Navigator>
  );
}

export default HomeScreen;
