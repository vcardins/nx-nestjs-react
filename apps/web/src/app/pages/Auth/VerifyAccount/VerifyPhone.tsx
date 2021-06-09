import React, { memo, useRef } from 'react';

import { Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react/core';
import { IVerifyPhoneNumberInput } from '@xapp/shared/types';

import { validationSchema } from './schema';
import { useStore } from '@xapp/state';

const initialValues: IVerifyPhoneNumberInput = {
	code: '',
};

const VerifyMobilePage = memo(() => {
	const { verifyPhoneNumber } = useStore((state) => state.account);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<IVerifyPhoneNumberInput>({
		initialValues,
		onSubmit: verifyPhoneNumber,
	});

	const formRef = useRef({ valid: false });

	return (
		<Form ref={formRef} data={formData} onChange={handleChange} onSubmit={handleSubmit} schema={validationSchema}>
			<TextInput
				type="text"
				label="Code"
				name="code"
				autoComplete="true"
				value={formData.code}
				error={errors?.['code']}
			/>
			<FieldGroup sided>
				<Submit loading={submitting} success={success} loadingText="Verifying">
					Verify
				</Submit>
			</FieldGroup>
		</Form>
	);
});

export default VerifyMobilePage;
