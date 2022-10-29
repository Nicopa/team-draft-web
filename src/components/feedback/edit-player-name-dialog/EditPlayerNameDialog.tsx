import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { PlayerData } from "../../display/player-view/PlayerView";

type EditPlayerNameDialogProps = {
	open: boolean;
	editPlayer: PlayerData | null;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
	onSubmit?: (name: string) => void;
};
export const EditPlayerNameDialog = ({
	open,
	editPlayer,
	onClose,
	onSubmit,
}: EditPlayerNameDialogProps) => {
	const [value, setValue] = useState<string>(editPlayer ? editPlayer.name : "");
	const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	) => {
		if (onSubmit) onSubmit(value);
		setValue("");
		if (onClose) onClose(event);
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Edit player's name</DialogTitle>
			<DialogContent>
				<TextField
					id="player-name"
					label="Player name"
					placeholder={"Player name"}
					value={value}
					onChange={(event) => setValue(event.target.value)}
					fullWidth
					margin="normal"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleOnSubmit}>Change</Button>
			</DialogActions>
		</Dialog>
	);
};
