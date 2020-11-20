import 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import HeadButton from '../components/HeadButton'
import ContactList from '../components/ContactList'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import * as firebase from 'firebase'
import { Alert } from 'react-native'

const ContactListView = props => {
  const db = firebase.firestore()
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    db.collection('contacts').onSnapshot(snapshot => {
      let auxContacts = []
      snapshot.forEach(doc => {
        auxContacts.push({
          id: doc.id,
          name: doc.data().name,
          phone: doc.data().phone,
          picURI: doc.data().picURI,
          location: doc.data().location,
          createAt: doc.data().createAt
        })
      })
      setContacts(auxContacts)
    })
  })

  const removeContact = id => {
    try {
      Alert.alert(
        'Delete Contact',
        'Do you really want to remove this contact?',
        [
          { text: 'Cancel' },
          {
            text: 'Delete',
            onPress: () => db.collection('contacts').doc(id).delete()
          }
        ]
      )
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  return (
    <ContactList
      contacts={ contacts }
      onDeleteContact={ removeContact }
    />
  )
}

ContactListView.navigationOptions = dataNav => {
  return {
    headerTitle: "Lista de contatos",
    headerRight:
      <HeaderButtons
        HeaderButtonComponent={ HeadButton }
      >
      <Item
        title="Adicionar"
        iconName={
          Platform.OS === 'android'
            ? 'md-add'
            : 'ios-add'
        }
        onPress={
          () => dataNav.navigation.navigate ('NewContact')
        }
      />
      </HeaderButtons>
  }
}

export default ContactListView
