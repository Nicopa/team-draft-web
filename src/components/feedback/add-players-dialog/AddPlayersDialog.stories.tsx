import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddPlayersDialog } from "./AddPlayersDialog";

export default {
	title: "feedback/Add Players Dialog",
	component: AddPlayersDialog,
	argTypes: {
		onSubmit: {
			action: true,
		},
	},
	args: {
		open: true,
	},
} as ComponentMeta<typeof AddPlayersDialog>;

const Template: ComponentStory<typeof AddPlayersDialog> = (args) => (
	<AddPlayersDialog {...args} />
);

export const Default = Template.bind({});
