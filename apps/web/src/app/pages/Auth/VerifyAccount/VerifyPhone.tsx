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

	const form = useForm<IVerifyPhoneNumberInput>({
		initialValues,
		onSubmit: verifyPhoneNumber,
	});

	const formRef = useRef({ valid: false });

	return (
		<Form ref={formRef} data={form.data} onChange={form.onFieldChange} onSubmit={form.onSubmit} schema={validationSchema}>
			<TextInput
				type="text"
				label="Code"
				name="code"
				autoComplete="true"
				value={form.data.code}
				error={form.errors?.code}
			/>
			<FieldGroup sided>
				<Submit loading={form.submitting} success={form.success} loadingText="Verifying">
					Verify
				</Submit>
			</FieldGroup>
		</Form>
	);
});

export default VerifyMobilePage;
