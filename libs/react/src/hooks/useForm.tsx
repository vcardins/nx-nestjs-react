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
	data: TInput;
	onSubmit: () => Promise<any>;
	onReset: () => void;
	onFieldChange: (
		data: TInput,
		event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string }}
	) => void;

	onUpdateData: (data: TInput | Partial<TInput>, isReplace?: boolean) => void;
}

const isBoolean = (val: string | number) => {
	const boolValuesRegex = /true|false/; // Add other /true|false|1|0|on|off/
	if (val === undefined || val === null) return false;
	return boolValuesRegex.test(val.toString().toLowerCase());
};

const isNumeric = (val: string | number) => !isNaN(+val);

export function useForm<TInput, TTransformedInput = TInput>(props: IUseFormProps<TInput, TTransformedInput>, dependencies: string[] | number[] = []): IUseFormResponse<TInput> {
	const { initialValues, clearAfterSubmit = true, onSubmit, onBeforeSubmit = (data: TInput) => data, onSuccess } = props;
	const navigate = useNavigate();

	const [data, setFormData] = useState<TInput>(initialValues);
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

	const handleUpdateData = (newData: TInput | Partial<TInput>, isReplace: boolean) => {
		setFormData(isReplace ? (newData as TInput) : { ...data, ...newData });
	};

	const handleSubmit = async () => {
		setSubmitting(true);

		try {
			const response = await onSubmit(onBeforeSubmit(data) as TTransformedInput);

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
		errors,
		success,
		submitting,
		data,
		onFieldChange: handleFieldChange,
		onUpdateData: handleUpdateData,
		onSubmit: handleSubmit,
		onReset: handleReset,
	};
}
