const User = require('../models/user');
const Tweet = require('../models/tweet');


exports.addTweet = (req, res) => {
    // console.log(req);
    const user = req.profile;
    console.log(req.body)
    const { username, text, email, url } = req.body;
  
    if (!username || !text || !email) {
      return res.json({ error: "Enter some text" });
    }
    console.log(username, text, email, url);
  
    const tweet = new Tweet({ postedBy: user, text: text, name: username, photo: url })
  
    tweet.save()
      .then(result => {
        res.json({ tweet: result })
      })
      .catch(err => {
        res.json({ error: err })
      })
    // res.json({message:"Hi biro"})
  }
  

  exports.getTweets = (req, res) => {
    Tweet.find()
    .populate('postedBy', '_id, name')
    .populate('reply.postedBy', '_id name')      // .populate("category")
      .exec((err, tweets) => {
        if (err || !tweets) {
          return res.json({ error: err })
        }
  
        res.json(tweets);
      })
  }
  
  exports.userTweets = (req, res) => {
    const user = req.profile;
    Tweet.find({ postedBy: user._id })
    .populate('postedBy', '_id name')
    .populate('reply.postedBy', '_id name')
      .exec((err, tweets) => {
        if (err || !tweets) {
          return res.json({ error: err })
        }
        res.json(tweets)
      })
  }

  
exports.like = (req, res) =>{
    const tweetId = req.body.tweetId;
    const userId = req.body.userId;
  
      Tweet.findByIdAndUpdate(tweetId,{
        $push: {likes: userId}
      }, {new: true})
      .exec((err, result)=>{
        if (err) {
          return res.status(422).json({ error: err })
        }
        else{
          res.json(result)
      }
      })
  }
  
  exports.unlike = (req, res) =>{
    const tweetId = req.body.tweetId;
    const userId = req.body.userId;
  
    Tweet.findByIdAndUpdate(tweetId,{
      $pull: {likes: userId}
    }, {new: true})
    .exec((err, result)=>{
      if (err) {
        return res.status(422).json({ error: err })
      }
      else{
        res.json(result)
    }
    })
  }

  
exports.addReply = (req, res) =>{
    tweetId = req.body.tweetId;
  
    const comment = {
      text: req.body.text,
      postedBy: req.body.userId,
    }
  
    Tweet.findByIdAndUpdate(tweetId, {
      $push: {reply: comment}
    }, {new: true})
    .exec((err, result) =>{
      if(err){
        return res.status(422).json({ error: err })
      }
      else{
        res.json(result)
      }
    })
  }

  exports.deleteTweet = (req, res) =>{
    const tweetId = req.body.tweetId;
  
    Tweet.findById(tweetId)
    .exec((err, tweet)=>{
      if(err || !tweet){
        return res.status(422).json({error: err})
      }
  
      tweet.remove((error, deletedTweet)=>{
        if(error){
          return res.status(400).json({error: error})
        }
  
        res.json({"message":"Tweet deleted successfully"});
      })
      
    })
  }