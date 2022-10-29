import { ReactNode, useState } from "react";
import { Box, SwipeableDrawer, IconButton } from "@mui/material";
import useResponsive from "../../../hooks/useResponsive";
import { StyledPaper, StyledAppBar, StyledToolbar } from "./PageActions.styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type PageActionsProps = {
	children: ReactNode;
	onlyPaper?: boolean;
	anchor?: "top" | "bottom";
};
export const PageActions = ({
	children,
	onlyPaper,
	anchor,
}: PageActionsProps) => {
	const isBiggerScreen = useResponsive("up", "sm");
	const [open, setOpen] = useState<boolean>(false);
	if (!isBiggerScreen && !onlyPaper)
		return (
			<StyledAppBar
				position="static"
				// sx={{ ...(anchor === "bottom" ? { bottom: 0 } : { top: 0 }) }}
			>
				<StyledToolbar>
					<IconButton onClick={() => setOpen(true)} sx={{ padding: "2px" }}>
						{anchor && anchor === "bottom" ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</StyledToolbar>
				<SwipeableDrawer
					anchor={anchor || "top"}
					open={open}
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
				>
					<Box sx={{ textAlign: "center" }}>
						<span onClick={() => setOpen(false)}>
							{anchor && anchor === "bottom" ? (
								<KeyboardArrowDownIcon />
							) : (
								<KeyboardArrowUpIcon />
							)}
						</span>
					</Box>
					{children}
				</SwipeableDrawer>
			</StyledAppBar>
		);
	return <StyledPaper>{children}</StyledPaper>;
};
