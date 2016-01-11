
/*
	Leaderboard
	This will let us make <Leaderboard/>
*/

import React from 'react';
import AddPlayerForm from './AddPlayerForm';

import { History } from 'react-router';
import reactMixin from 'react-mixin';
import autoBind from 'autobind-decorator';

import Firebase from 'firebase';
const ref = new Firebase('https://test-a-thon.firebaseio.com/');

@autoBind
class Leaderboard extends React.Component {
constructor() {
    super();

    this.state = {
      uid : ''
    }
  }

  authenticate(provider) {
    console.log("Trying to auth with " + provider);
    ref.authWithOAuthPopup(provider, this.authHandler);
  }

  componentWillMount() {
    console.log("Checking to see if we can log them in");
    var token = localStorage.getItem('token');
    if(token) {
      ref.authWithCustomToken(token,this.authHandler);
    }
  }

  logout() {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
      uid : null
    });
  }

  authHandler(err, authData) {
	if(err) {
	  console.error(err);
	  return;
	}


    // save the login token in the browser
    localStorage.setItem('token', authData.token);

    const gameRef = ref;

    console.log(gameRef);
    ref.on("value", (snapshot) => {
    	var data = snapshot.val() || {};

    	if(!data.owner) {
	    	ref.set({
	    		owner: authData.uid
	   	 	});
   	 	}

   	 	this.setState({
   	 		uid: authData.uid,
   	 		owner: data.owner || authData.uid
   	 	});
    });
  }


    renderLogin() {
	    return (
	      <nav className="login">
	        <h2>Inventory</h2>
	        <p>Sign in to manage player scores</p>
	        <button className="github" onClick={this.authenticate.bind(this, 'github')}>Log In with Github</button>
	      </nav>
	    )
  	}


	renderPlayer(key) {
		var linkState = this.props.linkState;
		var removeButton = <button onClick={this.props.removePlayer.bind(null,key)}>&times;</button>

		return (
			<div>
				<div className="player-edit" key={key}>
					<input type="text" valueLink={linkState('player.'+ key +'.firstname')}/>
					<input type="text" valueLink={linkState('player.'+ key +'.lastname')}/>
       				<input type="text" valueLink={linkState('player.'+ key +'.nickname')}/>
       				<input type="text" valueLink={linkState('player.'+ key +'.points')}/>
				    <input type="text" valueLink={linkState('player.'+ key +'.image')}/>
				    {removeButton}

				</div>
			</div>
		)
	}

	render() {

		 // first check if they arent logged in
	    if(!this.state.uid) {
	      return (
	        <div>{this.renderLogin()}</div>
	      )
	    }

		return (
			<div>
				<h1>The Test-a-Thon</h1>

				<h2>Manage Players</h2>
				{Object.keys(this.props.player).map(this.renderPlayer)}

				<h2>Add a new player</h2>
				<AddPlayerForm {...this.props}/>

			</div>
		)
	}
};

Leaderboard.propTypes = {
    addPlayer : React.PropTypes.func.isRequired
}

export default Leaderboard;