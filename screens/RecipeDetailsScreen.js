import { useEffect, useState } from 'react'

import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import { globalStyles } from '../assets/styles'
import { primaryColor } from '../assets/colors'

import Header from '../components/Header'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import Api from '../services/Api'

export default function RecipeDetailsScreen({ route, navigation }) {
	const { id } = route.params

	console.log(id)

	const [recipeDetails, setRecipeDetails] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchRecipeDetails = async () => {
			try {
				const recipe = await Api.getRecipeDetails(id)
				setRecipeDetails(recipe)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching random recipe:', error)
			}
		}

		if (id) {
			setIsLoading(true)
			fetchRecipeDetails()
		}
	}, [id])

	return (
		<View>
			{isLoading ? (
				<View>
					<Text>Loading...</Text>
				</View>
			) : recipeDetails ? ( // Check if recipeDetails is not null
				<View>
					<View style={styles.upperRow}>
						<TouchableOpacity style={{ marginStart: 10 }} onPress={() => navigation.goBack()}>
							<Ionicons name='chevron-back-circle' size={30} />
						</TouchableOpacity>
						<TouchableOpacity style={{ marginEnd: 10 }}>
							<Ionicons name='heart-outline' size={30} />
						</TouchableOpacity>
					</View>
					<Image
						source={{
							uri: recipeDetails.strMealThumb,
						}}
						style={styles.mainImage}
					/>

					<View style={styles.details}>
						<View style={styles.titleRow}>
							<Text style={globalStyles.textTitle}>{recipeDetails.strMeal}</Text>
							<Text style={styles.area}>{recipeDetails.strCategory}</Text>
						</View>
					</View>
				</View>
			) : (
				<View>
					<Text>Error loading recipe details</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	upperRow: {
		marginTop: 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		left: 0,
		position: 'absolute',
		zIndex: 10,
	},

	mainImage: {
		// aspectRatio: 1,
		resizeMode: 'cover',
		height: 400,
		width: '100%',
	},

	details: {
		marginTop: -20,
		backgroundColor: '#fff',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},

	titleRow: {
		marginHorizontal: 20,
		marginVertical: 10,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},

	area: {
		backgroundColor: primaryColor,
		color: '#fff',
		padding: 5,
		borderRadius: 7,
	},
})
