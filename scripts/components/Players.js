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
			<li className="list-of-players__player">
				<img src={details.image} className="list-of-players__image" alt=" " />
				<div className="list-of-players__name">
					<h3>{details.firstname} {details.lastname}</h3>
					<h4>&ldquo;{details.nickname}&rdquo;</h4>
				</div>
				<p className="list-of-players__points">{details.points}</p>
			</li>
		)
	}
}

export default Players;