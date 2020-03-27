import React from 'react';
import Auth, { useAuth } from './useAuth';

const Login = () => {
    // just use function
    //const auth = Auth();

    //Custom hook and Context Api use
    const auth=useAuth();
    const handleSingIn=()=>{
        auth.signInWithGoogle()
        .then(res =>{
            window.location.pathname="/review"
        })
    }
    const handleSignOut=()=>{
        auth.signOut()
        .then(res =>{
            window.location.pathname="/"
        })
    }
    return (
        <div>
            <h1>join  the party</h1>
            {
                auth.user ? <button onClick={handleSignOut}>Sing Out</button> :
                <button onClick={handleSingIn}>Sign in with Google</button>
            }
        </div>
    );
};

export default Login;