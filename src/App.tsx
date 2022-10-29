import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllPlayers } from "./components/layout/all-players/AllPlayers";
import { Page } from "./components/layout/page/Page";
import { Teams } from "./components/layout/teams/Teams";
import { usePlayerList } from "./hooks/usePlayerList";
import { useTeamBuilding } from "./hooks/useTeamBuilding";

function App() {
	const playerList = usePlayerList();
	const playersPerTeamState = useState<number>(
		playerList.players && playerList.players.length > 1
			? Math.round(playerList.players.length / 2)
			: 1,
	);
	const { isBuilding, buildTeams, teams, method, setMethod } =
		useTeamBuilding();
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Page />}>
					<Route
						path="/"
						element={
							<AllPlayers
								playerList={playerList}
								playersPerTeamState={playersPerTeamState}
								onDraft={buildTeams}
								method={method}
								setMethod={setMethod}
							/>
						}
					/>
					<Route
						path="/teams"
						element={
							<Teams
								teams={teams}
								onDraft={() =>
									buildTeams(playerList.players || [], playersPerTeamState[0])
								}
								method={method}
								setMethod={setMethod}
							/>
						}
					/>
				</Route>
			</Routes>
			{isBuilding && (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={isBuilding}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
		</BrowserRouter>
	);
}

export default App;
