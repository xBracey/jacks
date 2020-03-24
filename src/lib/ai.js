export const makeTurn = (deck, hand) => {
	let cardFound = false;
	let selectedCards = {};
	const pileCard = deck[0];

	for (let index = 0; index < hand.length; index++) {
		const card = hand[index];
		if (
			card.cardNumber === pileCard.cardNumber ||
			card.suit === pileCard.suit
		) {
			selectedCards[index] = hand[index];
			cardFound = true;
			break;
		}
	}

	if (!cardFound) {
		return false;
	}

	const firstCard = Object.values(selectedCards)[0];

	for (let index = 0; index < hand.length; index++) {
		const card = hand[index];
		if (
			card.cardNumber === firstCard.cardNumber &&
			card.suit !== firstCard.suit
		) {
			selectedCards[index] = hand[index];
		}
	}

	console.log(selectedCards);

	return selectedCards;
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

export const moveCards = (selectedCards, deckCopy, handCopy) => {
	const deckIndexes = Object.entries(selectedCards)
		.sort(([key1, value1], [key2, value2]) => value1.number - value2.number)
		.map(([key, value]) => key);

	const handIndexes = Object.keys(selectedCards).sort(
		(key1, key2) => key2 - key1
	);

	deckIndexes.forEach(index => {
		deckCopy.unshift(handCopy[index]);
	});

	handIndexes.forEach(index => {
		handCopy.splice(index, 1);
	});

	return;
};
