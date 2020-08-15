import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/LinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import SignIn from './Components/SignIn/SignIn.js'
import Register from './Components/Register/Register.js'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
    }
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  resetState = () => {
    this.setState({
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
    })
}

  onInputChange = (event) => {
      this.setState({input: event.target.value})
  }

  onButtonSubmit =() =>{
        this.setState({imageUrl: this.state.input})
        fetch('https://frozen-brook-24046.herokuapp.com/imageurl',{
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
             url: this.state.input,
          })
       
      })
      .then(res => res.json())
      .then(response => {          
          if(response){
              fetch(  'https://frozen-brook-24046.herokuapp.com/image',{
                  method: 'put',
                  headers: {'Content-Type' : 'application/json'},
                  body: JSON.stringify({
                     id: this.state.user.id,
                  })
               
              })
              .then(res => res.json())
              .then(res=>{
                    this.setState(Object.assign(this.state.user,{entries: res}));
                })          
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
          
      .catch (err => console.log(err))
    }              
                

  onRouteChange = (r, login) => {
      this.setState({isSignedIn: login});
      this.setState({route: r});
      if(!login){
        this.resetState();
      }
  }
  
  render(){
  return (
    <div className= 'App'>
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
      {this.state.route === 'home' 
      ? <div>
      <Logo/>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
      : (
        this.state.route === 'signIn' 
        ? <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
        : <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>

        )
     }
      </div>
  );
  };
};
export default App;

