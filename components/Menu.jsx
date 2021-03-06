import {
  FlatList, Image, TouchableOpacity, View, Text,
} from 'react-native';
import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import { fromJS } from 'immutable';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ref, set } from 'firebase/database';
import UserContext from '../contexts/User';
import MenuScreen from './MenuScreen';

const Tab = createMaterialTopTabNavigator();

function writeUserData(userId, data, app, db) {
  set(ref(db, `users/${userId}`), data).catch((e) => {
    console.log('error when wrigin data', e);
  });
}

function MenuMainTabScreen({
  app,
  database,
  mainNavigation,
}) {
  const { user, mutateUser } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  
  // orderedItemMap to keep track of all ordered items & quantities across menu screens.
  const [orderedItemMap, setOrderedItemMap] = useState({});

  useEffect(() => {
    if (submitting && orderedItemMap.length !== 0) {
      //  now the user clicked on submit on menu page,
      //  if local storge does not have orderedItem, we set the orderedItemMap as their orderedItem
      // if it does have previously stored orderedItem, we merge them together

      // const mergedList = user.get('orderedItem') ? [...user.get('orderedItem').toJS(), ...orderedItemMap] : [...orderedItemMap];
      mutateUser(user.set('orderedItem', fromJS(orderedItemMap)));
      writeUserData(user.get('id'), user.toJS(), app, database);
      setSubmitting(false);
    }
  }, [submitting, orderedItemMap]);
  useEffect(() => {
    if (user.get('orderedItem')) {
      setOrderedItemMap(user.get('orderedItem').toJS());
    }
  }, [user]);

  // function to update ordered item along with quantities.
  const updateUserOrderedItem = useCallback(({ orderedPieces, setOrderedPieces, item }) => {
    const updatedOrderPieces = orderedPieces + 1;
    setOrderedPieces(updatedOrderPieces);
    const newOrderedItemMap = { ...orderedItemMap };
    newOrderedItemMap[item.id] = updatedOrderPieces;
    setOrderedItemMap(newOrderedItemMap);
    setSubmitting(true);
  }, [orderedItemMap]);

  const MenuScreenProps = {
    submitting, setSubmitting, updateUserOrderedItem, orderedItemMap, setOrderedItemMap, mainNavigation,
  };

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Main Dish">
          {() => (<MenuScreen screenType="maindish" {...MenuScreenProps} />)}
        </Tab.Screen>
        <Tab.Screen name="Side Dish">
          {() => (<MenuScreen screenType="sidedish" {...MenuScreenProps} />)}
        </Tab.Screen>
        <Tab.Screen name="Drink">
          {() => (<MenuScreen screenType="drink" {...MenuScreenProps} />)}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

export default MenuMainTabScreen;
