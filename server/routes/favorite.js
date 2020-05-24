const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//=================================
//             Favorite
//=================================

// 영화의 total favorite count
router.post('/favortieNumber', (req, res) => {

	// monggoDB 에서 favorite 숫자를 가져오기
	Favorite.find({ "movieId": req.body.movieId })
		.exec((err, info) => {
			if(err) return res.status(400).send(err);

			// 그다음에 프론트에 다시 숫자 정보를 보내주기
			res.status(200).json({
				success: true,
				favoriteNumber: info.length
			})
		})

});

// 사용자의 favorite 여부
router.post('/favorited', (req, res) => {
	// 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB 에서 가져오기
	Favorite.find({ "movieId": req.body.movieId, "userFrom" : req.body.userFrom })
				.exec((err, info) => {
					if(err) return res.status(400).send(err);

					res.status(200).json({
						success: true,
				favorited: !info
			})
		})

});

// favorite 추가
router.post('/addFromFavorite', (req, res) => {
	const favorite = new Favorite(req.body);
	favorite.save((err, doc) => {
		if(err) return res.status(400).send(err);
		return res.status(200).json({ success: true, doc});
	});

});

// favorite 삭제
router.post('/removeFromFavorite', (req, res) => {

	Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
		.exec((err, doc) =>{
			if(err) return res.status(400).send(err);
			return res.status(200).json({ success: true});
		})

});

// 사용자별 favorite movie 가져오기
router.post('/getFavoredMovie', (req, res) => {

	Favorite.find({userFrom: req.body.userFrom})
		.exec((err, favorites) => {
			if(err) return res.status(400).send(err);
			return res.status(200).json({ success: true, favorites });
		});


});
module.exports = router;
