import React, { useState, useEffect } from "react";
import {
	createCardArray,
	shuffleCards,
	CardContext,
	cardContexts,
} from "../lib/cards";
import Hand from "./hand";
import Card from "./card";

const cardsInStarterHand = 7;

const Board = props => {
	const [deck, setDeck] = useState([]);
	const [hands, setHands] = useState([]);
	const [makingTurn, setMakingTurn] = useState(false);

	const { players, setTurn, turn } = props;

	useEffect(() => {
		const newDeck = createCardArray();

		shuffleCards(newDeck);

		const newSetOfHands = [];

		for (let hands = 0; hands < props.players; hands++) {
			const newHand = [];

			for (let cards = 0; cards < cardsInStarterHand; cards++) {
				newHand.push(newDeck.pop());
			}

			newSetOfHands.push(newHand);
		}

		setHands(newSetOfHands);
		setDeck(newDeck);
	}, [props.players]);

	const turnFinished = newHands => {
		if (newHands.some(hand => hand.length === 0)) {
			const winningPlayer = newHands.findIndex(hand => hand.length === 0);
			setHands([]);
			props.setWinningPlayer(winningPlayer);
		} else {
			const newTurn = (turn + 1) % players;

			setTurn(newTurn);
			setMakingTurn(false);
		}
	};

	const onDeckClick = () => {
		const playerIndex = props.players - 1;

		if (!makingTurn && props.turn === playerIndex) {
			const handCopy = [...hands[playerIndex]];
			const handsCopy = [...hands];
			const deckCopy = [...deck];

			handCopy.push(deckCopy.pop());

			handsCopy[playerIndex] = handCopy;
			setHands(handsCopy);

			setDeck(deckCopy);
			turnFinished(handsCopy);
		}
	};

	const renderHands = () => {
		return hands.map((hand, index) => {
			return (
				<CardContext.Provider
					key={index}
					value={
						index === hands.length - 1
							? cardContexts.PLAYER
							: cardContexts.OPPONENT
					}
				>
					<Hand
						hand={hand}
						hands={hands}
						activeTurn={index === props.turn}
						deck={deck}
						setDeck={setDeck}
						index={index}
						setHands={setHands}
						makingTurn={makingTurn}
						setMakingTurn={setMakingTurn}
						turnFinished={turnFinished}
					/>
				</CardContext.Provider>
			);
		});
	};

	const renderActiveCards = () => {
		if (!props.players) {
			return (
				<div className="active-cards">
					<Card />
					<Card />
				</div>
			);
		} else {
			const faceCard = deck[0];

			return (
				<div className="active-cards">
					<CardContext.Provider value={cardContexts.DECK}>
						<Card onClick={onDeckClick} />
					</CardContext.Provider>
					<CardContext.Provider value={cardContexts.PILE}>
						<Card card={faceCard} />
					</CardContext.Provider>
				</div>
			);
		}
	};

	return (
		<div className="board">
			{renderActiveCards()}
			{renderHands()}
		</div>
	);
};

export default Board;
