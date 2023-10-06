import { View, ScrollView, Text } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { globalStyles } from '../assets/styles'

import Header from '../components/Header'

export default function Favorites() {
	return (
		<View style={{ backgroundColor: '#fff' }}>
			<View>
				<Header />
				<ScrollView style={globalStyles.container}>
					<Text>Favorites Recipes list</Text>
				</ScrollView>
			</View>
		</View>
	)
}
