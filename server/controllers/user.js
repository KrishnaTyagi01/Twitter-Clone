const User = require('../models/user');
const Tweet = require('../models/tweet');

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .exec((err, user) => {
      if (err || !user) {
        //  console.log(err)
        // console.log(user)
        return res.status(400).json({ error: "User not found" })
      }

      req.profile = user;
      next();
    })
}




exports.follow = (req, res) => {
  const followedUser = req.body.followedUser;
  const followingUser = req.body.followingUser;

  User.findByIdAndUpdate(followedUser, {
    $push: { followers: followingUser }
  }, { new: true })
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err })
      }

      User.findByIdAndUpdate(followingUser, {
        $push: { following: followedUser }
      }, { new: true }).then(result => {
        res.json(result)
      }).catch(err => {
        res.status(422).json({ error: err })
      })
    })
}


exports.unfollow = (req, res) =>{
  const unfollowedUser = req.body.unfollowedUser;
  const unfollowingUser = req.body.unfollowingUser;

  User.findByIdAndUpdate(unfollowedUser, {
    $pull: {followers: unfollowingUser}
  }, {new:true})
  .exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }

    User.findByIdAndUpdate(unfollowingUser, {
      $pull: { following: unfollowedUser }
    }, { new: true }).then(result => {
      res.json(result)
    }).catch(err => {
      res.status(422).json({ error: err })
    })
  })
}






exports.findUser = (req, res ) =>{
  console.log('reached backend')
  const username = req.body.name;

  User.find({name: username})
  .exec((err, user)=>{
    if(err || !user){
      console.log('error in backend')
      return res.status(422).json({error: err})
    }
    console.log('sending response from backend')
    res.json(user)
  })
}

exports.getUser = (req, res) =>{
  const user = req.profile
  // console.log(user)
  return res.json(user)
}

exports.updateProfilePic = (req, res) =>{
  const img = req.body.img;
  const userId = req.body.userId;

  User.findByIdAndUpdate(userId, {$set: {photo: img}}, {new:true})
  .exec((err, result)=>{
    if(err){
      return res.status(422).json({error:"cannot update pic"})
  }
    res.json(result)
  })

  
}