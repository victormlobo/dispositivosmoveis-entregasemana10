import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import Colors from '../constraints/colors'
import NewContactView from "../views/NewContactView"
import ContactListView from '../views/ContactListView'

const ContactsNavigation = createStackNavigator ({
  ContactList: ContactListView,
  NewContact: NewContactView
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android'
          ? Colors.primary
          : 'white',
    },
    headerTintColor:
      Platform.OS === 'android'
      ? 'white'
      : Colors.primary
  }
})

export default createAppContainer(ContactsNavigation)
