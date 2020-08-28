import React from "react";

const PinyinCharacter = ({
	character,
	pinyin,
	characterSize,
	pinyinSize,
	className,
	pinyinClass,
	characterClass,
}) => {
	return (
		<div className={className} style={{ width: "max-content" }}>
			<div
				className={`font-semibold english-serif text-center ${
					pinyinClass ? pinyinClass : ""
				}`}
				style={{ fontSize: pinyinSize }}
			>
				{pinyin}
			</div>
			<div
				className={`chinese-serif ${
					characterClass ? characterClass : ""
				}`}
				style={{ fontSize: characterSize, lineHeight: characterSize }}
			>
				{character}
			</div>
		</div>
	);
};

export default PinyinCharacter;
