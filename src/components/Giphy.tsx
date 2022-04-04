import React, { useEffect, useState } from 'react'
import { GifImage, PaginationType } from 'Giphy'
import { fetchData } from '../api/fetch'
import Loading from './Loading'
import Error from './Error'
import { SEARCH, TRENDING } from '../constant'

function Giphy() {
	const [data, setData] = useState<[]>()
	const [pagination, setPagination] = useState<PaginationType>()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [keyword, setKeyword] = useState<string>('')

	useEffect(() => {
		const request = async () => {
			setIsLoading(true)
			try {
				const result = await fetchData(TRENDING)
				if (!result) return

				setData(result.data)
				setPagination(result.pagination)
			} catch (err) {
				setIsError(true)
				setTimeout(() => setIsError(false), 4000)
			}
			setIsLoading(false)
		}

		request()
	}, [])

	const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target as HTMLInputElement
		setKeyword(value)
	}

	const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (!keyword) alert('no keyword ;)')
		setIsLoading(true)
		const result = await fetchData(SEARCH, keyword)
		if (!result) return
		setData(result.data)
		setIsLoading(false)
		setKeyword('')
	}

	const renderGifs = () => {
		if (isLoading) return <Loading />

		return data?.map((elem: GifImage) => {
			return (
				<div key={elem.id} className="gif">
					<img src={elem.images.fixed_height.url} alt="gif" />
				</div>
			)
		})
	}

	const renderError = () => {
		if (!isError) return
		return <Error />
	}

	return (
		<div className="m-2 text-center ">
			{renderError()}
			<form className="d-inline-flex m-4">
				<input
					value={keyword}
					onChange={handleKeyword}
					type="text"
					placeholder="search"
					className="form-control"
				/>
				<button
					onClick={handleSearch}
					type="submit"
					className="btn btn-primary mx-2"
				>
					Go
				</button>
			</form>
			<div className="container gifs">{renderGifs()}</div>
		</div>
	)
}

export default Giphy
