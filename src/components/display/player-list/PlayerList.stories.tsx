import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PlayerList } from "./PlayerList";

export default {
	title: "display/Player List",
	component: PlayerList,
} as ComponentMeta<typeof PlayerList>;

const Template: ComponentStory<typeof PlayerList> = (args) => (
	<PlayerList {...args} />
);

export const EmptyList = Template.bind({});
EmptyList.args = {
	players: [],
};

export const NewList = Template.bind({});
NewList.args = {
	players: [
		{
			name: "Ronaldinho Gaúcho",
		},
		{
			name: "Kaká",
		},
		{
			name: "Ronaldo",
		},
		{
			name: "Cafu",
		},
	],
};

export const SummonedList = Template.bind({});
SummonedList.args = {
	players: [
		{
			name: "Ronaldinho Gaúcho",
			status: "summoned",
		},
		{
			name: "Kaká",
			status: "summoned",
		},
		{
			name: "Ronaldo",
			status: "summoned",
			rating: 5,
		},
		{
			name: "Cafu",
			status: "summoned",
			rating: 4,
		},
	],
};
