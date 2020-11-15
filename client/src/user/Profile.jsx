import React from 'react';
import { useState,useEffect } from 'react';
import {getUserTweets, isAuthenticated, followUser, unfollowUser, likeTweet, reply, getUser, unlikeTweet, deleteTweet, uploadImage, uploadProfilePic} from './ApiUser';
import Navbar from './Navbar'


const Profile = ({ match }) => {
    const [tweets, setTweets] = useState([])
    const [error, setError] = useState('')
    const [userProfile, setUserProfile] = useState('');
    const [pic, setPic] = useState('')
    // const [img, setImg]= useState('')
    const {user} = isAuthenticated();
    const loadTweets = () =>{
        getUserTweets(match.params.userId)
        .then( res =>{
            if(res.error){
                console.log(res.error)
                console.log('An error occured')
                setError(res.error)
            }else{
                setTweets(res)
                console.log('no error')
                console.log(res)
            }
        })
    }

    const addPic = (file) =>{
        setPic(file)
       
    }

    useEffect(()=>{
        if(pic){
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "Twitter-clone")
            data.append("cloud_name", "krishnatyagi12")

            uploadImage(data)
            .then(res=>{
                if(res.error){
                   console.log(res.error)
                } else{
                    console.log(res)
                    // setValues({...values, url: res.url})
                    // setPic(res.url) 
                    uploadProfilePic(res.url, match.params.userId)
                    .then(res=>{
                        console.log(res) 
                        getUserInfo();
                    })
                }
            })
        }
    }, [pic])

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

    useEffect(()=>{
        loadTweets();
        // loadTweets(match.params.userId);
    }, [])
    
    useEffect(()=>{
        getUserInfo()
    }, [userProfile.length])
    
    console.log(match.params.userId)
    console.log(tweets)
    return (
        <>
            <Navbar />
            <div className="profile">
                <div className="container profile__container--header">
                    <div className="profile__leftSide">
                        <h3 className="profile__name">{user.name}</h3>
                            {console.log(user)}
                        <img className="profile__pic" src={userProfile.photo} alt="profilePic" />
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
                        {/* <label className="btn btn__file">
                            <input onChange={addPic} type="file"/>
                        </label> */}
                        <div className="btn profile__btn--edit">
                        <span>Update Picture</span>
                        <input type="file" onChange={(e)=>addPic(e.target.files[0])}/>
                    </div>

                        {/* <button onClick={clickUpload} className="btn  profile__btn--edit">Upload Profile pic</button> */}
                        {/* <input onChange={(e)=>updatePhoto(e.target.files[0])} type="file" className="btn  profile__btn--edit" /> */}
                        {/* <button className="btn  profile__btn--follow"> Follow</button> */}
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
                            <button className="btn profile__tweet--btncomment"><i class="far fa-comment"></i></button>
                            {tweet.reply.length}
                      </span>
                    </div>

                    <form className="home__post--comment input-group" onSubmit={(e) => {
                                e.preventDefault()
                                addComment(e.target[0].value, tweet._id)
                            }}>
                                <input classname="form-control" type="text" placeholder="add a comment" /> 
                                <button  className="btn btn-outline-secondary" type ="submit">submit</button>
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