import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomTabNavigation from './BottomTabNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RecipeDetailsScreen from './screens/RecipeDetailsScreen'

const Stack = createNativeStackNavigator()

const MainScreen = ({ children }) => (
	<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={{ top: 'maximum' }}>
		{children}
	</SafeAreaView>
)

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='BottomNavigation'
					options={{ headerShown: false }}
					component={BottomTabNavigation}
				/>
				<Stack.Screen
					name='RecipeDetails'
					options={{ headerShown: false }}
					component={RecipeDetailsScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

{
	/* <Stack.Screen name='RecipeDetails' options={{ headerShown: false }}>
					{props => (
						<MainScreen>
							<RecipeDetailsScreen {...props} />
						</MainScreen>
					)}
				</Stack.Screen> */
}
