import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { globalStyles } from '../assets/styles'
import { primaryColor } from '../assets/colors'
import Api from '../services/Api'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RecipeDetailsScreen({ route, navigation }) {
	const { id } = route.params

	const [recipeDetails, setRecipeDetails] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const [isFavorite, setIsFavorite] = useState(false)

	useEffect(() => {
		const fetchRecipeDetails = async () => {
			try {
				const recipe = await Api.getRecipeDetails(id)
				setRecipeDetails(recipe)
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching recipe details:', error)
			}
		}

		if (id) {
			setIsLoading(true)
			fetchRecipeDetails()
		}
	}, [id])

	const checkIfFavorite = async () => {
		try {
			const favorites = await AsyncStorage.getItem('favorites')

			if (favorites) {
				const favoritesArray = JSON.parse(favorites)
				const isFavoriteRecipe = favoritesArray.some(fav => fav.id === id)
				setIsFavorite(prevIsFavorite => {
					if (prevIsFavorite !== isFavoriteRecipe) {
						return isFavoriteRecipe
					}
					return prevIsFavorite
				})
			}
		} catch (error) {
			console.error('Error checking if recipe is favorite:', error)
		}
	}

	useEffect(() => {
		checkIfFavorite()
	}, [])

	const ingredientsData = []

	for (let i = 1; i <= 20; i++) {
		const ingredient = recipeDetails?.[`strIngredient${i}`]
		const measure = recipeDetails?.[`strMeasure${i}`]

		if (ingredient && measure) {
			ingredientsData.push(`${ingredient} - ${measure}`)
		}
	}

	const toggleFavorite = async () => {
		try {
			let favorites = await AsyncStorage.getItem('favorites')

			if (!favorites) {
				favorites = '[]'
			}

			const favoritesArray = JSON.parse(favorites)

			const existingFavoriteIndex = favoritesArray.findIndex(fav => fav.id === id)

			if (existingFavoriteIndex !== -1) {
				favoritesArray.splice(existingFavoriteIndex, 1)
				await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
				console.log(`Usuwamy z ulubionych do ulubionych`)
			} else {
				const newFavorite = {
					id: id,
					name: recipeDetails.strMeal,
					image: recipeDetails.strMealThumb,
					date: Date.now(),
				}
				favoritesArray.push(newFavorite)
				await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
				console.log(`Dodany do ulubionych`)
			}

			setIsFavorite(!isFavorite)
		} catch (error) {
			console.error('Error toggling favorite recipe:', error)
		}
	}

	return (
		<ScrollView>
			{isLoading ? (
				<View>
					<Text>Loading...</Text>
				</View>
			) : recipeDetails ? (
				<>
					<View style={styles.upperRow}>
						<TouchableOpacity style={{ marginStart: 10 }} onPress={() => navigation.goBack()}>
							<Ionicons name='arrow-back-circle-outline' size={30} />
						</TouchableOpacity>
						<TouchableOpacity style={{ marginEnd: 10 }} onPress={toggleFavorite}>
							<Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={30} color={`tomato`} />
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
						<View style={styles.detailsContent}>
							<Text style={styles.detailsTitle}>Ingredients:</Text>
							{ingredientsData.map((item, index) => (
								<View key={index} style={styles.ingredientsItem}>
									<MaterialCommunityIcons name='food' size={24} color='black' />
									<Text style={styles.ingredientsText}>{item}</Text>
								</View>
							))}
							<Text style={styles.detailsTitle}>How to prepare:</Text>
							<View>
								<Text style={{ marginTop: 10 }}>{recipeDetails.strInstructions}</Text>
							</View>
							{/* <Text style={styles.detailsTitle}>YouTube movie:</Text> */}
							{/* recipeDetails.strYoutube */}
						</View>
					</View>
				</>
			) : (
				<View>
					<Text>Error loading recipe details</Text>
				</View>
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
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
		resizeMode: 'cover',
		height: 400,
		width: '100%',
	},
	details: {
		marginTop: -20,
		backgroundColor: '#fff',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		height: '100%',
		paddingBottom: 15,
	},
	titleRow: {
		marginHorizontal: 20,
		marginTop: 10,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
	},
	textTitle: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	detailsContent: {
		marginHorizontal: 20,
	},
	detailsTitle: {
		fontWeight: 'bold',
		fontSize: 16,
		marginTop: 10,
	},
	ingredientsItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E5E5',
	},
	ingredientsText: {
		marginLeft: 10,
	},
	area: {
		backgroundColor: primaryColor,
		color: '#fff',
		padding: 5,
		borderRadius: 7,
	},
})
