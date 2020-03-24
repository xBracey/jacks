export const makeTurn = (deck, hand) => {
	let cardIndex = -1;
	const pileCard = deck[0];

	for (let index = 0; index < hand.length; index++) {
		const card = hand[index];
		if (
			card.cardNumber === pileCard.cardNumber ||
			card.suit === pileCard.suit
		) {
			cardIndex = index;
			break;
		}
	}

	return cardIndex;
};

export const checkCards = (deck, cards, deckIndexes) => {
	const cardValues = Object.values(cards);
	if (!cardValues.length) {
		return false;
	} else {
		if (cardValues.some(card => card.cardNumber !== cardValues[0].cardNumber)) {
			return false;
		}

		const pileCard = deck[0];

		if (
			cards[deckIndexes[0]].cardNumber !== pileCard.cardNumber &&
			cards[deckIndexes[0]].suit !== pileCard.suit
		) {
			return false;
		}
	}

	return true;
};
