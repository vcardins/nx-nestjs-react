import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JSONSchema7 } from 'json-schema';

import { FieldValidationError } from '@xapp/shared/exceptions';

export interface IUseFormProps<TInput, TTransformedInput = TInput> {
	validationSchema?: JSONSchema7;
	initialValues: TInput;
	clearAfterSubmit?: boolean;
	onSubmit: (data: TTransformedInput) => Promise<any>;
	onBeforeSubmit?: (data: TInput) => TTransformedInput;
	onSuccess?: () => void;
}

interface IUseFormResponse<TInput> {
	submitting: boolean;
	success: boolean;
	errors?: FieldValidationError<TInput>['errors'];
	formData: TInput;
	handleSubmit: () => Promise<any>;
	handleReset: () => void;
	handleFieldChange: (
		data: TInput,
		event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string }}
	) => void;

	handleFormChange: (data: Partial<TInput>) => void;
}

const isBoolean = (val: string | number) => {
	const boolValuesRegex = /true|false/; // Add other /true|false|1|0|on|off/
	if (val === undefined || val === null) return false;
	return boolValuesRegex.test(val.toString().toLowerCase());
};

const isNumeric = (val: string | number) => !isNaN(+val);

export function useForm<TInput, TTransformedInput = TInput>(props: IUseFormProps<TInput, TTransformedInput>, dependencies: string[] | number[] = []): IUseFormResponse<TInput> {
	const { initialValues, clearAfterSubmit = true, onSubmit, onBeforeSubmit = (formData: TInput) => formData, onSuccess } = props;
	const navigate = useNavigate();

	const [formData, setFormData] = useState<TInput>(initialValues);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<FieldValidationError<TInput>['errors']>({} as FieldValidationError<TInput>['errors']);

	const handleFieldChange = (
		newData: TInput,
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
	) => {
		if (event) {
			const { target: { name, value } } = event;
			let updatedValue: any;

			if (value !== undefined && value !== '') {
				if (isBoolean(value)) {
					updatedValue = Boolean(value);
				}
				else if (isNumeric(value)) {
					updatedValue = Number(value);
				}
				else if (['on', 'off'].includes(value)) {
					updatedValue = value === 'on';
				}
				else {
					updatedValue = value;
				}
				setFormData({ ...newData, [name]: updatedValue });
			}
			else {
				setFormData((prevState) => ({ ...prevState, [name]: undefined }));
			}

			setSuccess(false);
		}
	};
	const handleFormChange = (newData: Partial<TInput>) => setFormData({ ...formData, ...newData });
	const handleSubmit = async () => {
		setSubmitting(true);

		try {
			const response = await onSubmit(onBeforeSubmit(formData) as TTransformedInput);

			setSuccess(true);
			onSuccess?.();

			if (response?.message) {
				toast.info(response.message);
			}

			if (response?.redirect) {
				navigate(response.redirect);
			}

			return response;
		}
		catch (e) {
			if (e?.errors) {
				setErrors(e.errors);
			}

			if (e?.message) {
				toast.error(e?.message);
			}
		}
		finally {
			setSubmitting(false);

			if (clearAfterSubmit && (errors && !Object.keys(errors).length)) {
				setFormData(initialValues);
			}
		}
	};

	useEffect(() => {
		setFormData(initialValues);

		return () => setFormData(null);
	}, dependencies);

	const handleReset = () => setFormData(initialValues);

	return {
		formData,
		handleFieldChange,
		handleFormChange,
		handleSubmit,
		handleReset,
		errors,
		success,
		submitting,
	};
}
