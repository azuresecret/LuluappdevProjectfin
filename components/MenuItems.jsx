import React, { useState, useEffect } from 'react';
import {
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import globalStyle from '../styles/globalStyle';

function MenuItem({
  orderedItemMap,
  onPress,
  item,
}) {
  const previouslyOrderedCount = orderedItemMap[item.id] || 0;
  const [orderedPieces, setOrderedPieces] = useState(previouslyOrderedCount);
  console.log('this is the orderedPieces for', item.id, orderedPieces);
  useEffect(() => {
    if (orderedItemMap[item.id]) {
      setOrderedPieces(orderedItemMap[item.id]);
    }
  }, [orderedItemMap]);
  return (

    <TouchableOpacity onPress={() => onPress({ orderedPieces, setOrderedPieces })} style={globalStyle.item}>
      <Image
        source={item.imgLink}
        style={globalStyle.menuLogo}
      />
      <Text>{ item.title }</Text>
      <Text>{ orderedItemMap[item.id] || 0}</Text>
    </TouchableOpacity>

  );
}

export default MenuItem;
