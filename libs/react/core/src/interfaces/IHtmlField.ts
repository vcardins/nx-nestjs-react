type AutoComplete = 'true' | 'false';

export interface IHtmlField {
	/* The unique field name */
	name: string;
	/* The unique field id */
	id?: string;
	/* The field value */
	value?: string | number | boolean;
	/* The field label */
	label: string;
	/* The field label */
	disabled?: boolean;
	/* The field label */
	placeholder?: string;
	/* The field label */
	autoComplete?: AutoComplete;
	/* Sets whether the field should be build without the styling wrapper */
	plain?: boolean;
	/* Sets whether the field should be build without the styling wrapper */
	sided?: boolean;

	error?: string | string[];
}
