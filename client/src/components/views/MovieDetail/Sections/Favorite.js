import React, {useEffect, useState} from 'react';
import axios from "axios";

function Favorite({movieId, userFrom, movieInfo}) {

	const movieTitle =  movieInfo.title;
	const moviePost =  movieInfo.backdrop_path;
	const movieRunTime =  movieInfo.runtime;

	const [FavoriteNumber, setFavoriteNumber] = useState(0);
	const [Favorited, setFavorited] = useState(false);

	useEffect(() => {
		let variables  = {
			userFrom,
			movieId
		};

		axios.post('/api/favorite/favortieNumber', variables)
			.then(response => {
				// console.log('favoriteNumber',response);
				if(response.data.success){
					setFavoriteNumber(response.data.favoriteNumber);
				}else {
					alert('숫자 정보를 가져오는데 실패했습니다.');
				}
			});

		axios.post('/api/favorite/favorited', variables)
			.then(response => {
				// console.log('favorited',response);
				if(response.data.success){
					setFavorited(response.data.favorited);
				}else {
					alert('정보를 가져오는데 실패했습니다. .');
				}
			})

	}, []);

	return (
		<div>
			<button>
				{Favorited ? "Not Favorite": "Add to Favorite"} {FavoriteNumber}
			</button>
		</div>
	);
}

export default Favorite;