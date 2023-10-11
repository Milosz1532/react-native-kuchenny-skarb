// RecipeCard.js

import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { primaryColor } from '../assets/colors'
import { useNavigation } from '@react-navigation/native'

export default function RecipeCard({ id, name, image, category, area }) {
	const { navigate } = useNavigation()

	const handlePress = () => {
		navigate('RecipeDetails', { id: id })
	}

	return (
		<TouchableOpacity onPress={handlePress}>
			<ImageBackground
				source={{ uri: image }}
				style={styles.cardContainer}
				imageStyle={styles.cardImage}>
				<View style={styles.overlay}>
					<View style={styles.cardContext}>
						<View style={styles.cardTop}>
							{/* {category && (
								<View style={styles.cardHeader}>
									<Text style={styles.cardHeaderText}>{category}</Text>
								</View>
							)} */}

							<View style={styles.heart}>
								<Ionicons name={'heart'} color={'tomato'} size={24} />
							</View>
						</View>
						<View style={styles.cardBottom}>
							<Text style={styles.cardTitle}>{name}</Text>
							<View style={styles.cardBottomDetails}>
								<View style={styles.detailsElement}>
									<Ionicons name='timer-outline' size={24} color={primaryColor} />
									<Text style={styles.detailsElementText}>
										{Math.max(20, Math.floor(Math.random() * 59))} min
									</Text>
								</View>
								<View style={styles.detailsElement}>
									<MaterialCommunityIcons name='chef-hat' size={24} color={primaryColor} />
									<Text style={styles.detailsElementText}>{area ? area : ''}</Text>
								</View>
								<View style={styles.detailsElement}>
									<Ionicons name='md-restaurant' size={24} color={primaryColor} />
									<Text style={styles.detailsElementText}>{'Easy'}</Text>
								</View>
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
		height: 250,
		borderRadius: 20,
		marginBottom: 15,
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
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'row',
	},
	cardHeartCount: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 12,
		textAlign: 'center',
	},
	cardTitle: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	cardBottomDetails: {
		backgroundColor: 'white',
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 10,
	},

	detailsElement: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	detailsElementText: {
		marginStart: 8,
	},

	cardBottom: {
		padding: 10,
		borderRadius: 20,
	},
	cardHeader: {
		backgroundColor: '#f8f8f8',
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 3,
		alignItems: 'center',
	},
	cardHeaderText: {
		color: '#000',
		fontSize: 14,
		color: 'gray',
		fontWeight: '500',
	},
})
