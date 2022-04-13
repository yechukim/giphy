import React, { useEffect, useState } from 'react'
import { GifImage, PaginationType } from 'Giphy'
import { fetchData } from '../api/fetch'
import Loading from './Loading'
import Error from './Error'
import { Api, Page } from '../constant'
import Pagination from './Pagination'

function Giphy() {
	const [data, setData] = useState<[]>()
	const [pagination, setPagination] = useState<PaginationType>()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [keyword, setKeyword] = useState('')

	const [currentPage, setCurrentPage] = useState(Page.START)
	const [itemPerPage, setItemPerPage] = useState(Page.EACH)
	const indexOfLastItem = currentPage * itemPerPage
	const indexOfFirstItem = indexOfLastItem - itemPerPage
	const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem)

	useEffect(() => {
		const request = async () => {
			setIsLoading(true)
			try {
				const result = await fetchData(Api.TRENDING_URL)
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
		const result = await fetchData(Api.SEARCH_URL, keyword)
		if (!result) return
		setData(result.data)
		setIsLoading(false)
	}

	const renderGifs = () => {
		if (isLoading) return <Loading />

		return currentItems?.map((elem: GifImage) => {
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

	const pageSelected = (pageNum: number) => {
		setCurrentPage(pageNum)
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
			<Pagination
				pageSelected={pageSelected}
				currentPage={currentPage}
				itemPerPage={itemPerPage}
				totalItems={data?.length}
			/>
			<div className="container gifs">{renderGifs()}</div>
		</div>
	)
}

export default Giphy
