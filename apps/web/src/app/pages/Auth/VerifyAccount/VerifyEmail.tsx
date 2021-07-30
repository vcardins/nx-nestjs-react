import React, { memo, useState, useEffect } from 'react';
import { parse } from 'query-string';

import { useAppStore } from '@xapp/state';

const VerifyEmailPage = memo(() => {
	const store = useAppStore((state) => state.account);

	const [submitting, setSubmitting] = useState(false);
	const [, setSuccess] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const handleVerifyEmail = async (key: string) => {
			try {
				await store.verifyEmail({ key });

				if (store.response.message) {
					setMessage(store.response.message);
				}
				setSuccess(true);
			} catch (response) {
				setSuccess(false);
				if (response.message) {
					setMessage(response.message);
				}
			} finally {
				setSubmitting(false);
			}
		};

		const { key } = parse(document.location.search) || {};

		if (key) {
			handleVerifyEmail(key as string);
		}
	}, [store.verifyEmail, store.response.message]);

	if (submitting) {
		return <div>Verifying account ...</div>;
	}

	return <div>{message}</div>;
});

export default VerifyEmailPage;
