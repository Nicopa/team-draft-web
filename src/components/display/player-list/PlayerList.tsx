import { PeopleOutline } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { PlayerData, PlayerView } from "../player-view/PlayerView";
import { StyledNoPlayerRoot } from "./PlayerList.styles";

export type PlayerListProps = {
	players: PlayerData[];
	showRating?: boolean;
	onPlayerChange?: (index: number, player: PlayerData) => void;
	onDelete?: (index: number) => void;
};
export const PlayerList = ({
	players,
	showRating,
	onPlayerChange,
	onDelete,
}: PlayerListProps) => {
	if (!players.length)
		return (
			<StyledNoPlayerRoot>
				<PeopleOutline sx={{ width: 32, height: 32, marginRight: 1 }} />{" "}
				<Typography variant="h5" component="span">
					No player added.
				</Typography>
			</StyledNoPlayerRoot>
		);
	return (
		<Stack direction="column" sx={{ width: "100%" }}>
			{players.map((player, index) => (
				<PlayerView
					key={index}
					index={index}
					player={player}
					playerNumber={index + 1}
					showRating={showRating}
					onChange={(index, player) =>
						onPlayerChange ? onPlayerChange(index, player) : {}
					}
					onDelete={() => (onDelete ? onDelete(index) : {})}
				/>
			))}
		</Stack>
	);
};
