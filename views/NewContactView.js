
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'
import * as firebase from 'firebase'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import React from 'react'
import ContactInput from '../components/ContactInput'

const firestore = firebase.firestore()
const storage = firebase.storage()
const database = firebase.database()

const contactsCollection = firestore.collection("contacts")
const imagesRef = storage.ref("images")
const imagesCounterRef = database.ref('imagesCounter')

const NewContactView = ({ navigation }) => {

  const verifyPermissions = async () => {
    const result = await Permissions
      .askAsync(Permissions.LOCATION)
      if (result.status !== 'granted') {
        Alert.alert(
          'Location permission not granted',
          'You must permit the app with location permissions',
          [{ text: 'Ok' }]
        )
        return false
      }
    return true
  }

  const getLocation = async () => {
    const hasPermission = await verifyPermissions()
    if (hasPermission) {
      try {
        const location = await Location
          .getCurrentPositionAsync({ timeout: 8000 })
        return {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      } catch (err) {
        Alert.alert(
          'Cant get Location',
          'Location could not be determined',
          [{ text: 'Ok' }]
        )
        return null
      }
    }
  }

  const addContact = async ({ name, phone, picURI }) => {
    try {
      const location = JSON.stringify(await getLocation())
      console.log({
        name,
        phone,
        picURI,
        location,
        createAt: new Date().toISOString()
      })

      const picture = await fetch(picURI);
      const blob = await picture.blob();
      const idImage = (await imagesCounterRef.once('value'))
        .val()
        .toString()
      await imagesRef
        .child(idImage)
        .put(blob)
      const downloadURL = await imagesRef
        .child(idImage)
        .getDownloadURL()
      imagesCounterRef.set(+idImage + 1)
      contactsCollection.add({
        name,
        phone,
        picURI: downloadURL,
        location,
        createAt: new Date().toISOString()
      })

      navigation.goBack()
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  return (
    <ContactInput onAddContact={ addContact }/>
  )
}

export default NewContactView
