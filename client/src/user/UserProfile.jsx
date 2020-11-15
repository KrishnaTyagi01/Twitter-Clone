import React from 'react';
import { useState,useEffect } from 'react';
import {getUserTweets, isAuthenticated, followUser, unfollowUser, likeTweet, reply, getUser, unlikeTweet, deleteTweet} from './ApiUser';
import Navbar from './Navbar'


const Profile = ({ match }) => {
    const [tweets, setTweets] = useState([])
    const [error, setError] = useState('')
    const [userProfile, setUserProfile] = useState('');
    const {user} = isAuthenticated(); //GET THE ID OF LOGGED IN USER
    const [showFollow, SetShowFollow] = useState(!user.following.includes(match.params.userId));
  
    const loadTweets = () =>{
        getUserTweets(match.params.userId)
        .then( res =>{
            if(res.error){
                console.log(res.error)
                console.log('An error occured')
                setError(res.error) 
            }else{
                setTweets(res)
                // SetShowFollow(!user.following.includes(userId))
                console.log('no error')
                console.log(res)
            }
        })
    }

    const getUserInfo = () =>{
        getUser(match.params.userId)
        .then(res=>{
            if(res.error){
                console.log(res.error)
            }else{
                console.log(res)
                console.log(res.followers.length)
                setUserProfile(res)
                // console.log(userProfile.followers.length)
            }
        })
    }

const clickLike = (tweetId ) =>{
    likeTweet(tweetId, user._id)
    .then(res=>{
        if(res.error){
            console.log(res.error)
        }else{
            console.log(res)
            console.log('tweet liked')
            loadTweets()
        }
    })
}

const clickUnlike = (tweetId) =>{
    unlikeTweet(tweetId, user._id)
    .then(res => {
        if (res.error) {
            console.log(res.error)
        } else {
            // console.log(res)
            console.log('tweet unliked')
            loadTweets()
        }
    })
}


const addComment =(text, tweetId) =>{

    reply(text, tweetId, user._id)
    .then(res =>{
        if(res.error){
            console.log(res.error)
        }else{
            console.log(res)
            console.log('comment added')
            loadTweets()
        }
    })
}

const clickFollow = () =>{
    followUser(match.params.userId, user._id)
    .then(res =>{
        if(res.error){
            console.log(res.error)
        } else{
            console.log(res)
            SetShowFollow(false)
            getUserInfo()
            loadTweets()
        }
    })
}

const clickUnfollow = () =>{
    unfollowUser(match.params.userId, user._id)
    .then(res=>{
        if(res.error){
            console.log(res.error)
        } else {
            console.log(res);
            SetShowFollow(true)
            getUserInfo()
            loadTweets(match.params.userId)
        }
    })
}

    useEffect(()=>{
        loadTweets(); //ID OF USER WE ARE VISITING PROFILE OF
       
    }, [])

    useEffect(()=>{
        getUserInfo()
    }, [userProfile.length])
    
    
    return (
        <>
            <Navbar />
            <div className="profile">
                <div className="container profile__container--header">
                    <div className="profile__leftSide">
                        <h3 className="profile__name">{userProfile.name}</h3>
                        <img className="profile__pic" src={userProfile.photo} />
                        <div className="profile__info">
                        <span >
                              {userProfile ? (<b> {userProfile.followers.length}  </b>) 
                            : (0)}
                            
                            <span className="profile__followers">followers</span> 
                        </span>
                         <span >
                         {userProfile ? (<b> {userProfile.following.length}  </b>) 
                            : (0)}
                            
                            <span className="profile__following">following</span>
                         </span>
                        </div>
                    </div>

                    <div className="profile__rightSide">
                        {/* <button className="btn  profile__btn--edit">Edit profile</button> */}
                        {showFollow ==false ? (
                            <button onClick={clickUnfollow} className="btn  profile__btn--follow"> Unfollow</button>
                        ) : (
                             <button onClick={clickFollow} className="btn  profile__btn--follow"> Follow</button>
                        )}
                       
                        
                    </div>
                </div>
                {
                tweets.length > 0 ? (
                tweets.map((tweet, i)=>(
                <div key={i} className="container profile__container--body">
                    <h3 className="profile__tweet--name">{tweet.name}</h3>
                     <p className="profile__tweet--body">{tweet.text}</p>
                     {tweet.photo.length>0 ? ( <div className="profile__tweet--imgdiv">
                        <img src={tweet.photo} alt="tweet pic" className="profile__tweet--img" />
                    </div>): (<div></div>)}
                   
                    <div className="profile__tweet--buttons">
                        <span className="profile__tweet--buttonspan">
                        {tweet.likes.includes(user._id) ? ( 
                                    <button onClick={() => clickUnlike(tweet._id)} className="btn home__post--btnunlike"><i class="fas fa-heart"></i></button>
                            ) : (<button onClick={() => clickLike(tweet._id)} className="btn home__post--btnlike"><i class="far fa-heart"></i></button>)}
                                
                                {tweet.likes.length}
                        </span>
                        <span className="profile__tweet--buttonspan">
                          <button className="btn home__post--btncomment"><i class="far fa-comment"></i></button>
                                {tweet.reply.length}
                        </span> 
                    </div>

                    <form className="home__post--comment input-group" onSubmit={(e) => {
                                e.preventDefault()
                                addComment(e.target[0].value, tweet._id)
                            }}>
                                <input classname="form-control" type="text" placeholder="add a comment" /> 
                                <button className="btn btn-outline-secondary" type ="submit">submit</button>
                            </form>

                            <div className="home__post--showcomments">
                                <hr/>
                                 <p style={{fontSize:".9rem",fontStyle:"italic"}}>All comments</p>
                                 <hr/>
                                <ul className="home__post--commentlist">
                                    <li className="home__post--commentitems">
                                    {tweet.reply.map((reply, i)=>(
                                <li className="home__post--commentitems">              
                                        <b style={{fontStyle:"italic"}}>{reply.postedBy.name} </b> :  {reply.text}
                                </li>
                                ))}
                                    </li>
                                </ul>
                            </div>
                </div>
                ))
                ) : (<div className="noTweet">
                        <p className="noTweet__text">No tweets yet</p> 
                    </div>)
                }   
                
            </div>
        </>
    )
}

export default Profile;