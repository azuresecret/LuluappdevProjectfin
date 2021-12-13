import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, View } from 'react-native';
import React from 'react';
import MenuData from '../resources/loadMenuImage';
import globalStyle from '../styles/globalStyle';
import MenuItem from './MenuItems';

function MenuScreen({
  updateUserOrderedItem,
  orderedItemMap,
  screenType,
  mainNavigation,
}) {
  const renderMenuItem = ({ item }) => (

    <MenuItem
      item={item}
      onPress={({ orderedPieces, setOrderedPieces }) => {
        mainNavigation.push('Details', {
          item, updateUserOrderedItem, orderedPieces, setOrderedPieces, orderedItemMap,
        });
      }}
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
