import { useState } from "react";
import { PlayerData } from "../components/display/player-view/PlayerView";

export const usePlayerList = () => {
	const loadList = () => {
		const storageItem = localStorage.getItem("player-list");
		if (!storageItem) return undefined;
		const list = JSON.parse(storageItem) as PlayerData[];
		if (!list.length) return null;
		return list;
	};
	const [players, setPlayers] = useState<PlayerData[] | null | undefined>(() =>
		loadList(),
	);
	const updateList = (newList: PlayerData[]) => {
		localStorage.setItem("player-list", JSON.stringify(newList));
		setPlayers(newList);
	};
	const removeList = () => {
		localStorage.removeItem("player-list");
		setPlayers(null);
	};
	const addNewPlayers = (text: string) => {
		if (!text.trim().length) {
			alert("You must insert at least one name to save to the list.");
			return;
		}
		const names: PlayerData[] = text
			.trim()
			.split(/[\r?\n,;]/)
			.map((name) => ({
				name: name.replace(/[^\D]+[\s]/, "").trim(),
			}));
		updateList(players ? [...players, ...names] : names);
	};
	const updatePlayer = (index: number, player: PlayerData) => {
		if (!players) return;
		const newList = players;
		newList[index] = player;
		updateList([...newList]);
	};
	const removePlayer = (index: number) => {
		if (!players) return;
		updateList(players.filter((player, i) => i !== index));
	};

	return {
		players,
		addNewPlayers,
		updatePlayer,
		removePlayer,
		removeList,
	};
};
