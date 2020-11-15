import React, { useState, useEffect } from 'react'
import { Redirect} from 'react-router-dom';
import Navbar from './Navbar'
import {isAuthenticated, sendTweet, uploadImage} from './ApiUser'

const Tweet = ()=>{
    const { user: { _id, name, email} } = isAuthenticated();
    const [values, setValues] = useState({
        text: '',
        error: '',
        pic: '',
        url:'',
        success: false,
        loading: false,
        redirectUser: false
    })

    const{text, error, success,loading ,redirectUser,pic, url} = values;
    // const [text, setText] = useState('');

    const addText = (e) =>{
        // setText(e.target.value);
        setValues({...values, text: e.target.value})
    }

    const addPic = (e) =>{
        // console.log(e.target.files)
        setValues({...values, pic:e.target.files[0]})

    }

    const clickSubmit = (e) =>{
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "Twitter-clone")
        data.append("cloud_name", "krishnatyagi12")

        setValues({...values, error: false, loading: true});

        uploadImage(data)
        .then(res=>{
            if(res.error){
                setValues({...values, error: res.error, loading: false})
            } else{
                console.log(res)
                setValues({...values, url: res.url})
            }
        })

        // sendTweet({username: name, email:email , text:text, url:url }, _id)
        // .then(res=>{
        //     if(res.error){
        //         setValues({...values, error: res.error, loading:false})
        //     }else{
        //         console.log(res);
        //     setValues({...values, redirectUser: true});
        //     }
        // })
    }


    useEffect(()=>{
        sendTweet({username: name, email:email , text:text, url:url }, _id)
        .then(res=>{
            if(res.error){
                setValues({...values, loading:false})
            }else{
                console.log(res);
            setValues({...values, redirectUser: true});
            }
        })
    }, [url])
    const showError = ()=>(
        <div  className="alert alert-danger alert-dismissible" style={{display: error ? '':'none'}}>
            {error}
        </div>  
    )

    // const showSuccess = ()=>(
    //     <div  className="alert alert-success" style={{display: success ? '':'none'}}>
    //         Posted Successfully
    //     </div>
    // )
    const showLoading = () =>(
        loading && (
            <div className="alert alert-info">
                <h2>loading...</h2>
            </div>
        )
    )


    const redirectUserToHome = () =>{
        if(redirectUser){   
              return <Redirect to = "/home"/>
        }
    }

    return(
    <>
            <Navbar />
            <div className="tweet">
                <div className="tweet__notification">
                {showError()}
                {showLoading()}
                </div>
                <div className="container tweet__container">
                    <div className="tweet__username">
                        {name}
                    </div>

                    <div className="tweet__body">
                    <textarea onChange={addText} class="form-control tweet__text" placeholder="What's happening?" rows="5"></textarea>

                    </div>
                    <div className="tweet__footer">
                        <label className="btn btn__file">
                            <input onChange={addPic} type="file"/>
                        </label>
                        
                        <button onClick={clickSubmit} className="btn btn__tweet">Tweet</button>
                    </div>
                </div>
            </div>
            {redirectUserToHome()}
    </>
    )
}

export default Tweet;

