import React, { useState } from "react";

const Menu = props => {
	const [players, setPlayers] = useState(2);

	const playerChange = event => {
		const players = event.target.value;

		if (players > 1 && players < 6) {
			setPlayers(event.target.value);
			props.setWinningPlayer(null);
		}
	};

	const submit = event => {
		event.preventDefault();
		props.setPlayers(players);
	};

	return (
		<div className="menu">
			<form onSubmit={submit}>
				<input
					type="number"
					name="players"
					value={players}
					onChange={playerChange}
				/>
				<input type="submit" value="Create Game" />
			</form>
		</div>
	);
};

export default Menu;
