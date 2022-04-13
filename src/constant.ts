export const Api = {
	BASE_URL: 'https://api.giphy.com/v1',
	TRENDING_URL: '/gifs/trending',
	SEARCH_URL: '/gifs/search',
} as const

export const Page = {
	START: 1,
	EACH: 20,
	CLASS_ACTIVE: 'page-item active',
	CLASS_INACTIVE: 'page-item',
} as const
