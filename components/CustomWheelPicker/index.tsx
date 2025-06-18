import React from 'react'
import { View, Animated, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import AnimatedPickerItem from './AnimatedPickerItem'
import { useState } from 'react'

type CustomWheelPickerProps = {
  selectedValue: string | number
  pickerData: (string | number)[]
  itemHeight: number
  pickerStyle?: ViewStyle
  itemStyle?: ViewStyle
  textStyle?: TextStyle
  pickerHeight?: number
  itemPosition?: string
  onValueChange?: (value: string) => void
  pickerId?: string
  scrollY?: number
}

const keyExtractor = (item: string, index: number) => `picker-item-${index}`

const CustomWheelPicker = ({
  selectedValue = '',
  pickerData = [],
  itemHeight = 30,
  pickerStyle = {},
  itemStyle = {}, 
  textStyle = {
    fontSize: 20,
    fontWeight: 'normal',
  },
  pickerHeight = 150,
  itemPosition = '',
  onValueChange = (value: string) => {},
  pickerId='default',
}: CustomWheelPickerProps) => {
  const fontSize = textStyle.fontSize
  const fontWeight = textStyle.fontWeight
  const [scrollY] = useState(() => new Animated.Value(0));
  const listRef = React.useRef<Animated.FlatList>(null)
  const latestScrollY = React.useRef(0);
  const canMomentum = React.useRef(false)
  const isMounted = React.useRef(true)
  const snapOffsets = pickerData.map((_, index) => index * itemHeight)
  const prevPickerData = React.useRef<(string | number)[]>([])
  const initialIndex = React.useMemo(() => pickerData.findIndex(item => item == selectedValue), [selectedValue, pickerData])

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      // flex: 1,
      // flexBasis: 63,
      // height: 150,
      // overflow: 'hidden',
      // alignItems: 'center',
      // justifyContent: 'center',
    },	
    selectLine: {
        position: 'absolute',
        top: 150/2 - 15,
        height: 30,
        width: '100%',
        backgroundColor: 'lightgray',
    },
    maskContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
    },
    maskTop: {
        flex: 1,
        // backgroundColor: 'rgba(240,240,240,1)',
    },
    maskCenter: {
        backgroundColor: 'transparent',
    },
    maskBottom: {
        flex: 1,
        // backgroundColor: 'rgba(240,240,240,0.6)',
        top: 1
    },
  })

  React.useEffect(() => {
    // console.log('firing useEffect 3')
    if (listRef.current && pickerData?.length && isMounted.current) {
      const index = pickerData.findIndex(item => item == selectedValue)
      // Add try-catch to handle unmounting gracefully
      try {
        listRef.current?.scrollToIndex({ animated: false, index: index >= 0 ? index : 0 });
      } catch (error) {
        console.warn('ScrollToIndex error (component unmounting):', error);
      }
    }
  }, [pickerData])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, [])

  const onMomentumScrollBegin = () => {
    // console.log('onMomentumScrollBegin')
    canMomentum.current = true;
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { 
      useNativeDriver: false,
      listener: (event: any) => {
        // const newY = event.nativeEvent.contentOffset.y
        // console.log('onScroll newY', newY)
        // Don't process scroll events if component is unmounting
        if (!isMounted.current) return;
        
        const y = event.nativeEvent.contentOffset.y
        latestScrollY.current = y;
        
        // Handle the value change directly here if momentum scrolling is active
        // if (canMomentum.current) {
        //   const newIndex = Math.round(y / itemHeight);
        //   if (!isNaN(newIndex) && newIndex >= -1 && newIndex < pickerData.length) {
        //     onValueChange && onValueChange(pickerData[newIndex] as string);
        //   }
        // }
      }
    }
  );

  const onMomentumScrollEnd = () => {
    // console.log('onMomentumScrollEnd')
    // console.log('canMomentum.current', canMomentum.current)
    if (canMomentum.current) {
    const currentY = latestScrollY.current;
      const newIndex = Math.round(currentY / itemHeight)
      if (!isNaN(newIndex) && newIndex >= -1 && newIndex < pickerData.length) {
        onValueChange && onValueChange(pickerData[newIndex] as string);
      }
    }
    canMomentum.current = false;
  };

  const getItemLayout = (data: ArrayLike<string> | null | undefined, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  const renderItem = ({ item, index, isSelected }: { item: string, index: number, isSelected: boolean }) => {
    return (
      <AnimatedPickerItem
        isSelected={isSelected}
        item={item}
        index={index}
        scrollY={scrollY}
        itemHeight={itemHeight}
        fontSize={fontSize}
        fontWeight={fontWeight}
        textStyle={textStyle}
        itemStyle={itemStyle}
      />
    );
  };

  return (
    <View 
      style={
        [
          styles.container, 
          { 
            height: pickerHeight,
          }, 
          pickerStyle, 
          {  
            // borderColor: (colorScheme === 'dark') ? colors.appDarkBlue4 : colors.appLightBlue3,
            // borderWidth: 1,
          },
          itemPosition === 'first' && {borderRightWidth: 0},
          itemPosition === 'last' && {borderLeftWidth: 0},
          !itemPosition && {borderLeftWidth: 0, borderRightWidth: 0},
        ]
      }
      testID={`${pickerId}-${selectedValue}`}
    >
      {/* <Text>{`${pickerId}-${selectedValue}`}</Text> */}
      <View
        testID={`${pickerId}`}
        style={[
          styles.selectLine,
          {
            height: itemHeight + 1, top: (pickerHeight - itemHeight) / 2 - 0.5, 
          },
      ]}></View>
      <Animated.FlatList
        nestedScrollEnabled={true}  
        ref={listRef}
        data={pickerData as string[]}
        initialScrollIndex={initialIndex < 0 ? 0 : initialIndex}
        renderItem={({ item, index }) => renderItem({ item, index, isSelected: item == selectedValue })}
        keyExtractor={keyExtractor}
        snapToOffsets={snapOffsets}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={onScroll}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        decelerationRate={'fast'}
        testID={`scrollWheel`}
        contentContainerStyle={{
          paddingTop: (pickerHeight - itemHeight) / 2,
          paddingBottom: (pickerHeight - itemHeight) / 2,
        }}
      />
      <View style={styles.maskContainer} pointerEvents='none'> 
        <View style={[styles.maskTop]} />
        <View style={[styles.maskCenter, {height: itemHeight}]} />
        <View style={[styles.maskBottom]} />
      </View>
    </View>
  );
};

export default CustomWheelPicker;
