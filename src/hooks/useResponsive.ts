import { Breakpoint, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useResponsive(
	query: string,
	key: Breakpoint,
	start: Breakpoint = "xs",
	end: Breakpoint = "xl"
) {
	const theme = useTheme();

	const mediaUp = useMediaQuery(theme.breakpoints.up(key));

	const mediaDown = useMediaQuery(theme.breakpoints.down(key));

	const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

	const mediaOnly = useMediaQuery(theme.breakpoints.only(key));

	if (query === "up") return mediaUp;
	else if (query === "down") return mediaDown;
	else if (query === "between") return mediaBetween;
	else if (query === "only") return mediaOnly;
	return null;
}
