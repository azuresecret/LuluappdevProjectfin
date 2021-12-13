import { Image, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import globalStyle from '../styles/globalStyle';

function MenuDetails({ route }) {
  const {
    item, updateUserOrderedItem, orderedItemMap, orderedPieces,
  } = route.params;
  const [orderedPiece, setOrderedPiece] = useState(orderedPieces);

  useEffect(() => {
    if (orderedItemMap[item.id]) {
      setOrderedPiece(orderedItemMap[item.id]);
    }
  }, [orderedItemMap]);

  return (
    <View style={globalStyle.ItemDetailContainer}>
      <Text style={globalStyle.itemDetailTitle}>
        {' '}
        {item.title }
      </Text>
      <Image
        source={item.imgLink}
        style={globalStyle.detailedImage}
      />
      <Text style={globalStyle.itemDetailText}>
        Item Price:
        {'      $'}
        {item.price }
      </Text>
      <Text style={globalStyle.itemDetailText}>
        OrderedPieces:
        {'      '}
        {orderedPiece }
      </Text>
      <AwesomeButtonRick
        onPress={
          () => updateUserOrderedItem({
            orderedPieces: orderedPiece, setOrderedPieces: setOrderedPiece, item,
          })
        }
        stretch
        style={globalStyle.detailButtonStyle}
      >
        ADD TO CART
      </AwesomeButtonRick>
    </View>
  );
}

export default MenuDetails;
