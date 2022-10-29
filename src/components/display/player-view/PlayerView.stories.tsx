import { PlayerView } from "./PlayerView";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
	title: "display/Player View",
	component: PlayerView,
	argTypes: {
		onChange: {
			action: "onChange",
		},
		onDelete: {
			action: "onDelete",
		},
	},
	args: {
		player: {
			name: "Cristiano Ronaldo",
		},
		showRating: true,
	},
} as ComponentMeta<typeof PlayerView>;

const Template: ComponentStory<typeof PlayerView> = (args) => (
	<PlayerView {...args} />
);

export const Listed = Template.bind({});

export const Out = Template.bind({});
Out.args = {
	player: {
		name: "Cristiano Ronaldo",
		rating: 5,
		status: "out",
	},
};

export const Substituted = Template.bind({});
Substituted.args = {
	player: {
		name: "Cristiano Ronaldo",
		rating: 5,
		status: "out",
		substitute: {
			name: "Zlatan Ibrahimović",
			rating: 5,
		},
	},
};

export const Summoned = Template.bind({});
Summoned.args = {
	player: {
		name: "Cristiano Ronaldo",
		rating: 5,
		status: "summoned",
	},
	playerNumber: 1,
};
