import React, { useState } from "react";
import Board from "./components/board";
import Menu from "./components/menu";
import "./App.css";

const App = () => {
	const [players, setPlayers] = useState(null);
	const [turn, setTurn] = useState(0);
	const [winningPlayer, setWinningPlayer] = useState(null);

	const playerMessage = winningPlayer
		? `Player ${winningPlayer} has won!`
		: players
		? `Player ${turn}'s turn`
		: "Player number has not been set";

	return (
		<div className="main">
			<div className="main-container">
				<h1>Jacks, Twos and Eights</h1>
				<p>{playerMessage}</p>

				<Board
					players={players}
					turn={turn}
					setTurn={setTurn}
					setPlayers={setPlayers}
					setWinningPlayer={setWinningPlayer}
				/>
				<Menu setPlayers={setPlayers} setWinningPlayer={setWinningPlayer} />
			</div>
		</div>
	);
};

export default App;
