import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const Counter = ({ 
  count, 
  onIncrease, 
  onDecrease, 
  id
}) => {
  console.log(`${id}-count`)
    return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            activeOpacity={0.8}
            disabled={count <= 1}
            onPress={onDecrease}
            style={{}}
            testID={`${id}-decrease`}
          >
              <Text>-</Text>
          </TouchableOpacity>
          <Text 
            testID={`${id}-count`}
          >{count}</Text>
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={onIncrease} 
            style={{}}
            testID={`${id}-increase`}
          >
              <Text>+</Text>
          </TouchableOpacity>
        </View>
    );
};

export default Counter;
