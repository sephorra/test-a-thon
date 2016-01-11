import React from 'react';

import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import Leaderboard from './Leaderboard';
import AddPlayerForm from './AddPlayerForm';
import Players from './Players';
import autobind from 'autobind-decorator';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://test-a-thon.firebaseio.com/');


@autobind
class App extends React.Component {

	constructor() {
		super();

		this.state = {
		  player : {}
		}
	}

	componentDidMount() {
	    base.syncState('/players', {
	      context : this,
	      state : 'player'
	    });
	  }

	addPlayer(player) {
		var timestamp = (new Date()).getTime();
		// update the state object
		this.state.player['player-' + timestamp] = player;
		// set the state
		this.setState({ player : this.state.player });
	}

	removePlayer(key){
    	if(confirm("Are you sure you want to remove this player?!")) {
      		this.state.player[key] = null;
		      this.setState({
		        player : this.state.player
		    });
   		}
  	}

	renderPlayers(key){
		return <Players key={key} index={key} details={this.state.player[key]} />
  	}

	render() {

		return (
			<div>
				<h1>Test-a-Thon</h1>

				<ul className="list-of-players">
					{Object.keys(this.state.player).map(this.renderPlayers)}
				</ul>


				<Leaderboard addPlayer={this.addPlayer} removePlayer={this.removePlayer} player={this.state.player} linkState={this.linkState.bind(this)}/>

			</div>
		)
	}
}

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;