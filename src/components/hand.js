import React, { useEffect, useContext } from "react";
import Card from "./card";
import { CardContext, cardContexts } from "../lib/cards";
import { checkCard, makeTurn } from "../lib/ai";

const Hand = props => {
	const cardContext = useContext(CardContext);

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
			const cardIndex = makeTurn(deckCopy, handCopy);

			if (cardIndex === -1) {
				handCopy.push(deckCopy.pop());
			} else {
				deckCopy.unshift(handCopy[cardIndex]);
				handCopy.splice(cardIndex, 1);
			}

			setTimeout(() => {
				handsCopy[props.index] = handCopy;
				props.setHands(handsCopy);

				props.setDeck(deckCopy);
				props.turnFinished();
			}, 2000);
		}
	}, [props, cardContext]);

	const onCardClick = cardIndex => {
		if (
			!props.makingTurn &&
			props.activeTurn &&
			cardContext === cardContexts.PLAYER &&
			checkCard(props.deck, props.hand[cardIndex])
		) {
			const handCopy = [...props.hand];
			const handsCopy = [...props.hands];
			const deckCopy = [...props.deck];

			deckCopy.unshift(handCopy[cardIndex]);
			handCopy.splice(cardIndex, 1);

			handsCopy[props.index] = handCopy;
			props.setHands(handsCopy);

			props.setDeck(deckCopy);
			props.turnFinished();
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
			/>
		));
	};

	return <div className="hand">{renderCards(props.hand)}</div>;
};

export default Hand;
