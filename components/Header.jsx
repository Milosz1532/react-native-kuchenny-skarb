import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { borderColor, primaryColor } from '../assets/colors'

export default function Header() {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.appLogo}>Culinary Compass</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderBottomWidth: 1,
		borderColor: borderColor,
	},

	appLogo: {
		fontSize: 22,
		// color: '#404040',
		color: primaryColor,
		fontWeight: 'bold',
		textAlign: 'center',
	},
})
