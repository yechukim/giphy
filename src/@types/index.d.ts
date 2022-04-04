declare module 'Giphy' {
	type DataType = {
		data: []
		meta: object
		pagination: PaginationType
	}

	type PaginationType = {
		total_count: number
		count: number
		offset: 0
	}

	type GifImage = {
		id: string
		images: object
	}
}
