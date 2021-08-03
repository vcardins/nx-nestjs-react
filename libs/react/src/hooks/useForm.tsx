import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { FieldValidationError } from '@xapp/shared/exceptions';

export interface IUseFormProps<TInput> {
	validationSchema?: any;
	initialValues: TInput;
	clearAfterSubmit?: boolean;
	onSubmit: (data: TInput) => Promise<any>;
}

interface IUseFormResponse<TInput> {
	submitting: boolean;
	success: boolean;
	errors?: FieldValidationError<TInput>['errors'];
	formData: TInput;
	handleSubmit: () => Promise<any>;
	handleReset: () => void;
	handleChange: (
		data: TInput,
		event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string }}
	) => void;
}

export function useForm<TInput>(props: IUseFormProps<TInput>, dependencies: string[] | number[] = []): IUseFormResponse<TInput> {
	const { validationSchema, initialValues, clearAfterSubmit = true, onSubmit } = props;
	const navigate = useNavigate();

	const [formData, setFormData] = useState<TInput>(initialValues);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<FieldValidationError<TInput>['errors']>({} as FieldValidationError<TInput>['errors']);

	const handleChange = (newData: TInput, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		if (event) {
			const { target: { name, value } } = event;
			const type = validationSchema?.properties?.[name]?.type;
			let updatedValue = null;
			if (typeof type === 'string') {
				switch (type) {
					case 'integer':
					case 'number':
						updatedValue = Number(value);
						break;
					case 'boolean':
						updatedValue = Boolean(value);
						break;
					default:
						updatedValue = value;
				}
			}
			else if (Array.isArray(type)) {
				const isNumeric = (type as string[]).some((item) => ['integer', 'number'].includes(item));
				if (isNumeric) {
					updatedValue = Number(value);
				}
			}

			setFormData({ ...newData, [name]: updatedValue });
			setSuccess(false);
		}
	};

	const handleSubmit = async () => {
		setSubmitting(true);

		try {
			const response = await onSubmit(formData);

			setSuccess(true);

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
		handleChange,
		handleSubmit,
		handleReset,
		errors,
		success,
		submitting,
	};
}
