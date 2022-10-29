import { PaletteMode, PaletteOptions, ThemeOptions } from "@mui/material";

export const getPalette = (mode: PaletteMode): PaletteOptions => ({
	mode,
	...(mode === "light"
		? {
				primary: {
					main: "#3a703c",
				},
				secondary: {
					main: "#242278",
				},
				error: {
					main: "#54110F",
				},
				background: { default: "#efefef" },
		  }
		: {
				primary: {
					main: "#1b8d1f",
				},
				secondary: {
					main: "#242278",
				},
				error: {
					main: "#54110F",
				},
		  }),
});

// A custom theme for this app
const themeConfig: ThemeOptions = {
	typography: {
		h2: {
			fontSize: "2.6rem",
			fontWeight: 700,
		},
		h3: {
			fontSize: "2rem",
		},
	},
	components: {
		MuiContainer: {
			defaultProps: {
				maxWidth: "lg",
			},
		},
	},
};

export default themeConfig;
