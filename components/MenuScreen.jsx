import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, View } from 'react-native';
import React from 'react';
import MenuData from '../resources/loadMenuImage';
import globalStyle from '../styles/globalStyle';
import MenuDetails from './MenuDetails';
import MenuItem from './MenuItems';

function MenuScreen({
  submitting,
  setSubmitting,
  updateUserOrderedItem,
  orderedItemMap,
  setOrderedItemMap,
  screenType,
  tabNavigation,
  mainNavigation,
}) {
  const renderMenuItem = ({ item, navigation }) => (

    <MenuItem
      item={item}
      onPress={({ orderedPieces, setOrderedPieces }) => {
        // tabNavigation.setOptions({ headerShown: false });
        mainNavigation.push('Details', {
          item, updateUserOrderedItem, orderedPieces, setOrderedPieces, orderedItemMap,
        });
      }}
      // onPress={({ orderedPieces, setOrderedPieces }) => updateUserOrderedItem({ orderedPieces, setOrderedPieces, item })}
      orderedItemMap={orderedItemMap}
    />
  );
  let displayData;
  switch (screenType) {
    case 'maindish':
      displayData = MenuData.mainDish;
      break;
    case 'sidedish':
      displayData = MenuData.sideDish;
      break;
    case 'drink':
      displayData = MenuData.drink;
      break;
    default:
      break;
  }

  return (

    <View style={globalStyle.menuContainer}>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={displayData}
        extraData={orderedItemMap}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => renderMenuItem({ item, mainNavigation })}
      />

    </View>

  );
}

export default MenuScreen;
