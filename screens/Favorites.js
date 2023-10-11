import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { globalStyles } from '../assets/styles'
import Header from '../components/Header'

import { useFocusEffect } from '@react-navigation/native'

import RecipeSmallCard from '../components/RecipeSmallCard'

const Favorites = ({ navigation }) => {
	const [favorites, setFavorites] = useState([])
	const [refreshing, setRefreshing] = useState(false)

	const loadFavorites = async () => {
		try {
			const favoritesData = await AsyncStorage.getItem('favorites')
			if (favoritesData) { 
				const favoritesArray = JSON.parse(favoritesData)
				setFavorites(favoritesArray)
			}
		} catch (error) {
			console.error('Error loading favorites:', error)
		}
	}

	const onRefresh = async () => {
		setRefreshing(true)
		await loadFavorites()
		setRefreshing(false)
	}

	useEffect(() => {
		loadFavorites()
	}, [])

	useFocusEffect(
		React.useCallback(() => {
			loadFavorites()
		}, [])
	)

	const categorizeFavorites = () => {
		const now = Date.now()
		const weekAgo = now - 7 * 24 * 60 * 60 * 1000
		const monthAgo = now - 30 * 24 * 60 * 60 * 1000

		const recentFavorites = []
		const weekAgoFavorites = []
		const monthAgoFavorites = []
		const olderFavorites = []

		for (const favorite of favorites) {
			if (favorite.date >= now - 6 * 24 * 60 * 60 * 1000) {
				recentFavorites.push(favorite)
			} else if (favorite.date >= weekAgo) {
				weekAgoFavorites.push(favorite)
			} else if (favorite.date >= monthAgo) {
				monthAgoFavorites.push(favorite)
			} else {
				olderFavorites.push(favorite)
			}
		}

		return {
			recentFavorites,
			weekAgoFavorites,
			monthAgoFavorites,
			olderFavorites,
		}
	}

	const renderFavoriteRecipes = (recipeList, title) => {
		return (
			<View style={styles.categoryContainer}>
				<Text style={styles.categoryTitle}>{title}</Text>
				<View style={styles.recipeContainer}>
					{recipeList.map((favorite, index) => (
						<View style={styles.recipeItem} key={index}>
							<RecipeSmallCard
								id={favorite.id}
								name={favorite.name}
								image={favorite.image}
								date={favorite.date}
							/>
						</View>
					))}
				</View>
			</View>
		)
	}

	const { recentFavorites, weekAgoFavorites, monthAgoFavorites, olderFavorites } =
		categorizeFavorites()

	return (
		<View style={globalStyles.container}>
			<Header title={'Favorites'} />
			<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
				<View>
					{renderFavoriteRecipes(recentFavorites, 'Ostatnio dodane')}
					{renderFavoriteRecipes(weekAgoFavorites, 'Dodane tydzień temu')}
					{renderFavoriteRecipes(monthAgoFavorites, 'Dodane miesiąc temu')}
					{renderFavoriteRecipes(olderFavorites, 'Starsze przepisy')}
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	categoryContainer: {
		marginBottom: 15,
	},
	categoryTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	recipeContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	recipeItem: {
		marginBottom: 15,
	},
})

export default Favorites
