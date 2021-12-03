import {
  FlatList, View, Text, Image, Animated,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { fromJS } from 'immutable';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import globalStyle from '../styles/globalStyle';
import UserContext from '../contexts/User';

function CartItem({ item, onPress }) {
  const renderRightActions = (
    progress,
    dragAnimatedValue,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (

      <View style={globalStyle.swipedRow}>
        <View style={globalStyle.swipedConfirmationContainer}>
          <Text style={globalStyle.deleteConfirmationText}>Are you sure?</Text>
        </View>
        <Animated.View style={[globalStyle.deleteButton, { opacity }]}>
          <TouchableOpacity onPress={onPress}>
            <Text style={globalStyle.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={globalStyle.cartItem}>
        <Image
          source={item.imgLink}
          style={globalStyle.CartIcon}
        />
        <Text style={globalStyle.itemDetailText}>
          {item.name}
          {' '}
          x
          {' '}
          {item.quantity}
          {'                                              $'}
          {' '}
          {item.totalPrice}
        </Text>
      </View>
    </Swipeable>
  );
}

const cartEmptyString = 'Your cart is empty, please go to the menu screen to order some items. ';

function CartScreen({ menuData }) {
  const { user, mutateUser } = useContext(UserContext);
  // flatlist requires an array of data to render stuff, and orderedItemList is that array for it to use.
  const [orderedItemList, setOrderedItemList] = useState([]);
  const [orderedTotalPrice, setOrderedTotalPrice] = useState(0);
  const flattenedMenuArray = Object.values(menuData).flat();

  useEffect(() => {
    if (user.get('orderedItem')) {
      // storedordereditemmap looks like { id1: quantity1, id2: quantity2}
      const storedOrderedItemMap = user.get('orderedItem').toJS();
      const orderedItemListCP = [];
      let previousTotalPrice = 0;
      Object.entries(storedOrderedItemMap).forEach(([id, quant]) => {
        const correctItem = flattenedMenuArray.find((ele) => ele.id === id);
        console.log('this is correct', correctItem);
        if (!correctItem) {
          return console.error('cannot locate ordered item from menudata');
        }
        const itemName = correctItem.title;
        orderedItemListCP.push({
          name: itemName, quantity: quant, id: correctItem.id, totalPrice: correctItem.price * quant,
        });
        previousTotalPrice += (correctItem.price * quant);
      });
      setOrderedItemList(orderedItemListCP);
      setOrderedTotalPrice(previousTotalPrice);
    }
  }, [user]);

  const renderCartItem = ({ item }) => (
    <CartItem
      key={item.id}
      item={item}
      onPress={() => {
        const storedOrderedItemMap = user.get('orderedItem').toJS();
        if (!storedOrderedItemMap[item.id]) return console.error('cannot find correct element in cart screen');
        if (storedOrderedItemMap[item.id] <= 1) {
          // if stored user quantity smaller or eq 1, remove the ordered item
          delete storedOrderedItemMap[item.id];
          // ['side_dish2', 2]
        } else {
          const newQuantity = storedOrderedItemMap[item.id] - 1;
          storedOrderedItemMap[item.id] = newQuantity;
        }
        mutateUser(user.set('orderedItem', fromJS(storedOrderedItemMap)));
      }}
    />
  );

  return (
    <View style={globalStyle.CartContainer}>
      {orderedItemList.length ? <Text> Your ordered items are below </Text> : <Text>{cartEmptyString}</Text>}
      <FlatList
        data={orderedItemList}
        extraData={orderedItemList}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={renderCartItem}
      />
      {orderedTotalPrice ? <Text> Your total price is  ${orderedTotalPrice} </Text> : null }
    </View>
  );
}

export default CartScreen;
