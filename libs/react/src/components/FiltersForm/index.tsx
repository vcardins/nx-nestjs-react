import React, { useRef, useMemo, ReactElement } from 'react';
import styled from 'styled-components';

import { IFilterControlItem, FilterControlType, DataFilter } from '@xapp/shared/types';
import { Panel, Form, TextInput, FieldGroup, Button, Checkbox, Select, DatePicker } from '../';
import { useForm } from '../../hooks';

const StyledForm = styled(Form)`
	font-size: 90%;
`;

interface IFiltersFormProps {
	filterControls?: IFilterControlItem[];
	initialValues?: any;
	onSubmit: (data: any) => Promise<any>;
	onClearFilters: () => void;
}

export const FiltersForm = React.memo(function FiltersForm(props: IFiltersFormProps) {
	const { initialValues = {}, filterControls, onSubmit, onClearFilters } = props;
	const formRef = useRef({ valid: false });
	const form = useForm<Record<string, any>, DataFilter>({
		initialValues,
		clearAfterSubmit: false,
		onSubmit,
		onBeforeSubmit: (data: Record<string, any>) =>
			Object.keys(data).filter((key) => !!data[key]).reduce((result, key) => {
				result[key] = { value: data[key], type: filterControls.find(( control ) => control.key === key).type };
				return result;
			}, {} as DataFilter),
	});

	const fields = useMemo(() => !filterControls
		? null
		: filterControls.map((control) => {
			const { key, label, options } = control;
			const id = `filter-${key}`;
			let field: ReactElement;
			const baseProps = { id, key: id, label, name: key, value: form.data?.[key], error: form.errors[key] };

			switch (control.type) {
				case FilterControlType.Boolean:
					field = (
						<Checkbox {...baseProps} sided={true}/>
					);
					break;
				case FilterControlType.Select:
					field = (
						<Select {...baseProps} items={options}/>
					);
					break;
				case FilterControlType.Date:
					field = (
						<DatePicker {...baseProps} value={baseProps.value.toString()}/>
					);
					break;
				case FilterControlType.Number:
				case FilterControlType.Text:
					field = (
						<TextInput
							type={control.type}
							{...baseProps}
						/>
					);
					break;
				case FilterControlType.Range:
					break;
			}

			return field;
		}), [filterControls, form.data]);

	if (!fields) {
		return null;
	}

	const handleApply = async (e: React.MouseEvent) => {
		e.stopPropagation();
		await form.onSubmit();
	};

	const handleResetFilters = () => {
		form.onReset();
		onClearFilters();
	};

	return (
		<StyledForm
			ref={formRef}
			data={form.data}
			schema={false}
			onChange={form.onFieldChange}
		>
			<Panel
				tag="filters-form"
				compact={true}
				columns={2}
				footer={
					<FieldGroup sided>
						<Button onClick={handleResetFilters} role="secondary">
							Clear
						</Button>
						<Button disabled={form.submitting} onClick={handleApply}>
							Apply
						</Button>
					</FieldGroup>
				}
			>
				{ fields }
			</Panel>
		</StyledForm>
	);
});
