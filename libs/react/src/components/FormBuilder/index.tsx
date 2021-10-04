import React, { useRef, useMemo, ReactElement } from 'react';
import styled from 'styled-components';

import { IFieldInfo, FieldType } from '@xapp/shared/types';
import { Panel, Form, TextInput, FieldGroup, Button, Checkbox, Select, DatePicker } from '../';
import { useForm } from '../../hooks';

const StyledForm = styled(Form)`
	font-size: 90%;
`;

interface IFormBuilderProps {
	id: string;
	tag: string;
	fields?: IFieldInfo[];
	clearAfterSubmit?: boolean;
	initialValues?: any;
	onSubmit: (data: any) => Promise<any>;
	onAfterReset: () => void;
}

function FormBuilderFunc<TInput, TTransformedInput>(props: IFormBuilderProps) {
	const { id, tag, clearAfterSubmit, initialValues = {}, fields, onSubmit, onAfterReset } = props;
	const formRef = useRef({ valid: false });
	const form = useForm<TInput, TTransformedInput>({
		initialValues,
		clearAfterSubmit,
		onSubmit,
		onBeforeSubmit: (data: Record<string, any>) =>
			Object.keys(data).filter((key) => !!data[key]).reduce((result, key) => {
				result[key] = { value: data[key], type: fields.find(( control ) => control.name === key).type };
				return result;
			}, {} as TTransformedInput),
	});

	const controls = useMemo(() => !fields
		? null
		: fields.map((control) => {
			const { name, label, options } = control;
			const id = `${tag}-${name}`;
			let field: ReactElement;
			const baseProps = { id, key: id, label, name, value: form.data?.[name], error: form.errors[name] };

			switch (control.type) {
				case FieldType.Boolean:
					field = (
						<Checkbox {...baseProps} sided={true}/>
					);
					break;
				case FieldType.Select:
					field = (
						<Select {...baseProps} items={options}/>
					);
					break;
				case FieldType.Date:
					field = (
						<DatePicker {...baseProps} value={baseProps.value.toString()}/>
					);
					break;
				case FieldType.Number:
				case FieldType.Text:
					field = (
						<TextInput
							type={control.type}
							{...baseProps}
						/>
					);
					break;
				case FieldType.Range:
					break;
			}

			return field;
		}), [fields, form.data]);

	if (!controls) {
		return null;
	}

	const handleSubmit = async (e: React.MouseEvent) => {
		e.stopPropagation();
		await form.onSubmit();
	};

	const handleReset = () => {
		form.onReset();
		onAfterReset();
	};

	return (
		<StyledForm
			id={id}
			ref={formRef}
			data={form.data}
			schema={false}
			onChange={form.onFieldChange}
		>
			<Panel
				tag={`${tag}-panel`}
				compact={true}
				columns={2}
				footer={
					<FieldGroup sided>
						<Button onClick={handleReset} role="secondary">
							Reset
						</Button>
						<Button disabled={form.submitting} onClick={handleSubmit}>
							Apply
						</Button>
					</FieldGroup>
				}
			>
				{ controls }
			</Panel>
		</StyledForm>
	);
}

export const FormBuilder = React.memo(FormBuilderFunc) as typeof FormBuilderFunc;
