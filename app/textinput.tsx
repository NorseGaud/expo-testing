import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';

const TextInputScreen = () => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
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
    <View style={styles.container}>
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
        <TextInput
          placeholder="email@address.com"
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
          }}
        />
      </View>
    </View>
  );
};

export default TextInputScreen;
