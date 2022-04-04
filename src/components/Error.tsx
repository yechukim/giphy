import errorCat from '../assets/cat-computer.gif'
function Error() {
	return (
		<div className="error">
			<div className="error__title"> error occurred ! ! </div>
			<img src={errorCat} alt="cat error" />
		</div>
	)
}

export default Error
