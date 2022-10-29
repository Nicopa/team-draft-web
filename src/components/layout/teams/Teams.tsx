import { Shuffle } from "@mui/icons-material";
import {
	Box,
	Button,
	Checkbox,
	FormLabel,
	FormControl,
	FormControlLabel,
	FormGroup,
	Rating,
	Stack,
	Typography,
	RadioGroup,
	Radio,
	useMediaQuery,
} from "@mui/material";
import { useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { DraftMethod } from "../../../hooks/useTeamBuilding";
import { PlayerList } from "../../display/player-list/PlayerList";
import { PlayerData } from "../../display/player-view/PlayerView";
import { PageActions } from "../page-actions/PageActions";
import { useTheme } from "@mui/material/styles";
import { StyledRoot, StyledTeamStack, StyledTeamBox } from "./Teams.styles";

type TeamsProps = {
	teams: PlayerData[][];
	onDraft?: () => void;
	method: DraftMethod;
	setMethod: Dispatch<SetStateAction<DraftMethod>>;
};
export const Teams = ({ teams, onDraft, method, setMethod }: TeamsProps) => {
	const [showRating, setShowRating] = useState<boolean>(true);
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<StyledRoot direction="column">
			<PageActions>
				<Button
					variant="contained"
					onClick={onDraft}
					size="large"
					sx={{ padding: "4px 8px", minWidth: 0, m: 1.5 }}
				>
					<Shuffle />{" "}
					{!isSmallScreen && (
						<Typography sx={{ marginLeft: 0.5 }} variant="body1">
							New Draft
						</Typography>
					)}
				</Button>
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
				<FormGroup sx={{ mx: 3, alignSelf: "center" }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={showRating}
								onChange={(event) => setShowRating(event.target.checked)}
							/>
						}
						label="Show rating"
					/>
				</FormGroup>
			</PageActions>
			{!teams.length ? (
				<Box
					sx={{
						flexGrow: 1,
						display: "flex",
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h6"
						component="div"
						textAlign="center"
						marginY={2}
					>
						Add players to your list, choose how many players per team and press
						"draft".
						<br />
						<Button>
							<Link to="/">Player list</Link>
						</Button>
					</Typography>
				</Box>
			) : (
				<>
					<Box
						sx={{
							marginTop: 2,
							marginBottom: 1,
							flexGrow: 1,
							overflow: "auto",
						}}
					>
						<StyledTeamStack>
							{teams.map((team, index) => (
								<StyledTeamBox key={index}>
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center"
									>
										<Typography
											variant="h5"
											component="span"
											sx={{ marginBottom: 1 }}
										>
											Team {index + 1}
										</Typography>
										{showRating && (
											<Box component="span" sx={{ mx: 3 }}>
												<Typography
													variant="subtitle2"
													component="span"
													sx={{ verticalAlign: "text-bottom" }}
												>
													Rating avg.:
												</Typography>
												<Rating
													value={Math.round(
														team.reduce(
															(total, player) => total + (player.rating || 0),
															0,
														) / team.length,
													)}
													size="small"
													readOnly
												/>
											</Box>
										)}
									</Stack>
									<PlayerList players={team} showRating={showRating} />
								</StyledTeamBox>
							))}
						</StyledTeamStack>
					</Box>
				</>
			)}
		</StyledRoot>
	);
};
