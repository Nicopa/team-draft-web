import { styled, TextField, TextFieldProps } from "@mui/material";

export const StyledPlayerPerTeamTextField = styled((args: TextFieldProps) => (
	<TextField {...args} />
))(({ theme }) => ({
	minWidth: 110,
	margin: "0 8px 8px",
	[theme.breakpoints.up("sm")]: {
		margin: "0 0 8px",
	},
}));
