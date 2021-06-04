import React, { memo, useState, useEffect } from 'react';
import { parse } from 'query-string';
import { useStore } from '@xapp/state';

const VerifyEmailPage = memo(() => {
	const { verifyEmail } = useStore((state) => state.account);

	const [submitting, setSubmitting] = useState(false);
	const [, setSuccess] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const handleVerifyEmail = async (key: string) => {
			try {
				const response = await verifyEmail({ key });

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

		const { key } = parse(document.location.search) || {};

		if (key) {
			handleVerifyEmail(key as string);
		}
	}, [verifyEmail]);

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
