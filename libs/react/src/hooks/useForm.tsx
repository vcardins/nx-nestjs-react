import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JSONSchema7 } from 'json-schema';

import { FieldValidationError } from '@xapp/shared/exceptions';

export interface IUseFormProps<TInput> {
	validationSchema?: JSONSchema7;
	initialValues: TInput;
	clearAfterSubmit?: boolean;
	onSubmit: (data: TInput) => Promise<any>;
}

interface IUseFormResponse<TInput> {
	submitting: boolean;
	success: boolean;
	errors?: FieldValidationError<TInput>['errors'];
	formData: TInput;
	handleSubmit: (onSuccess?: () => void) => Promise<any>;
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

export function useForm<TInput>(props: IUseFormProps<TInput>, dependencies: string[] | number[] = []): IUseFormResponse<TInput> {
	const { initialValues, clearAfterSubmit = true, onSubmit } = props;
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

			if (isBoolean(value)) {
				updatedValue = Boolean(value);
			}
			else if (isNumeric(value)) {
				updatedValue = Number(value);
			}
			else {
				updatedValue = value;
			}

			setFormData({ ...newData, [name]: updatedValue });
			setSuccess(false);
		}
	};

	const handleFormChange = (newData: Partial<TInput>) => setFormData({ ...formData, ...newData });

	const handleSubmit = async (onSuccess?: () => void) => {
		setSubmitting(true);

		try {
			const response = await onSubmit(formData);

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
