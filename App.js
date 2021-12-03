import React, { useMemo, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Map as ImmutableMap, fromJS } from 'immutable';
import { initializeApp } from 'firebase/app';
import {
  child, get, getDatabase, ref,
} from 'firebase/database';
import { AppMainTabView } from './components/Home';
import UserContext from './contexts/User';
import { storeUser, getUser } from './resources/handleLocalStorage';
import MenuDetails from './components/MenuDetails';
import MenuData from './resources/loadMenuImage';

const app = initializeApp({
  /* Config */
  apiKey: 'AIzaSyA6GvT1vBGUgKxqvp2Rfsg3MREXdmJRkxE',
  authDomain: 'react-native-shop-333722.firebaseapp.com',
  projectId: 'react-native-shop-333722',
  storageBucket: 'react-native-shop-333722.appspot.com',
  messagingSenderId: '423705489168',
  appId: '1:423705489168:web:43cc3767baf56778193f95',
  databaseURL: 'https://react-native-shop-333722-default-rtdb.firebaseio.com/',
});

const RootStack = createNativeStackNavigator();
const database = getDatabase(app);
const dbRef = ref(database);

export default function App() {
  const [user, mutateUser] = useState(ImmutableMap());
  const [menuDataWithPrice, setMenuData] = useState(MenuData);
  const value = useMemo(
    () => ({ user, mutateUser }),
    [user],
  );
  // when app first launches, we first either retrieve data storage, if nothing in storage, set everything to new.

  useEffect(() => {
    (async () => {
      if (user.size !== 0) await storeUser(user);
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const userVal = await getUser();
      if (userVal) return mutateUser(fromJS(JSON.parse(userVal)));
    })();
  }, []);

  useEffect(() => {
    console.log('fetching price from db');
    get(child(dbRef, 'items')).then((snapshot) => {
      if (snapshot.exists()) {
        const priceData = snapshot.val(); // price data is {id: main_dish, price: 145}
        // MenuData.mainDish.main_dish1 = {...MenuData.mainDish.main_dish1, ...snapshot.val()}
        Object.values(MenuData).forEach((category) => {
          category.forEach((entries) => {
            entries.price = priceData[entries.id] ? priceData[entries.id].price : 0;
          });
        });
        setMenuData(MenuData);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={value}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Home" options={{ headerShown: false }}>
            {({ navigation }) => (<AppMainTabView app={app} database={database} dbRef={dbRef} mainNavigation={navigation} menuData={menuDataWithPrice} />)}
          </RootStack.Screen>
          <RootStack.Screen component={MenuDetails} name="Details" />
        </RootStack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
