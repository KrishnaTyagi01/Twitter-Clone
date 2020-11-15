import React from 'react';
import { useState } from 'react'
import {Link,withRouter, Redirect } from 'react-router-dom';

import {signout, isAuthenticated, searchUser} from './ApiUser'

const Navbar = ({history}) => {
    const {user} = isAuthenticated();
    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');
    const [redirect, setRedirect] = useState(false)
    const Logout = ()=>{
        signout(()=>history.push('/'))
    }

    const enterUserName = (e) =>{
        console.log(e.target.value)
        setName(e.target.value);
    }

    const clickSearch = (e)=> {
        e.preventDefault()
        searchUser(name)
        .then(res =>{
            console.log('res in navbar recieved')
            if(res.error){
                console.log(res.error)
            }
            else{
                console.log(res)
                setUserID(res[0]._id);
                console.log(res[0]._id)
                setRedirect(true);
            }
        })
    }

    const redirectToUserprofile = () =>{
        if(redirect){
            return <Redirect to={`/profile/by/${userID}`}/>
        }
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to ="/" className="navbar-brand" href="#">Twitter</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/home" className="nav-link" >Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={`/profile/${user._id}`} className="nav-link" >profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/tweet" className="nav-link" >Tweet</Link>
                </li>
                {/* <li className="nav-item">
                    <Link to={`/profile/by/${user._id}`} className="nav-link" >User profile</Link>
                </li> */}
            </ul>

            <form className="form-inline my-2 my-lg-0">
                <input onChange={enterUserName} className="form-control mr-sm-2" type="search" placeholder="find user" aria-label="Search" />
                <button onClick={clickSearch} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search User</button>
            </form>
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
            <ul className="navbar-nav">
                <li className="nav-item" style={{ marginRight: "1rem" }}>
                  {isAuthenticated()&& (<Link  onClick={Logout} className="nav-link">Sign Out</Link>)}  
                </li>
            </ul>
        </div>
    </nav>
     {redirectToUserprofile()}
    </>
    )
}

export default withRouter(Navbar);