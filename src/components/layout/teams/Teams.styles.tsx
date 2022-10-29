import { StackProps, Stack, BoxProps, Box, styled } from "@mui/material";

export const StyledRoot = styled((args: StackProps) => <Stack {...args} />)({
	height: "100%",
});
export const StyledTeamStack = styled((args: StackProps) => (
	<Stack {...args} />
))(({ theme }) => ({
	gap: theme.spacing(2),
	flexDirection: "column",
	[theme.breakpoints.up("sm")]: {
		flexDirection: "row",
	},
}));
export const StyledTeamBox = styled((args: BoxProps) => <Box {...args} />)(
	({ theme }) => ({
		marginTop: 2,
		[theme.breakpoints.up("sm")]: {
			width: "50%",
		},
	}),
);
