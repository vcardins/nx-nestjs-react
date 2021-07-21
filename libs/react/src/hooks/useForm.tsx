import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { FieldValidationError } from '@xapp/shared/exceptions';

export interface IUseFormProps<T> {
	validationSchema?: any;
	initialValues: T;
	clearAfterSubmit?: boolean;
	onSubmit: (data: T) => Promise<any>;
}

interface IUseFormResponse<T> {
	submitting: boolean;
	success: boolean;
	errors?: FieldValidationError['errors'];
	formData: T;
	handleSubmit: () => Promise<any>;
	handleReset: () => void;
	handleChange: (
		data: T,
		event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string; value: string }}
	) => void;
}

export function useForm<T>(props: IUseFormProps<T>, dependencies: string[] | number[] = []): IUseFormResponse<T> {
	const { validationSchema, initialValues, clearAfterSubmit = true, onSubmit } = props;
	const navigate = useNavigate();

	const [formData, setFormData] = useState<T>(initialValues);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<FieldValidationError['errors']>(new Set());

	const handleChange = (newData: T, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		if (event) {
			const { target: { name, value } } = event;
			const type = validationSchema?.properties?.[name]?.type;
			let updatedValue = null;

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

			if (clearAfterSubmit && !errors?.size) {
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
