import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { primaryColor } from '../assets/colors'

export default function RecipeSmallCard({ id, image, name }) {
	const { navigate } = useNavigation()

	const handlePress = () => {
		navigate('RecipeDetails', { id: id })
	}

	return (
		<TouchableOpacity onPress={handlePress}>
			<ImageBackground
				source={{
					uri: image,
				}}
				style={styles.cardContainer}
				imageStyle={styles.cardImage}>
				<View style={styles.overlay}>
					<View style={styles.cardContext}>
						<View style={styles.cardTop}>
							<View>
								<Ionicons name={'heart'} color={'tomato'} size={24} />
							</View>
						</View>
						<View style={styles.cardBottom}>
							<View style={styles.cardBottomDetails}>
								<Text style={styles.title}>{name}</Text>
							</View>
						</View>
					</View>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		width: 160,
		height: 180,
		borderRadius: 20,
		marginEnd: 20,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
		elevation: 5,
	},
	cardImage: {
		flex: 1,
		width: '100%',
		borderRadius: 20,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 20,
		width: '100%',
	},
	cardContext: {
		flex: 1,
		justifyContent: 'space-between',
	},
	cardTop: {
		padding: 10,
		borderRadius: 20,
		justifyContent: 'end',
		alignItems: 'flex-end',
	},

	cardBottomDetails: {
		backgroundColor: 'white',
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},

	cardBottom: {
		padding: 10,
		borderRadius: 20,
	},

	title: {
		fontSize: 13,
		paddingVertical: 5,
		paddingHorizontal: 5,
	},
})
