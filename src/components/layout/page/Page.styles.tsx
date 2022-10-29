import { Box, styled } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

export const PageRoot = styled(Box)(({ theme }) => ({
	height: "100vh",
	overflow: "hidden",
	backgroundColor: theme.palette.background.default,
}));
export const StyledMenuLink = styled((props: LinkProps) => <Link {...props} />)(
	({ theme }) => ({
		textDecoration: "none",
		color: theme.palette.text.primary,
	}),
);
