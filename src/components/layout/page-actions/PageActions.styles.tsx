import { AppBar, AppBarProps, Paper, styled, Toolbar } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
	display: "flex",
	width: "100%",
	marginTop: 2,
	marginBottom: 1,
	padding: "8px 16px",
	flexDirection: "column",
	[theme.breakpoints.up("sm")]: {
		flexDirection: "row",
	},
}));
export const StyledAppBar = styled((args: AppBarProps) => <AppBar {...args} />)(
	{},
);
export const StyledToolbar = styled(Toolbar)({
	minHeight: 32,
	justifyContent: "center",
});
