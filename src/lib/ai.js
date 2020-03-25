export const findLatestCard = selectedCards => {
	let latestCard = null;

	Object.values(selectedCards).forEach(card => {
		if (!latestCard || latestCard.cardNumber < card.cardNumber) {
			latestCard = card;
		}
	});

	return latestCard;
};

const eightMatchingRegex = /^((([1-79AJQKT])([DSCH])8\4(8[DSCH])*)|((8[DSCH]){2,}))$/g;

const createLargestSequence = (sequence, hand) => {
	let largestSequence = sequence;

	if (!hand.length) {
		return largestSequence;
	}

	for (let index = 0; index < hand.length; index++) {
		const card = hand[index];
		const newSequence = sequence + card.cardNumber + card.suit;
		if (
			!!newSequence.match(cardMatchingRegex) ||
			!!newSequence.match(eightMatchingRegex)
		) {
			const newLargestSequence = createLargestSequence(newSequence, [
				...hand.slice(0, index),
				...hand.slice(index + 1),
			]);
			if (
				newLargestSequence.length > largestSequence.length &&
				!!newLargestSequence.match(cardMatchingRegex)
			) {
				largestSequence = newLargestSequence;
			}
		}
	}

	return largestSequence;
};

const convertSequenceToSelectedCards = (sequence, hand) => {
	let sequenceCopy = sequence.slice(2);
	let cardCountNumber = 0;

	if (!sequenceCopy.length) {
		return false;
	}

	const selectedCards = {};
	let newCardSequence = "";
	let newCardIndex = 0;
	let newCard = {};

	while (sequenceCopy.length) {
		newCardSequence = sequenceCopy.slice(0, 2);
		sequenceCopy = sequenceCopy.slice(2);
		newCardIndex = hand.findIndex(
			card =>
				card.cardNumber === newCardSequence[0] &&
				card.suit === newCardSequence[1]
		);
		if (newCardIndex === -1) {
			console.log(newCardSequence);
			return false;
		}

		newCard = hand[newCardIndex];
		newCard.number = cardCountNumber;
		selectedCards[newCardIndex] = { ...newCard };
		cardCountNumber++;
	}

	return selectedCards;
};

export const makeTurn = (deck, hand) => {
	let pileCard = deck[0];

	const startSequence = pileCard.cardNumber + pileCard.suit;
	const largestSequence = createLargestSequence(startSequence, hand);

	const selectedCards = convertSequenceToSelectedCards(largestSequence, hand);

	return selectedCards;
};

export const createCardSequence = (cards, deckIndexes, pileCard) => {
	let sequence = pileCard.cardNumber + pileCard.suit;

	for (let index = 0; index < deckIndexes.length; index++) {
		const card = cards[deckIndexes[index]];
		sequence = sequence + card.cardNumber + card.suit;
	}

	return sequence;
};

const cardMatchingRegex = /^((([1-79AJQKT])([DSCH])(((\3[DSCH])+)|(([1-79AQKT])\4|(J)[DSCH])((\8|\9)[DSCH])*|8\4(([1-79AQKT])\4|(J)[DSCH])((\13|\14)[DSCH])*|8\4(8[DSCH]){0,3}8([DSCH])(([1-79AQKT])\19|(J)[DSCH])((\21|\22)[DSCH])*))|((8[DSCH])+8([DSCH])(([1-79AQKT])\27|(J)[DSCH])((\29|\30)[DSCH])*|(8([DSCH]))(([1-79AQKT])\34|(J)[DSCH])((\36|\37)[DSCH])*))$/g;

export const checkCards = (deck, cards, deckIndexes) => {
	const pileCard = deck[0];
	const sequence = createCardSequence(cards, deckIndexes, pileCard);
	return !!sequence.match(cardMatchingRegex);
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
