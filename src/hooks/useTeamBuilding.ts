import { useState } from "react";
import { PlayerData } from "../components/display/player-view/PlayerView";

export type DraftMethod = "RANDOM" | "RATING";
export const useTeamBuilding = () => {
	const [isBuilding, setIsBuilding] = useState<boolean>(false);
	const [teams, setTeams] = useState<PlayerData[][]>([]);
	const [method, setMethod] = useState<DraftMethod>("RANDOM");
	const getConfirmedPlayer = (player: PlayerData): PlayerData => {
		return player.substitute ? getConfirmedPlayer(player.substitute) : player;
	};
	const removeOutPlayers = (playerList: PlayerData[]): PlayerData[] => {
		return playerList.map((player) => getConfirmedPlayer(player));
	};
	const randomDraft = (
		playerList: PlayerData[],
		playersPerTeam: number,
	): PlayerData[][] => {
		const players = removeOutPlayers(playerList);
		const numberOfTeams = Math.ceil(
			players.length / (playersPerTeam || players.length / 2),
		);
		const teams: PlayerData[][] = Array(numberOfTeams);
		let playersToDraft = players;
		let teamIndex = 0;
		for (let i = 0; i < teams.length; i++) teams[i] = [];
		while (playersToDraft.length > 0) {
			const randomPlayerIndex = Math.floor(
				Math.random() * playersToDraft.length,
			);
			if (teams[teamIndex].length >= (playersPerTeam || players.length / 2))
				teamIndex++;
			teams[teamIndex].push({
				...playersToDraft[randomPlayerIndex],
				status: "summoned",
			});
			playersToDraft = playersToDraft.filter((player, index) => {
				return index !== randomPlayerIndex;
			});
		}
		return teams;
	};
	const ratingDraft = (
		playerList: PlayerData[],
		playersPerTeam: number,
	): PlayerData[][] => {
		const players = removeOutPlayers(playerList);
		const numberOfTeams = Math.ceil(
			players.length / (playersPerTeam || players.length / 2),
		);
		const teams: PlayerData[][] = Array(numberOfTeams);
		let playersToDraft = players;
		playersToDraft.sort((player1, player2) => {
			const x = player1.rating || 0;
			const y = player2.rating || 0;
			return x < y
				? -1
				: x === y
				? Math.floor(Math.random() * 2) > 0
					? 1
					: -1
				: 1;
		});
		for (let i = 0; i < teams.length; i++) teams[i] = [];
		let teamIndex = 0;
		for (const player of playersToDraft) {
			teams[teamIndex].push({
				...player,
				status: "summoned",
			});
			teamIndex++;
			if (teamIndex >= teams.length) teamIndex = 0;
		}
		return teams;
	};
	const buildTeams = (players: PlayerData[], playersPerTeam: number) => {
		if (!players.length) return;
		setIsBuilding(true);
		const teams =
			method === "RATING"
				? ratingDraft(players, playersPerTeam)
				: randomDraft(players, playersPerTeam);
		setTeams(teams);
		setIsBuilding(false);
	};

	return {
		isBuilding,
		buildTeams,
		teams,
		method,
		setMethod,
	};
};
