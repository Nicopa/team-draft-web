export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	viewport: {
		viewports: {
			mobile1: {
				name: "Small mobile",
				styles: {
					height: "568px",
					width: "320px",
				},
				type: "mobile",
			},
			mobile2: {
				name: "Large mobile",
				styles: {
					height: "896px",
					width: "414px",
				},
				type: "mobile",
			},
			tablet: {
				name: "Tablet",
				styles: {
					height: "1112px",
					width: "834px",
				},
				type: "tablet",
			},
			desktop: {
				name: "Desktop",
				styles: {
					height: "657px",
					width: "1360px",
				},
			},
		},
		defaultViewport: "mobile1",
	},
	layout: "fullscreen",
};
