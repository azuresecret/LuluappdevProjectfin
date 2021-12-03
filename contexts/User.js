import { Map as ImmutableMap } from 'immutable';
import React from 'react';

const defaultValue = new ImmutableMap();
/*
storedordereditemmap looks like { id1: quantity1, id2: quantity2}
 user{
name: abc
uid: 123
orderedItem: {
id1: quantity1
id2: quantity2
}
*/

export default React.createContext(defaultValue);
