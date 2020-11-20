import React, { useState } from 'react'
import TakePicture from '../components/TakePicture'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native'

const ContactInput = ({ onAddContact }) => {

  const [picURI, setPicURI] = useState()
  const pictureHandler = uri => {
    setPicURI(uri)
  }
  const [name, setName] = useState('')
  const putName = name =>
    setName(name)

  const [phone, setPhone] = useState('')
  const putPhone = phone =>
    setPhone(phone)

  return (
    <ScrollView>
      <View style={ styles.form }>
        <Text style={ styles.title }>
          Novo contato
        </Text>
        <TextInput
          placeholder="John Doe"
          style={ styles.textInput }
          onChangeText={ putName }
          value={ name }
        />
        <TextInput
          placeholder="9999-9999"
          style={ styles.textInput }
          onChangeText={ putPhone }
          value={ phone }
        />
        <TakePicture onTakePicture={ pictureHandler }/>
        <Button
          title="Adicionar"
          onPress={ () => {
            onAddContact({ name, phone, picURI })
          } }
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  title: {
    fontSize: 18,
    marginBottom: 12
  },
  textInput: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 2,
    marginBottom: 12,
    paddingVertical: 8
  }
})

export default ContactInput
