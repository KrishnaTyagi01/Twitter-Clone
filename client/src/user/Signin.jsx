import React from 'react';
import { useState } from 'react';
import {Link,  Redirect} from 'react-router-dom';
import {signin, authenticate} from './ApiUser'

const Signin = () => {

    const [values, setValues] = useState({
        email:'',
        password: '',
        error:'',
        loading: false,
        redirectUser: false
    })

    const { email, password, error, loading, redirectUser } = values;

    const handleChange = inputName => e =>{
        setValues({...values, [inputName]: e.target.value})
    } 

    const clickSubmit = (e) =>{
        e.preventDefault();
        setValues({...values, error: false, loading:true});

        signin({email:email, password:password})
        .then(res =>{
            if(res.error){
                console.log(error);
                setValues({...values, error: res.error, loading:false})
            }else{
                authenticate(res,()=>{
                    setValues({...values, redirectUser: true})
                } )
            }
        })
    }

    const showLoading = () =>(
        loading && (
            <div className="alert alert-info">
                <h2>loading...</h2>
            </div>
        )
    )

    const showError = ()=>(
        
        <div  className="alert alert-danger" style={{display: error ? '':'none'}}>
            {error}
        </div>  
    )

    const redirectUserToHome = () =>{
        if(redirectUser){
            return <Redirect to = "/home"/>
        }
    }

    const signinForm = () =>(
        <div className="signin">
        <div className="container c1">
            {showError()}
            {showLoading()}
        <form className="signin__form">
            <span><i class="fab fa-twitter signin__form--icon"></i></span>
            <h3 className="signin__header">Login for twitter</h3>
            <div className="form-group">
                <label className="signin__email--label" for="exampleInputEmail1">Email address</label>
                <input onChange={handleChange('email')} type="email" className="form-control signin__email" id="exampleInputEmail1" value={email} />
            </div>
            <div className="form-group">
                <label className="signin__password--label" for="exampleInputPassword1">Password</label>
                <input onChange={handleChange('password')}  type="password" className="form-control signin__password" id="exampleInputPassword1" value={password} />
            </div>
            <button onClick={clickSubmit} type="submit" className="btn btn-primary signin__form--btnSubmit ">Log in</button>
        </form>
        </div>
    </div>
  )

    return (
        <>
        {signinForm()}
        {redirectUserToHome()}
        </>
    )
}


export default Signin;