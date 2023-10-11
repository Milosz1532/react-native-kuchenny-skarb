import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { borderColor, primaryColor } from '../assets/colors'

export default function Header({ title, color }) {
	return (
		<View style={styles.headerContainer}>
			<Text style={color ? styles.appLogo : styles.title}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 10,
		paddingBottom: 5,
		borderBottomWidth: 1,
		borderColor: '#F4F4F4',
	},

	appLogo: {
		fontSize: 22,
		// color: '#404040',
		color: primaryColor,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	title: {
		fontSize: 22,
		textAlign: 'center',
		fontWeight: '500',
	},
})
