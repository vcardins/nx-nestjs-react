import React, { memo, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react';
import { IForgotPasswordInput } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';
import { PageKey } from '@xapp/shared/types';

import { validationSchema } from './schema';
import { useAppContext } from '../../../context';

const initialValues: IForgotPasswordInput = {
	email: '',
};

const ForgotPasswordPage = memo(() => {
	const { routes } = useAppContext();
	const formRef = useRef({ valid: false });
	const { forgotPassword } = useAppStore((state) => state.account);
	const form = useForm<IForgotPasswordInput>({ initialValues, onSubmit: forgotPassword });

	const routing = {
		signIn: routes[PageKey.SignIn],
		signUp: routes[PageKey.SignUp],
	};

	return (
		<Form ref={formRef} data={form.data} onChange={form.onFieldChange} onSubmit={form.onSubmit} schema={validationSchema}>
			<TextInput
				type="text"
				label="Email"
				name="email"
				autoComplete="true"
				value={form.data.email}
				error={form.errors?.email}
			/>
			<FieldGroup sided>
				<Submit loading={form.submitting} success={form.success} />
			</FieldGroup>
			<FieldGroup>
				<Link to={routing.signIn.path}>{routing.signIn.title}</Link>
				<Link to={routing.signUp.path}>{routing.signUp.title}</Link>
			</FieldGroup>
		</Form>
	);
});

export default ForgotPasswordPage;
