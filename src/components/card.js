import React, { useContext, useState } from "react";
import { CardContext, cardContexts } from "../lib/cards";

const Card = props => {
	const cardContext = useContext(CardContext);
	const [hover, setHover] = useState(false);

	// const cardImage =
	// 	cardContext === cardContexts.PILE || cardContext === cardContexts.PLAYER
	// 		? props.card.image
	// 		: "/assets/cards/red_back.png";

	const cardImage =
		cardContext === cardContexts.PILE ||
		cardContext === cardContexts.PLAYER ||
		cardContext === cardContexts.OPPONENT
			? props.card.image
			: "/assets/cards/red_back.png";

	const hoverClass =
		hover &&
		(cardContext === cardContexts.PLAYER || cardContext === cardContexts.DECK)
			? "hover"
			: "";

	const renderSelectedMask = () => {
		if (props.selected && props.selectedNumber) {
			return <div className="selected-mask">{props.selectedNumber}</div>;
		}
		return null;
	};

	return (
		<div
			className={`card-container`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={props.onClick}
		>
			{renderSelectedMask()}
			<img src={cardImage} alt="card" className={`card ${hoverClass}`} />
		</div>
	);
};

export default Card;
