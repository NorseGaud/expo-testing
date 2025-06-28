import { Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      padding: 10,
      backgroundColor: 'skyblue',
      color: 'white',
      borderRadius: 5,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Expo Testing App</Text>
      <Text style={styles.button} onPress={() => router.push('/counter')}>Counter</Text>
      <Text style={styles.button} onPress={() => router.push('/wheel-picker')}>Wheel Picker</Text>
      <Text style={styles.button} onPress={() => router.push('/textinput')}>Text Input</Text>
    </View>
  );
} 