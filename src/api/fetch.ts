import axios from 'axios'
import { DataType } from 'Giphy'
import { Api } from '../constant'
import { API_KEY } from './key'

const instance = axios.create({
	baseURL: Api.BASE_URL,
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
	} catch (error) {
		console.error(error)
	}
}
