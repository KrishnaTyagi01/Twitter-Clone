const express = require('express');
const router = express.Router();

const { userById, addTweet, getTweets, userTweets, follow, unfollow, like, addReply, deleteTweet, unlike, findUser,getUser, updateProfilePic} = require('../controllers/user')

router.post('/finduser', findUser)

router.get('/getuser/:userId', getUser)

router.put('/follow', follow);
router.put('/unfollow', unfollow)

router.put('/updateprofilepic', updateProfilePic)

router.param('userId', userById);



module.exports = router;