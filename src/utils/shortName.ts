export const shortName = (text: string): string => {
	if (text.length > 10) {
		if (text.charAt(10) === " " && text.charAt(11) !== " ")
			return text.substring(0, 11) + text.charAt(11) + ".";
		return text.substring(0, 11) + ".";
	}
	return text;
};
