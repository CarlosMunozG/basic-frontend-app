import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import firebase from "firebase";

import AuthProvider from './context/AuthContext.js';

import Navbar from './components/Navbar.js';
import PrivateRoute from './components/routes/PrivateRoute.js';
import AnonRoute from './components/routes/AnonRoute.js';

import Home from './pages/Home.js';
import NotFound from './pages/NotFound.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Main from './pages/private/Main.js';
import Settings from './pages/private/Settings.js';
import Profile from './pages/private/Profile.js';
import ProfileEdit from './pages/private/ProfileEdit.js';
import MyPlaces from './pages/private/MyPlaces.js';
import MyOpinions from './pages/private/MyOpinions.js';
import Places from './pages/private/Places.js';
import Place from './pages/private/Place.js';
import Opinion from './pages/private/Opinion.js';
import OpinionEdit from './pages/private/OpinionEdit.js';
import PlacesList from './pages/private/PlacesList.js';
import AddPlace from './pages/private/AddPlace.js';
import PlaceEdit from './pages/private/PlaceEdit.js';
import SearchPlaces from './pages/private/SearchPlaces.js';
import Owner from './pages/private/Owner.js';
import Favourites from './pages/private/Favourites.js';
import MyFavouritePlaces from './pages/private/MyFavouritePlaces.js';
import MyFavouritePlacesMap from './pages/private/MyFavouritePlacesMap.js';
import UserList from './pages/private/UserList.js';
import User from './pages/private/User.js';
import MyFavouriteFriends from './pages/private/MyFavouriteFriends.js';
import UserFriends from './pages/private/UserFriends.js';
import UserPlaces from './pages/private/UserPlaces.js';

import './App.css';

 
const config = {
  apiKey: "AIzaSyBDHKkhIfUvbj86gaIQKnLrOD5eD8xa-w4",
  authDomain: "dogjoy-e8a5d.firebaseapp.com",
  storageBucket: "gs://dogjoy-e8a5d.appspot.com"
};
firebase.initializeApp(config);



class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <div className="container">
            <Navbar />
            <Switch>
              <AnonRoute path="/" exact component={Home} />
              <AnonRoute path="/signup" exact component={Signup} />
              <AnonRoute path="/login" exact component={Login} />
              <PrivateRoute path="/main" exact component={Main} />
              <PrivateRoute path="/search-places" exact component={SearchPlaces} />
              <PrivateRoute path="/settings" exact component={Settings} />
              <PrivateRoute path="/settings/profile" exact component={Profile} />
              <PrivateRoute path="/settings/profile/edit" exact component={ProfileEdit} />
              <PrivateRoute path="/settings/my-places" exact component={MyPlaces} />
              <PrivateRoute path="/settings/my-opinions" exact component={MyOpinions} />
              <PrivateRoute path="/places" exact component={Places} />
              <PrivateRoute path="/places-list" exact component={PlacesList} />
              <PrivateRoute path="/places/add" exact component={AddPlace} />
              <PrivateRoute path="/places/:id" exact component={Place} />
              <PrivateRoute path="/places/:id/edit" exact component={PlaceEdit} />
              <PrivateRoute path="/places/:id/opinion" exact component={Opinion} />
              <PrivateRoute path="/places/:id/opinion/:opinionId/update" exact component={OpinionEdit} />
              <PrivateRoute path="/places/owner/:id" exact component={Owner} />
              <PrivateRoute path="/favourites" exact component={Favourites} />
              <PrivateRoute path="/favourites/places" exact component={MyFavouritePlaces} />
              <PrivateRoute path="/favourites/places/map" exact component={MyFavouritePlacesMap} />
              <PrivateRoute path="/users" exact component={UserList} />
              <PrivateRoute path="/users/my-friends" exact component={MyFavouriteFriends} />
              <PrivateRoute path="/users/:id" exact component={User} />
              <PrivateRoute path="/users/:id/friends" exact component={UserFriends} />
              <PrivateRoute path="/users/:id/places" exact component={UserPlaces} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
