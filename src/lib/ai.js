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

export const checkCard = (deck, card) => {
	return deck[0].cardNumber === card.cardNumber || deck[0].suit === card.suit;
};
