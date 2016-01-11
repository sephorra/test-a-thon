/*
	Fish
	<Fish />
*/
import React from 'react';
import autoBind from 'autobind-decorator';

@autoBind
class Players extends React.Component {


	render() {
		var details = this.props.details;
		return (
			<li>
				<h3>{details.firstname}{details.nickname}{details.lastname}</h3>

				<p>{details.points}</p>
				<img src={details.image} alt=""/>
			</li>
		)
	}
}

export default Players;