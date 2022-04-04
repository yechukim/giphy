import axios, { AxiosError } from 'axios'
import { DataType } from 'Giphy'
import { BASE_URL } from '../constant'
import { API_KEY } from './key'

const instance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-type': 'application/json',
	},
})

export const fetchData = async (
	url: string,
	keyword?: string
): Promise<DataType | undefined> => {
	try {
		const response = await instance.get(url, {
			params: {
				api_key: API_KEY,
				q: keyword && keyword,
			},
		})
		return response.data
	} catch (error: Error | AxiosError) {
		console.error(error.message)
	}
}
