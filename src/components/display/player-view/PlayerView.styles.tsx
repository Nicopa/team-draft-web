import { Box, BoxProps, Paper, PaperProps, styled } from "@mui/material";

export const StyledRoot = styled((args: PaperProps) => <Paper {...args} />)(
	({ theme }) => ({
		padding: "4px",
		"& + &": {
			marginTop: 1,
		},
		[theme.breakpoints.up("md")]: {
			padding: "4px 12px",
		},
	}),
);
export const StyledNameBox = styled((props: BoxProps) => <Box {...props} />)({
	padding: "4px",
	width: "100%",
	flexGrow: 1,
	cursor: "pointer",
});

export const StyledPlayerNumber = styled(Box)({
	padding: "4px 8px",
});
