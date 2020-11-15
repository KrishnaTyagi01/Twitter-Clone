import React from 'react'
import Navbar from './Navbar'
import { isAuthenticated, getTweets, likeTweet, reply, deleteTweet, unlikeTweet } from './ApiUser';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react'
import { useEffect } from 'react'



const Home = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    // const [refresh, setRefresh] = useState(false);
    const { user } = isAuthenticated();

    const clickLike = (tweetId) => {
        likeTweet(tweetId, user._id)
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                } else {
                    // console.log(res)
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

    const ClickDelete = (tweetId) =>{
        deleteTweet(tweetId)
        .then(res=>{
            if(res.error){
                console.log(res.error)
            }
            else{
                console.log(res.message)
                // setRefresh(true);
                loadTweets();
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

    const loadTweets = () => {
        getTweets() 
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                    setError(res.error)
                } else {
                    setUsers(res)
                }
            })
    }

    useEffect(() => {
        loadTweets();

    }, [])


    return (
        <>
        <Navbar />

        <div className="home">
            {users.map((tweet, i) => (
                <div className="container home__container">

                    <div key={i} className="home__post">
                        <div className="home__post--name">
                            {console.log(tweet)}
                            <Link style={{ color: "black" }} to={`/profile/by/${tweet.postedBy._id}`}>{tweet.name} </Link>
                            {tweet.postedBy == user._id ? ( <button className="home__post--deletepost" onClick={()=>ClickDelete(tweet._id)}><i class="fas fa-trash"></i></button>) : (<div></div>)}
                            
                        
                        </div>
                        
                        <div className="home__post--text">
                            {console.log(tweet.postedBy.name)}
                            <p>{tweet.text}</p>
                        </div>
                        {tweet.photo.length > 0 ? (<div className="home__post--pic">
                            <img className="home__post--img" src={tweet.photo} alt="photo" />
                        </div>
                        ) : (<div></div>)}
                        <div className="home__post--buttons"> 
                            <span className="home__post--buttonspan"> 
                            {tweet.likes.includes(user._id) ? (
                                    <button onClick={() => clickUnlike(tweet._id)} className="btn home__post--btnunlike"><i class="fas fa-heart"></i></button>
                            ) : (<button onClick={() => clickLike(tweet._id)} className="btn home__post--btnlike"><i class="far fa-heart"></i></button>)}
                                
                                {tweet.likes.length}
                            </span>
                            <span className="home__post--buttonspan">
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
                                {tweet.reply.map((record)=>(
                                <li key={i} className="home__post--commentitems">             
                                        <b style={{fontStyle:"italic"}}>{record.postedBy.name} </b> :  {record.text}
                                </li>
                                ))}
                            </ul> 
                        </div>
                    </div>

                </div>
            ))}
        </div>

        </>
    )
}

export default Home;