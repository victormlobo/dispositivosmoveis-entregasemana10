import React from 'react'
import Contact from './Contact'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'

const ContactList = ({ contacts, onDeleteContact }) => {
  const test = key => {
    console.log(key)
  }

  return (
    <FlatList
      data={ contacts }
      keyExtractor={ contact => contact.id }
      renderItem={
        contact =>
          <TouchableOpacity onLongPress={
            () => { onDeleteContact(contact.item.id) }
          }>
            <Contact contact={ { ...contact.item } } />
          </TouchableOpacity>
      }
    />
  )
}

const styles = StyleSheet.create({})

export default ContactList
