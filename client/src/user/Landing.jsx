import React from 'react';
import {Redirect, Link} from 'react-router-dom';

const Landing = ()=>{

const LandingPage = () =>(
    <div className="landingpage">
        <div className="row">
            <div className="col-6 colLeft">
                <div className="landingpage__left">
                    <h3 className="landingpage__left--header"><i class="fas fa-search landingpage__left--icons"></i>Follow your Interest</h3>
                    <h3 className="landingpage__left--header"><i class="fas fa-user-friends landingpage__left--icons"></i>Hear what they are talking about</h3>
                    <h3 className="landingpage__left--header"><i class="far fa-comment landingpage__left--icons"></i>Join the conversation</h3>
                </div>
            </div>
            <div className="col-6 colRight">
               <div className="landingpage__right">
                    <span><i class="fab fa-twitter landingpage__right--icon"></i></span>
                    <h2 className="landingpage__right--header">See what's happening in the world right now</h2>
                    <p className="landingpage__right--paragraph">Join Twitter Today</p>
                    <Link to="/signup" className="btn landingpage__right--btnS">Sign up</Link>
                    <Link to="signin" className="btn landingpage__right--btnL">Log in</Link>
               </div>
            </div>
        </div>
    </div>
)



return(
    LandingPage()
)

}


export default Landing;