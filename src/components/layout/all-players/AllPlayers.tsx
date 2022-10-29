import { GroupAdd, GroupRemove, Shuffle } from "@mui/icons-material";
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChangeEventHandler, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerList } from "../../../hooks/usePlayerList";
import { DraftMethod } from "../../../hooks/useTeamBuilding";
import { PlayerList } from "../../display/player-list/PlayerList";
import { PlayerData } from "../../display/player-view/PlayerView";
import { AddPlayersDialog } from "../../feedback/add-players-dialog/AddPlayersDialog";
import { RemovePlayerListDialog } from "../../feedback/remove-player-list-dialog/RemovePlayerListDialog";
import { PageActions } from "../page-actions/PageActions";
import { StyledPlayerPerTeamTextField } from "./AllPlayers.styles";

type AllPlayersProps = {
	playerList: ReturnType<typeof usePlayerList>;
	playersPerTeamState: [number, Dispatch<SetStateAction<number>>];
	onDraft: (players: PlayerData[], playersPerTeam: number) => void;
	method: DraftMethod;
	setMethod: Dispatch<SetStateAction<DraftMethod>>;
};
export const AllPlayers = ({
	playerList,
	playersPerTeamState,
	onDraft,
	method,
	setMethod,
}: AllPlayersProps) => {
	const { players, addNewPlayers, updatePlayer, removePlayer, removeList } =
		playerList;
	const [openAddPlayerDialog, setOpenAddPlayerDialog] =
		useState<boolean>(false);
	const [openRemovePlayerListDialog, setOpenRemovePlayerListDialog] =
		useState<boolean>(false);
	const [playersPerTeam, setPlayersPerTeam] = playersPerTeamState;
	const onPlayersPerTeamChange: ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const value = parseInt(event.target.value);
		setPlayersPerTeam(value < 1 ? 1 : value);
	};
	const navigate = useNavigate();
	const handleOnDraftClick: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	) => {
		if (!players || !players.length) return;
		onDraft(players, playersPerTeam || players.length / 2);
		navigate("/teams");
	};
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Stack direction="column" sx={{ height: "100%" }}>
			<PageActions onlyPaper>
				<Box>
					{players && players.length && (
						<>
							<Button
								variant="outlined"
								onClick={() => setOpenRemovePlayerListDialog(true)}
								sx={{ padding: "4px 8px", minWidth: 0, marginRight: 1.5 }}
							>
								<GroupRemove />{" "}
								{!isSmallScreen && (
									<Typography sx={{ marginLeft: 0.5 }} variant="body1">
										Remove list
									</Typography>
								)}
							</Button>
							<RemovePlayerListDialog
								open={openRemovePlayerListDialog}
								onClose={() => setOpenRemovePlayerListDialog(false)}
								onConfirm={removeList}
							/>
						</>
					)}
					<Button
						variant="outlined"
						onClick={() => setOpenAddPlayerDialog(true)}
						sx={{ padding: "4px 8px", minWidth: 0 }}
					>
						<GroupAdd />{" "}
						{!isSmallScreen && (
							<Typography sx={{ marginLeft: 0.5 }} variant="body1">
								Add players
							</Typography>
						)}
					</Button>
				</Box>
				<AddPlayersDialog
					open={openAddPlayerDialog}
					onClose={() => setOpenAddPlayerDialog(false)}
					onSubmit={addNewPlayers}
				/>
			</PageActions>
			<Box
				sx={{
					marginTop: 2,
					marginBottom: 1,
					flexGrow: 1,
					display: "flex",
					width: "100%",
					justifyContent: "center",
					overflow: "auto",
				}}
			>
				<PlayerList
					players={players ? players : []}
					showRating={true}
					onPlayerChange={updatePlayer}
					onDelete={removePlayer}
				/>
			</Box>
			<PageActions anchor="bottom">
				<StyledPlayerPerTeamTextField
					type="number"
					id="players-per-team"
					label="Players per team"
					value={playersPerTeam}
					onChange={onPlayersPerTeamChange}
					variant="standard"
					inputProps={{ sx: { textAlign: "center", maxWidth: 50 } }}
				/>
				<Box sx={{ margin: "0 12px" }}>
					<FormControl>
						<FormLabel id="draft-type-label" sx={{ fontSize: 12 }}>
							Draft type
						</FormLabel>
						<RadioGroup
							aria-labelledby="draft-type-label"
							value={method}
							onChange={(event) => setMethod(event.target.value as DraftMethod)}
							name="radio-buttons-group"
							row
						>
							<FormControlLabel
								value="RANDOM"
								control={<Radio size="small" />}
								label="Random"
							/>
							<FormControlLabel
								value="RATING"
								control={<Radio size="small" />}
								label="Rating"
							/>
						</RadioGroup>
					</FormControl>
				</Box>
				<Button
					variant="contained"
					onClick={handleOnDraftClick}
					size="large"
					sx={{ padding: "4px 8px", minWidth: 0, m: 1.5 }}
				>
					<Shuffle />{" "}
					{!isSmallScreen && (
						<Typography sx={{ marginLeft: 0.5 }} variant="body1">
							Draft
						</Typography>
					)}
				</Button>
			</PageActions>
		</Stack>
	);
};
