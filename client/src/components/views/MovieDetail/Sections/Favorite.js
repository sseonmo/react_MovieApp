import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Button} from "antd";

function Favorite({movieId, userFrom, movieInfo}) {

	const movieTitle =  movieInfo.title;
	const moviePost =  movieInfo.backdrop_path;
	const movieRunTime =  movieInfo.runtime;

	const [FavoriteNumber, setFavoriteNumber] = useState(0);
	const [Favorited, setFavorited] = useState(false);

	let variables  = {
		userFrom,
		movieId,
		movieTitle,
		movieRunTime,
		moviePost
	};

	useEffect(() => {

		// 현재 영화 총 favorite 숫자
		axios.post('/api/favorite/favortieNumber', variables)
			.then(response => {
				// console.log('favoriteNumber',response);
				if(response.data.success){
					setFavoriteNumber(response.data.favoriteNumber);
				}else {
					alert('숫자 정보를 가져오는데 실패했습니다.');
				}
			});

		// 내가 favorite 했는지 여부
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

	const onClickFavorite = () => {
		console.log(variables);
		if (Favorited) {
			axios.post('/api/favorite/removeFromFavorite', variables)
				.then(response => {
					if (response.data.success) {
						setFavoriteNumber(FavoriteNumber - 1 );
						setFavorited(!Favorited);
					} else {
						alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
					}
				});
		} else {
			axios.post('/api/favorite/addFromFavorite', variables)
				.then(response => {
					if (response.data.success) {
						setFavoriteNumber(FavoriteNumber + 1 );
						setFavorited(!Favorited);
					} else {
						alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
					}
				});
		}
	};

	return (
		<div>
			<Button onClick={onClickFavorite}>
				{Favorited ? "Not Favorite": "Add to Favorite"} {FavoriteNumber}
			</Button>
		</div>
	);
}

export default Favorite;