import {
	Brightness4,
	Brightness7,
	Menu as MenuIcon,
} from "@mui/icons-material";
import {
	AppBar,
	CssBaseline,
	IconButton,
	ThemeProvider,
	Toolbar,
	Typography,
	Menu,
	MenuItem,
	Container,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { createContext, MouseEvent, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import themeConfig, { getPalette } from "../../../theme";
import { PageRoot, StyledMenuLink } from "./Page.styles";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const Page = () => {
	const [mode, setMode] = useState<"light" | "dark">(
		window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light",
	);
	const [anchorMenu, setAnchorMenu] = useState<HTMLElement | null>(null);
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () =>
				setMode((prevMode: "light" | "dark") =>
					prevMode === "light" ? "dark" : "light",
				),
		}),
		[],
	);
	const theme = useMemo(
		() =>
			createTheme({
				...themeConfig,
				palette: getPalette(mode),
			}),
		[mode],
	);
	const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorMenu(event.currentTarget);
	};
	const handleMenuClose = () => setAnchorMenu(null);
	const openMenu = Boolean(anchorMenu);
	const { pathname } = useLocation();
	const getPageTitle = (): string => {
		const titles: { [key: string]: string } = {
			"/": "Player List",
			"/teams": "Teams",
		};
		if (!(pathname in titles)) return "";
		return titles[pathname];
	};
	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<PageRoot>
						<AppBar position="static" enableColorOnDark>
							<Toolbar>
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="menu"
									sx={{ mr: 2 }}
									aria-controls={openMenu ? "basic-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={openMenu ? "true" : undefined}
									onClick={handleMenuClick}
								>
									<MenuIcon />
								</IconButton>
								<Menu
									anchorEl={anchorMenu}
									open={openMenu}
									onClose={handleMenuClose}
								>
									<MenuItem>
										<StyledMenuLink to="/" onClick={handleMenuClose}>
											Player list
										</StyledMenuLink>
									</MenuItem>
									<MenuItem>
										<StyledMenuLink to="/teams" onClick={handleMenuClose}>
											Teams
										</StyledMenuLink>
									</MenuItem>
								</Menu>
								<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
									{getPageTitle()}
								</Typography>
								<IconButton
									sx={{ ml: 1 }}
									onClick={colorMode.toggleColorMode}
									color="inherit"
								>
									{mode === "dark" ? <Brightness7 /> : <Brightness4 />}
								</IconButton>
							</Toolbar>
						</AppBar>
						<Container sx={{ height: "calc(100vh - 64px)" }}>
							<Outlet />
						</Container>
					</PageRoot>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	);
};
