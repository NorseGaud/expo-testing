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
          if (permission === PermissionsAndroid.RESULTS.GRANTED) {
            const { data: contacts } = await ExpoContacts.getContactsAsync({
              fields: [
                ExpoContacts.Fields.Emails,
                ExpoContacts.Fields.Image,
                ExpoContacts.Fields.ID,
                ExpoContacts.Fields.PhoneNumbers,
                ExpoContacts.Fields.FirstName,
                ExpoContacts.Fields.LastName,
                ExpoContacts.Fields.MiddleName,
                ExpoContacts.Fields.NameSuffix,
                ExpoContacts.Fields.Birthday
              ]
            });
            if (!contacts || contacts?.length === 0) return
            const contact = contacts[0]
            if (!contact) return
            console.log('[updateDeviceContact::contact]', contact)
            // await ExpoContacts.updateContactAsync({
            //   id: contact.id,
            //   [ExpoContacts.Fields.Name]: contact.name,
            //   [ExpoContacts.Fields.ContactType]: contact.contactType
            // })
          }
        } catch (error: any) {
          console.error('error updating contact: ', error.message)
        }
      }} />
    </View>
  );
}
