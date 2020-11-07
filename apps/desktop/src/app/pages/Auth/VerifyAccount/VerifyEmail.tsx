import React, { memo, useState, useEffect } from 'react';
import { parse } from 'query-string';

import { AccountService } from '@xapp/react/auth';

const VerifyEmailPage = memo(() => {
	const [submitting, setSubmitting] = useState(false);
	const [, setSuccess] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const verifyEmail = async (key: string) => {
			try {
				const response = await AccountService.verifyEmail({ key });

				if (response.message) {
					setMessage(response.message);
				}
				setSuccess(true);
			}
			catch (response) {
				setSuccess(false);
				if (response.message) {
					setMessage(response.message);
				}
			}
			finally {
				setSubmitting(false);
			}
		};

		const {key} = parse(document.location.search) || {};

		if (key) {
			verifyEmail(key as string);
		}
	}, []);

	if (submitting) {
		return (
			<div>Verifying account ...</div>
		);
	}

	return (
		<div>{message}</div>
	);
});

export default VerifyEmailPage;
