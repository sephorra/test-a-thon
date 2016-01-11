/*
	Add Player
*/
import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class AddPlayerForm extends React.Component {

	createPlayer(event) {
		//1. stop form from submitting
		event.preventDefault();
		//2. Take the data from the form and create an object
		var player = {
			lastname : this.refs.lastname.value,
			firstname : this.refs.firstname.value,
			points : this.refs.points.value,
			image : this.refs.image.value,
			nickname : this.refs.nickname.value
		}

		// //3. Add the player to the app state
		this.props.addPlayer(player);
		this.refs.playerForm.reset();
	}

	render() {
		return (
			<form className="edit-player" ref="playerForm" onSubmit={this.createPlayer}>
				<input type="text" ref="firstname" placeholder="Player First Name"/>
				<input type="text" ref="lastname" placeholder="Player Last Name"/>
				<input type="text" ref="nickname" placeholder="Player nickname" />
				<input type="text" ref="points" placeholder="Player points" />
				<input type="text" ref="image" placeholder="URL to Image" />
				<button type="submit"> Add New Player </button>
			</form>
		)
	}
};

export default AddPlayerForm;