import React, {useEffect, useState} from 'react';
import './favorite.css';
import axios from 'axios';
import {Popover} from "antd";
import {IMAGE_BASE_URL} from "../../Config";

function FavoritePage(props) {

	const [Favorites, setFavorites] = useState([]);

	useEffect(() => {
		fetchFavoriteMovie()
	}, []);

	const fetchFavoriteMovie = () =>{
		axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
			.then(response => {
				if (response.data.success) {
					setFavorites(response.data.favorites)
				} else {
					alert('영화 정보를 가져오는데 실패 했습니다. ')
				}
			})
	};

	const renderCards = Favorites.map((favorite, index) => {
		const content = (
			<div>
				{favorite.moviePost ?
					<img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image"
				}
			</div>
		);

		const  onClickDelete = (movieId, userFrom) => {
			const variable = { movieId, userFrom };
			axios.post('/api/favorite/removeFromFavorite', variable)
				.then( response => {
					if (response.data.success) {
						fetchFavoriteMovie()
					} else {
						alert('리스트에서 지우는데 실패했습니다.')
					}
				});


		};



		return <tr key={index}>
			<Popover content={content} title={favorite.movieTitle}>
				<td>{favorite.movieTitle}</td>
			</Popover>
			<td>{favorite.movieRunTime} mins</td>
			<td>
				<button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button>
			</td>
		</tr>
	});
	console.log(renderCards);

	return (

		<div style={{width: '85%', margin: '3rem auto'}}>
			<h2> Favorite Movies </h2>
			<hr/>

			<table>
				<thead>
				<tr>
					<td>Movie Title</td>
					<td>Movie Runtime</td>
					<td>Remove from favorites</td>
				</tr>
				</thead>
				<tbody>
					{renderCards}
				</tbody>
			</table>
		</div>
	);
}

export default FavoritePage;