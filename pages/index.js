import React from 'react'
import Layout from '../components/Layout'
import FruitList from '../components/fruits'
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDBI1ii3abJ6-RIX5ZTzAHtXuTQ9NglAVE",
  authDomain: "cromlu-auth.firebaseapp.com",
  databaseURL: "https://cromlu-auth.firebaseio.com",
  projectId: "cromlu-auth",
  storageBucket: "",
  messagingSenderId: "349796700184"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/** 
 * Firebase-Login Google
 * */
class Index extends React.Component {
  constructor() {
    super()
    this.handleAuthGoogle = this.handleAuthGoogle.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);

    this.state = {
      user: null
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  // Event click to Google Auth
  handleAuthGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        return console.log(`${result.user.email} login`)
      })
      .catch((error) => {
        return console.log(`Error ${error.code}: ${error.message}`)
      })
  }

  // Event click to Google LogOut
  handleLogOut() {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} your are logout`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  renderLoginButton() {
    // If user is logged
    if (this.state.user) {
      return (
        <div>
          <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola { this.state.user.displayName }!</p>
          <button onClick={ this.handleLogOut }>Salir</button>
        </div>
      )
    }
    
    // If user is logout
    return (
      <button onClick={ this.handleAuthGoogle }> Login with google </button>
    )
  }

  render() {
    return(
      <div>
        Welcome!
        <div>
        { this.renderLoginButton() }
        </div>
      </div>
    )
  }
}

export default Index
