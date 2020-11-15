import {API} from '../config'

export const signup = (user) =>{
    return fetch(`${API}/signup`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        console.log(res);
        return res.json();
    })
    .catch(err=>{
        console.log(err); 
    })
}


export const signin = (user) =>{
    return fetch(`${API}/signin`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        console.log(res);
        return res.json();
    })
    .catch(err=>{
        console.log(err); 
    })
}

export const signout = (next) =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem('jwt');
        next();
    

    return fetch(`${API}/signout`,{
        method: "GET",
    })
    .then(res =>{
        console.log('signout', res)
    })
    .catch(err=>console.log(err))
}
}

export const authenticate =(data, next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false;
    }

    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }

    else{
        return false;
    }
}

export const sendTweet = (tweetbody, userId) =>{
    return fetch(`${API}/tweet/${userId}`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tweetbody)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getTweets = () =>{
    return fetch(`${API}/gettweets`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const uploadImage = (data) =>{
    return fetch('https://api.cloudinary.com/v1_1/krishnatyagi12/image/upload', {
        method: 'POST',
        body:data
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>console.log(err))
}

export const uploadProfilePic = (img, userId) =>{
   return fetch(`${API}/updateprofilepic`, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({img, userId})
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getUserTweets = (userId) =>{
    return fetch(`${API}/gettweets/by/${userId}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        console.log(res)
        return res.json();
        
    })
    .catch(err=>{
        console.log(err);
    })
}

export const followUser = (followedUser, followingUser) =>{
    return fetch(`${API}/follow`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            followedUser, followingUser
        })
    }).then(res=>{
        console.log(res)
        // localStorage.getItem
        return res.json();
    })
}

export const unfollowUser = (unfollowedUser, unfollowingUser) =>{
    return fetch(`${API}/unfollow`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({unfollowedUser, unfollowingUser })
    }).then(res=>{
        return res.json();
    })
}

export const likeTweet = (tweetId, userId) =>{
    return fetch(`${API}/like`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({tweetId, userId})
    }).then(res=>{
        return res.json();
    })
}

export const unlikeTweet = (tweetId, userId) =>{
    return fetch(`${API}/unlike`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({tweetId, userId})
    })
    .then(res=>{
        return res.json()
})
}

export const reply = (text, tweetId, userId) =>{
    return fetch(`${API}/reply`,{
        method: "PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({text, tweetId, userId})
    })
}

export const deleteTweet = (tweetId) =>{
    return fetch(`${API}/deletetweet`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({tweetId})
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
     console.log(err)             
    })
}

export const searchUser = (name) =>{
    return fetch(`${API}/finduser`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({name})
    })
    .then(res =>{
        console.log('res in APIUser recieved')
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getUser = (userId) =>{
    return fetch(`${API}/getuser/${userId}`, {
        method: "GET",
        headers : {
            "Content-Type" : "application/json"   
        } 
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}