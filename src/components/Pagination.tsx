import { PaginationPropType } from 'Giphy'
import { Page } from '../constant'

function Pagination(props: PaginationPropType) {
	const { pageSelected, itemPerPage, totalItems, currentPage } = props
	const pageNumbers: number[] = []

	if (totalItems) {
		const pages = Math.ceil(totalItems / itemPerPage)
		for (let i = 1; i <= pages; i++) {
			pageNumbers.push(i)
		}
	}
	return (
		<nav>
			<ul className="pagination pagination-lg d-flex justify-content-center">
				{pageNumbers.map((pagenumber) => (
					<li
						key={pagenumber}
						className={
							pagenumber === currentPage
								? Page.CLASS_ACTIVE
								: Page.CLASS_INACTIVE
						}
					>
						<a onClick={() => pageSelected(pagenumber)} className="page-link">
							{pagenumber}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Pagination
