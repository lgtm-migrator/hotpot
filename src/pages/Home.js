import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import Fuse from "fuse.js";
import words from "../assets/search_data.json";

const options = {
	includeScore: true,
	keys: ["simplified", "short_definition", "toneless_pinyin"],
};
const fuse = new Fuse(words, options);
var _ = require("lodash");
const fuzzysort = require("fuzzysort");

const Home = () => {
	let history = useHistory();

	let [searchWord, setSearchWord] = useState("");
	let [results, setResults] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		history.push(`/word?word=${searchWord}`);
	};

	const handleChange = (event) => {
		event.persist();
		setSearchWord(event.target.value);

		let debouncedFn;

		if (!debouncedFn) {
			debouncedFn = _.debounce(() => {
				let fuzzyResults = fuzzysort.go(searchWord, words, {
					keys: ["toneless_pinyin"],
					allowType: false,
				});
				console.log(fuzzyResults.length);
				fuzzyResults = fuzzyResults.sort((a, b) =>
					a.obj.rank >= b.obj.rank ? 1 : -1
				);

				setResults(fuzzyResults.slice(0, 8));
			}, 100);
		}
		debouncedFn();
	};

	if (results.length > 0) {
		console.log(results);
	}

	// general link hover style
	const linkHover = `hover:text-blue-600 dark-hover:text-orange-500`;
	return (
		<div>
			<div
				className="w-1/3 absolute mx-auto text-center border-solid border-2 border-black p-12 bg-white"
				style={{
					top: "40%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<div
					className="english-serif red font-semibold"
					style={{ fontSize: "4rem", lineHeight: "4rem" }}
				>
					huoguo
				</div>
				<div className="english-serif text-xl text-gray-600 pt-4 pb-8">
					A modern Chinese-English dictionary
				</div>
				<div>
					<form
						onSubmit={handleSubmit}
						className="chinese-serif px-6 bg-transparent outline-none w-full"
					>
						<div className="w-full relative">
							<input
								className="text-lg chinese-serif p-2 bg-transparent outline-none w-full mx-auto border-solid border-2 border-black"
								type="text"
								placeholder="Search 189,432 words"
								value={searchWord}
								onChange={handleChange}
							></input>
							{results.length > 0 && searchWord != "" && (
								<div
									className="absolute text-left bg-white border-solid border-2 border-black w-full"
									style={{ marginTop: "-4px" }}
								>
									{results.map((result, index) => {
										return (
											<Link
												to={`/word?word=${result["obj"]["simplified"]}`}
												className={linkHover}
											>
												<div className="p-2">
													{
														result["obj"][
															"simplified"
														]
													}
												</div>
											</Link>
										);
									})}
								</div>
							)}
						</div>
					</form>
				</div>
			</div>

			<div className="text-center w-full absolute bottom-0 text-gray-800 dark:text-gray-200">
				Made by{" "}
				<a
					className={`underline ${linkHover}`}
					href="https://kevinhu.io"
					target="_blank"
					rel="noopener noreferrer"
				>
					Kevin Hu
				</a>
				<br />
				<a
					className={`underline ${linkHover}`}
					href="https://github.com/kevinhu/huoguo"
					target="_blank"
					rel="noopener noreferrer"
				>
					Source
				</a>{" "}
				on GitHub
			</div>
		</div>
	);
};

export default Home;
