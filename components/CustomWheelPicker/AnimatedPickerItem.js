import React, { memo } from 'react';
import {Text, Animated, StyleSheet} from 'react-native';

const AnimatedPickerItem = ({
    item,
    index,
    scrollY,
    itemHeight,
    fontSize,
    fontWeight,
    textStyle,
    itemStyle,
    isSelected,
  }) => {

    const styles = StyleSheet.create({
      item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      },
      text: {
        // fontSize: width < 350 ? scale(15) : scale(18) ,
        textAlign: 'center',
      },
    })

    const inputRange = [
      (index - 2) * itemHeight,
      index * itemHeight,
      (index + 2) * itemHeight,
    ];
  
    const scaleY = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
  
    return (
      <Animated.View style={[
        styles.item, 
        {transform: [{ scaleY }]}, 
        {height: itemHeight, ...itemStyle},
        isSelected && {
          backgroundColor: 'white',
          paddingHorizontal: 5,
          borderRadius: 7,
        },
      ]}>
        <Text style={[
          {fontSize, fontWeight}, 
          styles.text, 
          textStyle,
          !isSelected && {
            color: 'rgba(0, 0, 0, 0.7)',
          },
          isSelected && {
            fontWeight: 'bold',
          }
        ]}>{item}</Text>
      </Animated.View>
    );
};

export default memo(AnimatedPickerItem)