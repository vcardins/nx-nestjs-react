import React, { memo, useContext, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';


import { Form, TextInput, FieldGroup, Submit, useForm } from '@xapp/react';
import { HouseholdMemberSignup, PageKey } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';

import { appContext } from '../../../context';
import { validationSchema } from './schema';

const initialValues: HouseholdMemberSignup = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	invitationCode: null
};

const SignUpPage = memo(() => {
	// const location = useLocation<{ verificationCode: string }>();
	const [params] = useSearchParams();
	const invitationCode = params.get('invitationCode');

	const { routes } = useContext(appContext);
	const { signUp } = useAppStore((state) => state.account);
	const { getInvitation, registerMember: signUpMember, invitation, error, store } = useAppStore((state) => state.household);
	const formRef = useRef({ valid: false });

	const { formData, handleSubmit, handleFieldChange, errors, submitting, success } = useForm<HouseholdMemberSignup>({
		initialValues,
		onSubmit: !invitationCode ? signUp : signUpMember,
	});

	useEffect(() => {
		if (invitationCode && store) {
			getInvitation(invitationCode);
		}
	}, [getInvitation, invitationCode, store]);

	useEffect(() => {
		if (invitation) {
			handleFieldChange({
				firstName: invitation?.invitee?.firstName,
				lastName: '',
				email: invitation?.invitee?.email ,
				password: '',
				confirmPassword: '',
				invitationCode,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invitation]);

	useEffect(() => {
		if (error) {
			toast.error(error)
		}
	}, [error]);

	const route = {
		signIn: routes[PageKey.SignIn],

		forgotPassword: routes[PageKey.ForgotPassword],
	};

	return (
		<Form
			ref={formRef}
			data={formData}
			disabled={submitting}
			onChange={handleFieldChange}
			onSubmit={handleSubmit}
			schema={validationSchema}
		>
			{ invitation && !invitation?.acceptedAt && (
				<div>
					<p>
						Hello <b>{invitation.invitee.firstName} {invitation.inviter.lastName}</b> has invited your to join the {invitation.household} household!<br/>
						Please, enter the information below to signup and join our community.
					</p>
				</div>
			)}
			{ invitation?.acceptedAt && (
				<div>
					<p>
						Hello <b>{invitation.invitee.firstName}</b>, this invitation has expired.
					</p>
				</div>
			)}
			<TextInput
				label="Email"
				name="email"
				disabled={!!invitation}
				value={formData.email}
				error={errors?.email}
			/>
			<TextInput
				type="password"
				label="Password"
				name="password"
				value={formData.password}
				error={errors?.password}
			/>
			<TextInput
				type="password"
				label="Confirm Password"
				name="confirmPassword"
				value={formData.confirmPassword}
				error={errors?.confirmPassword}
			/>
			<FieldGroup sided>
				<TextInput
					label="First Name"
					name="firstName"
					value={formData.firstName}
					error={errors?.firstName}
				/>
				<TextInput
					label="Last Name"
					name="lastName"
					value={formData.lastName}
					error={errors?.lastName}
				/>
			</FieldGroup>
			<TextInput
				type="hidden"
				name="invitationCode"
				value={invitationCode}
			/>
			<FieldGroup sided>
				<Submit loading={submitting} success={success} />
			</FieldGroup>
			<FieldGroup>
				<Link to={route.signIn.path?.split(':')[0]}>{route.signIn.title}</Link>
				<Link to={route.forgotPassword.path}>{route.forgotPassword.title}</Link>
			</FieldGroup>
		</Form>
	);
});

export default SignUpPage;
