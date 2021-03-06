import React, { useEffect, useContext, useState } from "react";
import Card from "./card";
import { CardContext, cardContexts } from "../lib/cards";
import { checkCards, makeTurn, moveCards } from "../lib/ai";

const Hand = props => {
	const cardContext = useContext(CardContext);
	const [selectedCards, setSelectedCards] = useState({});

	useEffect(() => {
		if (
			props.activeTurn &&
			!props.makingTurn &&
			cardContext === cardContexts.OPPONENT
		) {
			const handCopy = [...props.hand];
			const handsCopy = [...props.hands];
			const deckCopy = [...props.deck];

			props.setMakingTurn(true);
			const selectedCards = makeTurn(deckCopy, handCopy);

			if (!selectedCards) {
				handCopy.push(deckCopy.pop());
			} else {
				moveCards(selectedCards, deckCopy, handCopy);
			}

			setTimeout(() => {
				handsCopy[props.index] = handCopy;
				props.setHands(handsCopy);

				props.setDeck(deckCopy);
				props.turnFinished(handsCopy);
			}, 2000);
		}
	}, [props, cardContext]);

	const onCardClick = cardIndex => {
		if (props.activeTurn) {
			const selectedCardsCopy = { ...selectedCards };

			if (selectedCards[cardIndex]) {
				Object.entries(selectedCardsCopy).forEach(([key, value]) => {
					if (value.number > selectedCardsCopy[cardIndex].number) {
						delete selectedCardsCopy[key];
					}
				});
				delete selectedCardsCopy[cardIndex];
			} else {
				selectedCardsCopy[cardIndex] = props.hand[cardIndex];
				selectedCardsCopy[cardIndex].number = Object.values(
					selectedCardsCopy
				).length;
			}

			setSelectedCards(selectedCardsCopy);
		}
	};

	const onCardsSubmit = () => {
		const handCopy = [...props.hand];
		const handsCopy = [...props.hands];
		const deckCopy = [...props.deck];

		const deckIndexes = Object.entries(selectedCards)
			.sort(([key1, value1], [key2, value2]) => value1.number - value2.number)
			.map(([key, value]) => key);

		if (
			props.activeTurn &&
			cardContext === cardContexts.PLAYER &&
			checkCards(props.deck, selectedCards, deckIndexes)
		) {
			moveCards(selectedCards, deckCopy, handCopy);

			handsCopy[props.index] = handCopy;

			setSelectedCards({});

			props.setHands(handsCopy);

			props.setDeck(deckCopy);
			props.turnFinished(handsCopy);
		}
	};

	const renderCards = hand => {
		return hand.map((card, index) => (
			<Card
				key={index}
				card={card}
				onClick={() => {
					onCardClick(index);
				}}
				selected={!!selectedCards[index]}
				selectedNumber={
					!!selectedCards[index] ? selectedCards[index].number : null
				}
			/>
		));
	};

	const renderSubmitTurn = () => {
		if (cardContext === cardContexts.PLAYER) {
			return (
				<div className="submit-turn-container">
					<div onClick={onCardsSubmit} className="submit-turn">
						Submit Turn
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="hand">
			{renderCards(props.hand)}
			{renderSubmitTurn(cardContext)}
		</div>
	);
};

export default Hand;
