import React from "react";

export const createCardArray = () => {
	const cards = [];
	const suits = ["C", "D", "H", "S"];
	for (let number = 1; number < 14; number++) {
		suits.forEach(suit => {
			let cardNumber = "";

			switch (number) {
				case 1:
					cardNumber = "A";
					break;
				case 10:
					cardNumber = "T";
					break;
				case 11:
					cardNumber = "J";
					break;
				case 12:
					cardNumber = "Q";
					break;
				case 13:
					cardNumber = "K";
					break;
				default:
					cardNumber = number.toString();
					break;
			}

			cards.push({
				image: `/assets/cards/${cardNumber}${suit}.png`,
				suit,
				cardNumber,
			});
		});
	}

	return cards;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffleCards = a => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};

export const cardContexts = {
	PLAYER: "player",
	OPPONENT: "opponent",
	DECK: "deck",
	PILE: "pile",
	EMPTY: "empty",
};

export const CardContext = React.createContext(cardContexts.EMPTY);
