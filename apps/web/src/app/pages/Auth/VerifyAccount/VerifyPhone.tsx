import React, { memo, useRef } from 'react';

import { Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react';
import { IVerifyPhoneNumberInput } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';

const initialValues: IVerifyPhoneNumberInput = {
	code: '',
};

const VerifyMobilePage = memo(() => {
	const { verifyPhoneNumber } = useAppStore((state) => state.account);

	const { formData, handleSubmit, handleFieldChange, errors, submitting, success } = useForm<IVerifyPhoneNumberInput>({
		initialValues,
		onSubmit: verifyPhoneNumber,
	});

	const formRef = useRef({ valid: false });

	return (
		<Form ref={formRef} data={formData} onChange={handleFieldChange} onSubmit={handleSubmit} schema={validationSchema}>
			<TextInput
				type="text"
				label="Code"
				name="code"
				autoComplete="true"
				value={formData.code}
				error={errors?.code}
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
