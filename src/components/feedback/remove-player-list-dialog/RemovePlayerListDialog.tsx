import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import { MouseEventHandler } from "react";

type RemovePlayerListDialogProps = {
	open: boolean;
	onClose?: MouseEventHandler<HTMLButtonElement>;
	onConfirm?: MouseEventHandler<HTMLButtonElement>;
};
export const RemovePlayerListDialog = ({
	open,
	onClose,
	onConfirm,
}: RemovePlayerListDialogProps) => {
	const handleOnRemoveClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		if (onConfirm) onConfirm(event);
		if (onClose) onClose(event);
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogContent>
				<DialogContentText variant="body1">
					Are you sure you want to remove the entire list?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleOnRemoveClick}>Remove</Button>
			</DialogActions>
		</Dialog>
	);
};
