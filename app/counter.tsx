import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';

const CounterScreen = () => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
  });

  const [countToNotify, setCountToNotify] = React.useState(3);    
  const handleNumberOfMems = (count: number) => {
    console.log('count', count);
    setCountToNotify(count);
  };

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
      <View style={{ flexDirection: 'row', margin: 'auto' }}>
          <TouchableOpacity 
            activeOpacity={0.8}
            disabled={countToNotify <= 1}
            onPress={() => handleNumberOfMems(Number(countToNotify) - 1)}
            style={{
              padding: 10,
              backgroundColor: 'skyblue',
            }}
            testID={`counter_1-decrease`}
          >
              <Text style={{ fontWeight: 'bold' }}>-</Text>
          </TouchableOpacity>
          <Text 
            testID={`counter_1-count`}
            style={{
              textAlign: 'center',
              padding: 10,
            }}
          >{countToNotify}</Text>
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={() => handleNumberOfMems(Number(countToNotify) + 1)}
            style={{
              padding: 10,
              backgroundColor: 'skyblue',
            }}
            testID={`counter_1-increase`}
          >
              <Text style={{ fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default CounterScreen;
