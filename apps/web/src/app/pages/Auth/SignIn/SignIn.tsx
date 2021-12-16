import React, { memo, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { FieldGroup, Form, TextInput, Button, Submit, useForm } from '@xapp/react';

import { OAuthProvider, ISignInInput, PageKey } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';

import { validationSchema } from './schema';
import { useAppContext } from '../../../context';

// import { GoogleLogo } from './logos';

const initialValues: ISignInInput = {
	email: 'demo@xapp.com',
	password: 'demo',
	// rememberMe: undefined,
};

const normalizePath = (path: string | string[]): string => (Array.isArray(path) ? path[0] : path);

const SignInPage = memo(() => {
	// const location = useLocation();
	const { routes } = useAppContext();
	const { onSignIn, getProviderUri } = useAppStore((state) => state.auth); // getOauthAccessToken
	const form = useForm<ISignInInput>({
		initialValues,
		validationSchema,
		onSubmit: onSignIn,
	});

	const formRef = useRef({ valid: false });

	// useEffect(() => {
	// 	socket.on('oauth', (data) => {
	// 		console.log(data);
	// 	});
	// }, [socket]);

	// useEffect(() => {
	// 	const init = async () => {
	// 		const { provider, code } = parse(location.search) || {};
	// 		if (code) {
	// 			await getOauthAccessToken(provider as string, code as string);
	// 			// const response =
	// 			// console.log(response);
	// 		}
	// 	};

	// 	init();
	// }, [location.search, getOauthAccessToken]);

	const route = {
		signUp: routes[PageKey.SignUp],
		resetPassword: routes[PageKey.ResetPassword],
	};

	return (
		<Form
			ref={formRef}
			data={form.data}
			onChange={form.onFieldChange}
			onSubmit={form.onSubmit}
			schema={validationSchema}
		>
			<TextInput
				label="Email"
				name="email"
				autoComplete="true"
				value={form.data.email}
				error={form.errors?.email}
			/>
			<TextInput
				type="password"
				label="Password"
				name="password"
				autoComplete="true"
				value={form.data.password}
				error={form.errors?.password}
			/>
			{/* <Checkbox
				name="remember"
				label="Remember Me"
				value={form.formData.rememberMe}
				sided
			/> */}
			<FieldGroup sided>
				<Submit loading={form.submitting} success={form.success} />
			</FieldGroup>
			<FieldGroup>
				<Link to={normalizePath(route.resetPassword.path)}>{route.resetPassword.title}</Link>
				<Link to={normalizePath(route.signUp.path)}>{route.signUp.title}</Link>
			</FieldGroup>
			<h4>Social Login</h4>
			<FieldGroup sided>
				{Object.keys(OAuthProvider).map((provider) => (
					<Button key={provider} onClick={() => handleSocialSignin(OAuthProvider[provider])}>
						{provider}
					</Button>
				))}
			</FieldGroup>
		</Form>
	);

	async function handleSocialSignin(provider: string) {
		// eslint-disable-next-line camelcase
		const { redirect_uri: url } = await getProviderUri(provider);
		document.location.href = url;
	}
});

export default SignInPage;
