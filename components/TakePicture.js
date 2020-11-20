import React, { useState } from 'react'
import Colors from '../constraints/colors'
import * as imagePicker from 'expo-image-picker'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert
} from 'react-native'

const TakePicture = ({ onTakePicture }) => {
  const [picURI, setPicURI] = useState()
  const takePic = async () => {
    const pic = await imagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    })
    setPicURI(pic.uri)
    onTakePicture(pic.uri)
  }

  const choosePicture = async () => {
    const pic = await imagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true
    })
    setPicURI(pic.uri)
    onTakePicture(pic.uri)
  }

  const getImage = () => {
    Alert.alert(
      'Imagem',
      'Como escolher a imagem?',
      [
        {
          text: 'Câmera',
          onPress: () => takePic()
        },
        {
          text: 'Galeria',
          onPress: () => choosePicture()
        }
      ]
    )
  }

  return (
    <View style={ styles.principal }>
      <View style={ styles.imagePreview }>
        {
          !picURI
            ? <Text>Nenhuma Foto.</Text>
            : <Image
                style={ styles.image }
                source={ { uri: picURI } }
              />
        }
      </View>
      <Button
        title="Escolher Foto"
        color={ Colors.primary }
        onPress={ getImage }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  principal: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#CCC',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default TakePicture
