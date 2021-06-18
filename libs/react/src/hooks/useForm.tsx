import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { FieldValidationError } from '@xapp/shared/exceptions';

export interface IUseFormProps<T> {
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
	handleChange: (data: T) => void;
}

export function useForm<T>(props: IUseFormProps<T>, dependencies: string[] | number[] = []): IUseFormResponse<T> {
	const { initialValues, clearAfterSubmit = true, onSubmit } = props;
	const navigate = useNavigate();

	const [formData, setFormData] = useState<T>(initialValues);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState<FieldValidationError['errors']>(new Set());

	const handleChange = (newData: T) => {
		setFormData(newData);
		setSuccess(false);
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
			if (clearAfterSubmit && !errors) {
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
