import { View, Text } from 'react-native';
import Counter from '@/components/Counter';
import { useState } from 'react';

export default function RootLayout() {

  const [countToNotify, setCountToNotify] = useState(3);    
  const handleNumberOfMems = (count: number) => {
    console.log('count', count);
    setCountToNotify(count);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Demo App</Text>
      <Counter
				id="contact-settings-counter"
				onIncrease={() => handleNumberOfMems(Number(countToNotify) + 1)}
				onDecrease={() => handleNumberOfMems(Number(countToNotify) - 1)}
				count={countToNotify}
			/>
    </View>
  );
}
