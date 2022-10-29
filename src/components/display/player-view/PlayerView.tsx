import { Delete, Edit, MoreVert, PersonAddAlt1 } from "@mui/icons-material";
import {
	Stack,
	Typography,
	Rating,
	Box,
	Popover,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	IconButton,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import useResponsive from "../../../hooks/useResponsive";
import { shortName } from "../../../utils/shortName";
import { AddSubstituteDialog } from "../../feedback/add-substitute-dialog/AddSubstituteDialog";
import { EditPlayerNameDialog } from "../../feedback/edit-player-name-dialog/EditPlayerNameDialog";
import {
	StyledNameBox,
	StyledPlayerNumber,
	StyledRoot,
} from "./PlayerView.styles";

export type PlayerStatus = "listed" | "out" | "summoned";
export interface PlayerData {
	name: string;
	rating?: number | null;
	status?: PlayerStatus;
	substitute?: PlayerData;
}
export type PlayerViewProps = {
	index: number;
	player: PlayerData;
	playerNumber?: number;
	showRating?: boolean;
	isSubstitute?: boolean;
	onChange?: (index: number, player: PlayerData) => void;
	onDelete?: (index: number) => void;
};
export const PlayerView = ({
	index,
	player,
	playerNumber,
	showRating,
	isSubstitute,
	onChange,
	onDelete,
}: PlayerViewProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [openAddSubstituteDialog, setOpenAddSubstituteDialog] =
		useState<boolean>(false);
	const [openEditPlayerNameDialog, setOpenEditPlayerNameDialog] =
		useState<boolean>(false);
	const isDesktop = useResponsive("up", "md");
	const handleOpenPopoverClick = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		setAnchorEl(event.currentTarget);
	};
	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const handlePlayerNameClick: React.MouseEventHandler<HTMLDivElement> = () => {
		if (player.status !== "summoned" && !isSubstitute && onChange)
			onChange(index, {
				...player,
				status: player.status === "listed" ? "out" : "listed",
			});
	};
	const handleRatingChange = (
		event: SyntheticEvent<Element, Event>,
		value: number | null,
	) => {
		if (onChange)
			onChange(index, {
				...player,
				rating: value,
			});
	};
	const handleOnEditPlayerNameClick = () => {
		setOpenEditPlayerNameDialog(true);
		setAnchorEl(null);
	};
	const handleOnPlayerNameChange = (name: string) => {
		if (onChange)
			onChange(index, {
				...player,
				name,
			});
	};
	const handleAddSubstituteClick = () => {
		setOpenAddSubstituteDialog(true);
		setAnchorEl(null);
	};
	const handleOnAddSubtituteSubmit = (substituteName: string) => {
		if (onChange)
			onChange(index, {
				...player,
				status: "out",
				substitute: {
					name: substituteName,
				},
			});
	};
	const handleDeleteClick = () => {
		if (onDelete) onDelete(index);
		setAnchorEl(null);
	};
	const openPopover = Boolean(anchorEl);
	return (
		<>
			<StyledRoot
				sx={{
					opacity: player.status === "out" ? 0.6 : 1,
					marginTop: player.substitute ? 1 : 0,
				}}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					{playerNumber && (
						<StyledPlayerNumber>
							<Typography variant="subtitle1" component="span">
								{playerNumber}
							</Typography>
						</StyledPlayerNumber>
					)}
					<StyledNameBox onClick={handlePlayerNameClick}>
						<Typography
							variant="subtitle1"
							component="span"
							sx={{
								textDecoration:
									player.status === "out" ? "line-through" : "none",
							}}
						>
							{isDesktop || !showRating ? player.name : shortName(player.name)}
						</Typography>
					</StyledNameBox>
					<Box sx={{ textAlign: "right" }}>
						{showRating && (
							<Rating
								value={player.rating || null}
								size="small"
								readOnly={player.status === "summoned"}
								onChange={handleRatingChange}
							/>
						)}
					</Box>
					<IconButton
						aria-describedby={openPopover ? "simple-popover" : undefined}
						onClick={handleOpenPopoverClick}
						sx={{ minWidth: 0 }}
					>
						<MoreVert />
					</IconButton>
					<Popover
						id={openPopover ? "simple-popover" : undefined}
						open={openPopover}
						anchorEl={anchorEl}
						onClose={handlePopoverClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<List>
							<ListItem disablePadding>
								<ListItemButton onClick={handleOnEditPlayerNameClick}>
									<ListItemIcon>
										<Edit />
									</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{
											variant: "body2",
										}}
									>
										Edit name
									</ListItemText>
								</ListItemButton>
							</ListItem>
							{!isSubstitute && (
								<ListItem disablePadding>
									<ListItemButton onClick={handleAddSubstituteClick}>
										<ListItemIcon>
											<PersonAddAlt1 />
										</ListItemIcon>
										<ListItemText
											primaryTypographyProps={{
												variant: "body2",
											}}
										>
											Add substitute for this player
										</ListItemText>
									</ListItemButton>
								</ListItem>
							)}
							<ListItem disablePadding>
								<ListItemButton onClick={handleDeleteClick}>
									<ListItemIcon>
										<Delete />
									</ListItemIcon>
									<ListItemText
										primaryTypographyProps={{
											variant: "body2",
										}}
									>
										Delete from the list
									</ListItemText>
								</ListItemButton>
							</ListItem>
						</List>
					</Popover>
				</Stack>
				{openAddSubstituteDialog && !isSubstitute && (
					<AddSubstituteDialog
						open={openAddSubstituteDialog}
						editPlayer={player}
						onSubmit={handleOnAddSubtituteSubmit}
						onClose={() => setOpenAddSubstituteDialog(false)}
					/>
				)}
				{openEditPlayerNameDialog && (
					<EditPlayerNameDialog
						open={openEditPlayerNameDialog}
						editPlayer={player}
						onSubmit={handleOnPlayerNameChange}
						onClose={() => setOpenEditPlayerNameDialog(false)}
					/>
				)}
			</StyledRoot>
			{player.substitute && (
				<PlayerView
					index={index}
					player={player.substitute}
					playerNumber={playerNumber}
					showRating={showRating}
					onChange={(index, substitute) =>
						onChange ? onChange(index, { ...player, substitute }) : {}
					}
					onDelete={(index) => (onDelete ? onDelete(index) : {})}
				/>
			)}
		</>
	);
};
