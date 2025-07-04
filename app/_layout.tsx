import React from 'react';
import { AppState } from 'react-native';
import { Slot } from 'expo-router';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const appState = React.useRef(AppState.currentState);
const appStateVisible = React.useRef(appState.current);
const lastFetchTime = React.useRef(0);
const random = Math.random()

React.useEffect(() => {
  // Listener for foregrounding the app and getting latest data
  // Note: infinite loops could happen if the function brings anything to the foreground like a permissison request dialogue, etc. Use the lastFetchTime to avoid this.
  const subscription = AppState.addEventListener('change', async (state) => {
    console.log(`AppState has come to the ${state}!`, random);
    if (
      appState.current.match(/inactive|background/) &&
      state === 'active'
    ) {
      const now = Date.now();
      // Only fetch if it's been more than 5 seconds since last fetch
      if (now - lastFetchTime.current > 5000) {
        lastFetchTime.current = now;
        console.log('fetching data')
      }
    }
    appState.current = state;
    appStateVisible.current = appState.current;
    // console.log('AppState', appState.current, random);
  });

  return () => {
    console.log('removing AppState subscription')
    subscription?.remove();
  };
  
}, [])

export default function RootLayout() {
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      paddingTop: Platform.OS === 'android' ? 40 : 0,
    }}>
      <Slot />
    </SafeAreaView>
  );
}
