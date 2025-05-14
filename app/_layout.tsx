import { View, Button } from 'react-native';
import * as ExpoContacts from 'expo-contacts';
import { PermissionsAndroid } from 'react-native';

export default function RootLayout() {
  return (
    <View>
      <Button title="Press me" onPress={async () => {
        try {
          const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
            title: 'Contacts Write Permission',
            message: 'This app needs access to your contacts to update them.',
            buttonPositive: 'OK'
          })
          const { status } = await ExpoContacts.requestPermissionsAsync();
          if (status !== 'granted') return
          if (permission === PermissionsAndroid.RESULTS.GRANTED) {
            const { data: contacts } = await ExpoContacts.getContactsAsync({
              fields: [
              ]
            });
            if (!contacts || contacts?.length === 0) return
            console.log('[updateDeviceContact::contacts]', contacts)
            const contact = contacts.find(contact => {
              console.log('[updateDeviceContact::contact]', contact)
              return contact.lastName == "Larota"
            })
            if (!contact) { console.log('[updateDeviceContact::contact NOT FOUND]'); return }
            // if (!contact) { console.log('[updateDeviceContact::contact NOT FOUND]'); return }
            console.log('[updateDeviceContact::contact PRE]', contact)
            if (!contact.id) return;
            await ExpoContacts.updateContactAsync({
              id: contact.id,
              [ExpoContacts.Fields.IsFavorite]: true,
            })
            const { data: contacts2 } = await ExpoContacts.getContactsAsync({
              fields: [
                ExpoContacts.Fields.ID,
                ExpoContacts.Fields.IsFavorite,
              ]
            });
            console.log('[updateDeviceContact::contacts GET]', contacts2.find(contact => contact.firstName == "Charles E"))
          }
        } catch (error: any) {
          console.error('error updating contact: ', error.message)
        }
      }} />
    </View>
  );
}
