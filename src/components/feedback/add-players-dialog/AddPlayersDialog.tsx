import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import { useState } from "react";

type AddPlayersDialogProps = {
	open: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
	onSubmit?: (value: string) => void;
};
export const AddPlayersDialog = ({
	open,
	onClose,
	onSubmit,
}: AddPlayersDialogProps) => {
	const [value, setValue] = useState<string>("");
	const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	) => {
		if (onSubmit) onSubmit(value);
		setValue("");
		if (onClose) onClose(event);
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add new players to your list</DialogTitle>
			<DialogContent>
				<DialogContentText variant="body1">
					Enter the player names to be divided into the teams, separated by
					line, comma or semicolon.
				</DialogContentText>
				<TextField
					id="player-names"
					multiline
					rows="10"
					label="Player names"
					placeholder={["Player 1", "Player 2", "Player 3..."].join("\r\n")}
					value={value}
					onChange={(event) => setValue(event.target.value)}
					fullWidth
					margin="normal"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleOnSubmit}>Add</Button>
			</DialogActions>
		</Dialog>
	);
};
