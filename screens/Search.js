import React, { useState, useEffect } from 'react'
import {
	View,
	ScrollView,
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { primaryColor, borderColor } from '../assets/colors'
import { globalStyles } from '../assets/styles'

import Api from '../services/Api'

import RecipeCard from '../components/RecipeCard'
import CategoryItem from '../components/CategoryItem'
import RecipeSmallCard from '../components/RecipeSmallCard'

export default function Search() {
	const [searchQuery, setSearchQuery] = useState('')
	const [randomRecipe, setRandomRecipe] = useState(null)
	const [categoriesData, setCategoriesData] = useState(null)
	const [recipesList1, setRecipesList1] = useState(null)
	const [recipesList2, setRecipesList2] = useState(null)
	const [recipesList3, setRecipesList3] = useState(null)

	useEffect(() => {
		const fetchRandomRecipe = async () => {
			try {
				const randomRecipes = await Api.getRandomRecipe()
				setRandomRecipe(randomRecipes)
			} catch (error) {}
		}

		const fetchCategories = async () => {
			try {
				const categories = await Api.getCategories()
				setCategoriesData(categories)
			} catch (error) {}
		}

		const fetchByCategory = async (list, type) => {
			try {
				const response = await Api.getRecipesByCategory(type)

				list(response)
			} catch (error) {}
		}

		// fetchRandomRecipe()
		fetchCategories()

		fetchByCategory(setRecipesList1, 'Seafood')
		fetchByCategory(setRecipesList2, 'Beef')
		fetchByCategory(setRecipesList3, 'Chicken')
	}, [])

	return (
		<ScrollView style={globalStyles.container}>
			<View style={{ paddingBottom: 20 }}>
				<View style={styles.searchContainer}>
					<TextInput
						style={styles.searchInput}
						placeholder='Wpisz wyszukiwaną frazę'
						onChangeText={text => setSearchQuery(text)}
						value={searchQuery}
					/>
					<TouchableOpacity>
						<Ionicons name='search' size={24} color={primaryColor} style={styles.searchIcon} />
					</TouchableOpacity>
				</View>

				<View style={{ marginTop: 10 }}>
					{randomRecipe && <RecipeCard recipe={randomRecipe} />}
				</View>

				{categoriesData && (
					<>
						<Text style={globalStyles.textTitle}>Categories</Text>
						<FlatList
							style={styles.categories}
							horizontal
							data={categoriesData}
							keyExtractor={item => item.idCategory}
							renderItem={({ item }) => (
								<CategoryItem name={item.strCategory} image={item.strCategoryThumb} />
							)}></FlatList>
					</>
				)}

				{recipesList1 && (
					<View style={{ marginTop: 20 }}>
						<Text style={globalStyles.textTitle}>Seafood</Text>

						<FlatList
							style={styles.categories}
							horizontal
							data={recipesList1}
							keyExtractor={item => item.idMeal}
							renderItem={({ item }) => (
								<RecipeSmallCard name={item.strMeal} image={item.strMealThumb} />
							)}></FlatList>
					</View>
				)}
				{recipesList2 && (
					<View style={{ marginTop: 20 }}>
						<Text style={globalStyles.textTitle}>Beef</Text>

						<FlatList
							style={styles.categories}
							horizontal
							data={recipesList2}
							keyExtractor={item => item.idMeal}
							renderItem={({ item }) => (
								<RecipeSmallCard name={item.strMeal} image={item.strMealThumb} />
							)}></FlatList>
					</View>
				)}
				{recipesList3 && (
					<View style={{ marginTop: 20 }}>
						<Text style={globalStyles.textTitle}>Chicken</Text>

						<FlatList
							style={styles.categories}
							horizontal
							data={recipesList3}
							keyExtractor={item => item.idMeal}
							renderItem={({ item }) => (
								<RecipeSmallCard name={item.strMeal} image={item.strMealThumb} />
							)}></FlatList>
					</View>
				)}
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: 20,
		borderColor: borderColor,
		paddingHorizontal: 10,
	},
	searchInput: {
		flex: 1,
		height: 35,
	},
	searchIcon: {
		marginLeft: 15,
	},

	categories: {
		marginTop: 10,
		flexDirection: 'row',
	},
})
