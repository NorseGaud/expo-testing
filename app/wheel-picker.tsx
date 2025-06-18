import CustomWheelPicker from '@/components/CustomWheelPicker';
import { router } from 'expo-router';
import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

const WheelPickerScreen = () => {

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        onPress={() => router.back()}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 20,
          backgroundColor: 'skyblue',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Back</Text>
      </TouchableOpacity>
      <View style={{ margin: 'auto', backgroundColor: 'skyblue' }}>
        <CustomWheelPicker
          selectedValue={items[selectedIndex]}
          pickerData={items}
          itemHeight={30}
          pickerStyle={{}}
          itemStyle={{}}
          textStyle={{}}
          pickerHeight={200}
          itemPosition="center"
          onValueChange={(value) => setSelectedIndex(items.indexOf(value))}
          pickerId="wheel-picker"
        />
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selected: {items[selectedIndex]}</Text>
    </SafeAreaView>
  );
};

export default WheelPickerScreen;
