import React, { memo, useRef } from 'react';

import { Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react/core';
import { IVerifyPhoneNumberInput } from '@xapp/shared/interfaces';

import { validationSchema } from './schema';
import { useApp } from '../../../context';

const initialValues: IVerifyPhoneNumberInput = {
	code: '',
};

const VerifyMobilePage = memo(() => {
	const { dataContext } = useApp();
	const api = dataContext?.account;

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<IVerifyPhoneNumberInput>({
		initialValues,
		onSubmit: api.verifyPhoneNumber,
	});

	const formRef = useRef({ valid: false });

	return (
		<Form
			ref={formRef}
			data={formData}
			onChange={handleChange}
			onSubmit={handleSubmit}
			schema={validationSchema}
		>
			<TextInput
				type="text"
				label="Code"
				name="code"
				autoComplete="true"
				value={formData.code}
				error={errors?.['code']}
			/>
			<FieldGroup sided>
				<Submit
					loading={submitting}
					success={success}
					loadingText="Verifying"
				>
					Verify
				</Submit>
			</FieldGroup>
		</Form>
	);
});

export default VerifyMobilePage;
