import CircularProgress from '@mui/material/CircularProgress'
function Loading() {
	return (
		<div className="loading">
			<CircularProgress thickness={5} size={52} color="secondary" />
		</div>
	)
}

export default Loading
