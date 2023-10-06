import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons } from '@expo/vector-icons'

import Home from './screens/Home'
import Search from './screens/Search'
import Favorites from './screens/Favorites'
import { primaryColor } from './assets/colors'

const Tab = createBottomTabNavigator()

const screenOptions = {
	tabBarShowLabel: false,
	tabBarHideOnKeyboard: true,
	headerShown: false,
	tabBarStyle: {
		margin: 0,
		padding: 0,
	},
}

const BottomTabNavigation = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={{ top: 'maximum' }}>
			<Tab.Navigator screenOptions={screenOptions}>
				<Tab.Screen
					name='Home'
					component={Home}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<Ionicons
									name={focused ? 'home' : 'home-outline'}
									size={24}
									color={focused ? primaryColor : 'gray'}
								/>
							)
						},
					}}
				/>
				<Tab.Screen
					name='Wyszukaj'
					component={Search}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<Ionicons
									name={focused ? 'search' : 'search-outline'}
									size={24}
									color={focused ? primaryColor : 'gray'}
								/>
							)
						},
					}}
				/>
				<Tab.Screen
					name='Ulubione'
					component={Favorites}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<Ionicons
									name={focused ? 'heart' : 'heart-outline'}
									size={24}
									color={focused ? primaryColor : 'gray'}
								/>
							)
						},
					}}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	)
}

export default BottomTabNavigation
