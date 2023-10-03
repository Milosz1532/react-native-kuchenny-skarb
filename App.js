import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import BottomTabNavigation from './BottomTabNavigation'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RecipeDetailsScreen from './screens/RecipeDetailsScreen'

const Stack = createNativeStackNavigator()

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
					component={RecipeDetailsScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
