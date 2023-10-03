// import { NavigationContainer } from '@react-navigation/native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import { Ionicons } from '@expo/vector-icons'

// import Home from './screens/Home'
// import Search from './screens/Search'
// import Favorites from './screens/Favorites'
// import { primaryColor } from './assets/colors'

// //  Tab Bottom
// const Tab = createBottomTabNavigator()

// function TabGroup() {
// 	return (
// 		<Tab.Navigator
// 			screenOptions={({ route, navigation }) => ({
// 				tabBarIcon: ({ color, focused, size }) => {
// 					let iconName

// 					if (route.name === 'Home') {
// 						iconName = focused ? 'home' : 'home-outline'
// 					} else if (route.name === 'Wyszukaj') {
// 						iconName = focused ? 'search' : 'search-outline'
// 					} else if (route.name === 'Ulubione') {
// 						iconName = focused ? 'heart' : 'heart-outline'
// 					}

// 					return <Ionicons name={iconName} size={size} color={color} />
// 				},
// 				tabBarActiveTintColor: primaryColor,
// 				tabBarInactiveTintColor: 'gray',
// 			})}>
// 			<Tab.Screen name='Home' component={Home} />
// 			<Tab.Screen name='Wyszukaj' component={Search} />
// 			<Tab.Screen name='Ulubione' component={Favorites} />
// 		</Tab.Navigator>
// 	)
// }

// export default function BottomTabNavigation() {
// 	return (
// 		<NavigationContainer>
// 			<TabGroup />
// 		</NavigationContainer>
// 	)
// }

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

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
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
		elevation: 0,
		height: 70,
	},
}

const BottomTabNavigation = () => {
	return (
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
	)
}

export default BottomTabNavigation
