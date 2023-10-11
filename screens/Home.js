// Home.js

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import RecipeCard from '../components/RecipeCard'
import Api from '../services/Api'
import { globalStyles } from '../assets/styles'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header'

export default function Home() {
	const [randomRecipe, setRandomRecipe] = useState(null)
	const [polishRecipes, setPolishRecipes] = useState([])
	const [italianRecipes, setItalianRecipes] = useState([])

	useEffect(() => {
		const fetchRandomRecipe = async () => {
			try {
				const randomRecipe = await Api.getRandomRecipe()
				setRandomRecipe(randomRecipe)
			} catch (error) {
				console.error('Error fetching random recipe:', error)
			}
		}

		const fetchPolishRecipes = async () => {
			try {
				const recipes = await Api.getAreaRecipes('Polish')
				setPolishRecipes(recipes)
			} catch (error) {
				console.error('Error fetching random recipe:', error)
			}
		}

		const fetchItalianRecipes = async () => {
			try {
				const recipes = await Api.getAreaRecipes('Italian')
				setItalianRecipes(recipes)
			} catch (error) {
				console.error('Error fetching random recipe:', error)
			}
		}

		fetchRandomRecipe()
		fetchPolishRecipes()
		fetchItalianRecipes()
	}, [])
	return (
		<View style={globalStyles.container}>
			<Header title={'Culinary Compas'} color={true} />
			<ScrollView>
				<View>
					{randomRecipe && (
						<>
							<Text style={globalStyles.textTitle}>Random recipe</Text>
							<RecipeCard
								id={randomRecipe.idMeal}
								name={randomRecipe.strMeal}
								image={randomRecipe.strMealThumb}
								category={randomRecipe.strCategory}
							/>
						</>
					)}

					{polishRecipes && (
						<>
							<Text style={globalStyles.textTitle}>Polish Kitchen</Text>
							{polishRecipes.map((recipe, index) => (
								<RecipeCard
									key={index}
									id={recipe.idMeal}
									name={recipe.strMeal}
									image={recipe.strMealThumb}
									category={recipe.strCategory}
								/>
							))}
						</>
					)}
					{italianRecipes && (
						<>
							<Text style={globalStyles.textTitle}>Italian Kitchen</Text>
							{italianRecipes.map((recipe, index) => (
								<RecipeCard
									key={index}
									id={recipe.idMeal}
									name={recipe.strMeal}
									image={recipe.strMealThumb}
									category={recipe.strCategory}
								/>
							))}
						</>
					)}
				</View>
			</ScrollView>
		</View>
	)
}
