import axios from 'axios'
import Constants from 'expo-constants'

const baseURL = 'https://www.themealdb.com/api/json/v1/1'

const api = axios.create({
	baseURL,
	timeout: 5000,
})

api.interceptors.request.use(config => {
	config.params = {
		// apiKey: Constants.expoConfig.extra.SPOONTACULAR_API_KEY, // Do Expo
		// apiKey: process.env.SPOONTACULAR_API_KEY, // Bez Expo
		...config.params,
	}
	return config
})

api.interceptors.response.use(
	response => response,
	error => {
		const errorMessage = error.response?.data?.message || 'Wystąpił błąd.'
		return Promise.reject(errorMessage)
	}
)

const Api = {
	getRandomRecipe: async () => {
		try {
			const randomResponse = await api.get('/random.php')
			return randomResponse.data.meals && randomResponse.data.meals[0]
		} catch (error) {
			throw error
		}
	},
	getAreaRecipes: async country => {
		try {
			const response = await api.get('/filter.php', { params: { a: country } })
			return response.data.meals
		} catch (error) {
			throw error
		}
	},
	getCategories: async () => {
		try {
			const response = await api.get('/categories.php')
			return response.data.categories
		} catch (error) {
			throw error
		}
	},

	getRecipesByCategory: async category => {
		try {
			const response = await api.get('/filter.php', { params: { c: category } })
			return response.data.meals
		} catch (error) {
			throw error
		}
	},
}

export default Api
