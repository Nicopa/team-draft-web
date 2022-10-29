import { ComponentMeta, ComponentStory } from "@storybook/react";
import { EditPlayerNameDialog } from "./EditPlayerNameDialog";

export default {
	title: "feedback/Edit Player Name Dialog",
	component: EditPlayerNameDialog,
	argTypes: {
		onSubmit: {
			action: true,
		},
		onClose: {
			action: true,
		},
	},
	args: {
		open: true,
		editPlayer: {
			name: "D'Alessandro",
		},
	},
} as ComponentMeta<typeof EditPlayerNameDialog>;

const Template: ComponentStory<typeof EditPlayerNameDialog> = (args) => (
	<EditPlayerNameDialog {...args} />
);

export const Default = Template.bind({});
