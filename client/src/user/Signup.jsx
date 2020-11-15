import React, { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {signup} from './ApiUser'

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name,email, password, error, success } = values;
    
    const handleChange = inputName => e =>{
        setValues({...values, [inputName]: e.target.value})
    } 
    
    const clickSubmit = e =>{
        e.preventDefault();
        setValues({...values, error: false});

        signup({name:name, email:email, password:password})
        .then(res =>{
            if(res.error){
                console.log(error);
                setValues({...values, error: res.error, success:false})
            }else{
                console.log(res);
                setValues({...values,name:'', email:'', password:'' ,success:true})
            }
        })
    }

    const showError = ()=>(
        
        <div  className="alert alert-danger" style={{display: error ? '':'none'}}>
            {error}
        </div>  
    )

    const showSuccess = ()=>(
        <div  className="alert alert-success" style={{display: success ? '':'none'}}>
            New account is created. Please <Link to="/signin">Login</Link>.
        </div>
    )

    const signupForm = ()=>(
               
        <div className="signup">
        <div className="container c1">
            {showError()}
            {showSuccess()}
        <form className="signup__form">
            <span><i className="fab fa-twitter signup__form--icon"></i></span>
            <h3 className="signup__header">Signup for twitter</h3>
            <div className="form-group">
                <label className="signup__name--label" for="exampleInputName1">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control signup__name" id="exampleInputName1" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label className="signup__email--label" for="exampleInputEmail1">Email address</label>
                <input onChange={handleChange('email')}  type="email" className="form-control signup__email" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label className="signup__password--label" for="exampleInputPassword1">Password</label>
                <input onChange= {handleChange('password')} type="password" className="form-control signup__password" id="exampleInputPassword1" />
            </div>
            <button onClick={clickSubmit} type="submit" className="btn btn-primary signup__form--btnSubmit ">Sign up</button>
        </form>
        </div>
    </div>
  
    )

    return (
        <>
            {/* {showError()}
            {showSuccess()} */}
            {signupForm()}
        </>
    )
}


export default Signup;