import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import Colors from '../constraints/colors'
import { Ionicons } from '@expo/vector-icons'

const HeadButton  = (props) => {
  return (
    <HeaderButton
      { ...props }
      IconComponent={ Ionicons }
      iconSize={ 23 }
      color={
        Platform.OS === 'android'
          ? 'black'
          : Colors.primary
      }
    />
  )
}

export default HeadButton
