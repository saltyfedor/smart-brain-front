import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, resetState}) => {
    const signOut = () =>{
        onRouteChange('signIn' , false)
        resetState();
    }
    if(isSignedIn){
        return ( 
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => signOut()} className = 'f3 links dim black underline pa3 pointer'>Sign out</p>
            </nav>);
        }
    else{
        return ( 
            <nav style = {{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signIn')} className = 'f3 links dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className = 'f3 links dim black underline pa3 pointer'>Register</p>
            </nav>);
        }
}     


export default Navigation;