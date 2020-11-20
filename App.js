import 'firebase/firestore'
import React from 'react'
import ContactsNavigation from './navigation/ContactsNavigation'
import firebase from 'firebase/app'
import ENV from './env'
import { rootReducer } from './store/reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

if (!firebase.apps.length) {
  firebase.initializeApp(ENV)
}
firebase.firestore()

const initialState = {}

const store = createStore(rootReducer, initialState)

export default function App() {
  return (
    <Provider store={ store }>
      <ContactsNavigation />
    </Provider>
  )
}
