const express = require('express');
const router = express.Router();

const { userById} = require('../controllers/user')
const { addTweet, getTweets, userTweets, like, addReply, deleteTweet, unlike } = require('../controllers/tweet')

router.post('/tweet/:userId', addTweet);
router.get('/gettweets', getTweets);
router.get('/gettweets/by/:userId', userTweets);

router.put('/like', like)
router.put('/unlike', unlike)
router.put('/reply', addReply)


router.delete('/deletetweet', deleteTweet);

router.param('userId', userById);



module.exports = router;