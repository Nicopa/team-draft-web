import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddSubstituteDialog } from "./AddSubstituteDialog";

export default {
	title: "feedback/Add Substitute Dialog",
	component: AddSubstituteDialog,
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
} as ComponentMeta<typeof AddSubstituteDialog>;

const Template: ComponentStory<typeof AddSubstituteDialog> = (args) => (
	<AddSubstituteDialog {...args} />
);

export const Default = Template.bind({});
