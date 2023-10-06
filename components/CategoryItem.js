import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

import { textGrayColor } from '../assets/colors'

export default function CategoryItem({ name, image }) {
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: image,
				}}
				style={styles.image}></Image>
			<Text style={styles.text}>{name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: 100,
		marginEnd: 15,
		elevation: 5,
	},

	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},

	text: {
		marginTop: 3,
		textAlign: 'center',
		fontSize: 13,
		color: textGrayColor,
	},
})
