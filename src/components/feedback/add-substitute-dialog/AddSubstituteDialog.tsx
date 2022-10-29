import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from "@mui/material";
import { KeyboardEventHandler, useRef, useState } from "react";
import { PlayerData } from "../../display/player-view/PlayerView";

type AddSubstituteDialogProps = {
	open: boolean;
	editPlayer: PlayerData | null;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
	onSubmit?: (substituteName: string) => void;
};
export const AddSubstituteDialog = ({
	open,
	editPlayer,
	onClose,
	onSubmit,
}: AddSubstituteDialogProps) => {
	const [value, setValue] = useState<string>("");
	const submitButton = useRef<HTMLButtonElement>(null);
	const handleOnSubmit: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	) => {
		if (onSubmit) onSubmit(value);
		setValue("");
		if (onClose) onClose(event);
	};
	const handleTextFieldKeyUp: KeyboardEventHandler<HTMLDivElement> = (
		event,
	) => {
		if (event.key === "Enter" && submitButton.current)
			submitButton.current.click();
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add substitue for: {editPlayer?.name}</DialogTitle>
			<DialogContent>
				<DialogContentText variant="body1">
					Enter the player names to be divided into the teams, separated by
					line, comma or semicolon.
				</DialogContentText>
				<TextField
					id="player-substitute-name"
					label="Player substitute name"
					placeholder={"Player name"}
					value={value}
					onChange={(event) => setValue(event.target.value)}
					fullWidth
					margin="normal"
					onKeyUp={handleTextFieldKeyUp}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleOnSubmit} ref={submitButton}>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};
