import React, { Component, useState } from 'react'
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom'
import { fakeAuth } from './FakeAuth'
import './styles/LogIn.css'
  
export default function Login() {
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)
    const [logInData, setLogInData] = useState({
        username: "",
        password: ""
    })

    const { state } = useLocation()

    const login = () => fakeAuth.authenticate(() => {
        setRedirectToReferrer(true)
    })

    if (redirectToReferrer === true) {
        console.log(state)
        return <Redirect to={state?.from || '/'} />
    }

    // function handleChange(e) {
    //     console.log(e)
    //     let currentName = e.target.id
    //     setLogInData({...logInData, currentName: e.target.value})
    //     console.log(logInData)
    // }

    function handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(logInData);
    }

    return (
        <div className="logIn">
            <div className="logIn__vert">
            <div className="logIn__FormWrapper">
                <h2 className="LogIn__header">Sign Up</h2>
                <form onSubmit={handleSubmit} className="FormFields">
                    <div className="FormField">
                        <input type="text" id="username" className="FormField__Input" name="username" onChange={(e) => setLogInData({...logInData, username: e.target.value})} required/>
                        <label className="FormField__Label" htmlFor="username">
                            <span className='FormField__title'>Username</span>
                        </label>
                    </div>
                    <div className="FormField">
                        <input type="password" id="password" className="FormField__Input" name="password" onChange={(e) => setLogInData({...logInData, password: e.target.value})} required/>
                        <label className="FormField__Label" htmlFor="password">
                            <span className='FormField__title'>Password</span>
                        </label>
                    </div>

                    <div className="space-filler"></div>

                    <button onClick={login}>Log In</button>
                </form>
            </div>
            </div>
        </div>
    )
}