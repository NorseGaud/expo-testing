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
                ExpoContacts.Fields.Name,
                ExpoContacts.Fields.Emails,
                ExpoContacts.Fields.ID,
                ExpoContacts.Fields.PhoneNumbers,
                ExpoContacts.Fields.FirstName,
                ExpoContacts.Fields.LastName,
                ExpoContacts.Fields.MiddleName,
                ExpoContacts.Fields.NameSuffix,
                ExpoContacts.Fields.Birthday,
                ExpoContacts.Fields.IsFavorite,
                ExpoContacts.Fields.ContactType
              ]
            });
            if (!contacts || contacts?.length === 0) return
            const contact = contacts[0]
            if (!contact) return
            console.log('[updateDeviceContact::contact PRE]', contact)
            await ExpoContacts.updateContactAsync({
              id: contact.id,
              [ExpoContacts.Fields.Name]: contact.name,
              [ExpoContacts.Fields.FirstName]: contact.firstName,
              [ExpoContacts.Fields.ContactType]: contact.contactType,
              [ExpoContacts.Fields.IsFavorite]: false,
              [ExpoContacts.Fields.PhoneNumbers]: contact.phoneNumbers,
              [ExpoContacts.Fields.Emails]: contact.emails,
              [ExpoContacts.Fields.Birthday]: contact.birthday,
              [ExpoContacts.Fields.NameSuffix]: contact.nameSuffix,
              [ExpoContacts.Fields.MiddleName]: contact.middleName,
              [ExpoContacts.Fields.LastName]: contact.lastName,
              [ExpoContacts.Fields.Company]: contact.company,
              [ExpoContacts.Fields.JobTitle]: contact.jobTitle,
              [ExpoContacts.Fields.Nickname]: contact.nickname,
              [ExpoContacts.Fields.SocialProfiles]: contact.socialProfiles,
            })
            const { data: contacts2 } = await ExpoContacts.getContactsAsync({
              fields: [
                ExpoContacts.Fields.Name,
                ExpoContacts.Fields.Emails,
                ExpoContacts.Fields.ID,
                ExpoContacts.Fields.PhoneNumbers,
                ExpoContacts.Fields.FirstName,
                ExpoContacts.Fields.LastName,
                ExpoContacts.Fields.MiddleName,
                ExpoContacts.Fields.NameSuffix,
                ExpoContacts.Fields.Birthday,
                ExpoContacts.Fields.IsFavorite,
                ExpoContacts.Fields.ContactType
              ]
            });
            console.log('[updateDeviceContact::contacts GET]', contacts2.find(contact => contact.id === contact.id))
          }
        } catch (error: any) {
          console.error('error updating contact: ', error.message)
        }
      }} />
    </View>
  );
}
