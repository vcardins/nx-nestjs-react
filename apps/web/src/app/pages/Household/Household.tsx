import React, { memo, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable camelcase */
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import { ic_send } from 'react-icons-kit/md/ic_send';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
/* eslint-enable camelcase */

import {
	Page,
	Form,
	TextInput,
	FieldGroup,
	Submit,
	useForm,
	Button,
	Icon,
	InlineEdit,
} from '@xapp/react/core';

import { useStore } from '@xapp/state';

import { validationSchema } from './schema';
import { HouseholdList, HouseholdItem, HouseholdIcon } from './components';
import { HouseholdInput } from '@xapp/shared/types';

const initialValues: HouseholdInput = { name: '' };

const HouseholdPage = memo(() => {
	const formRef = useRef({ valid: false });
	const { items, read, save, remove, error } = useStore((state) => state.household);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<HouseholdInput>({
		initialValues,
		onSubmit: save,
	});

	useEffect(() => {
		read();
	}, [read]);

	if (error) {
		toast.error(error.message);
	}

	return (
		<Page title="Household" padded>
			<Form
				ref={formRef}
				data={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				schema={validationSchema}
			>
				<TextInput
					type="text"
					label="Name"
					name="name"
					autoComplete="true"
					value={formData.name}
					error={errors?.['name']}
				/>
				<FieldGroup sided>
					<Submit loading={submitting} success={success}>
						<Icon icon={ic_send} />
					</Submit>
					<Button onClick={() => read()}>
						<Icon icon={ic_refresh} />
					</Button>
				</FieldGroup>
			</Form>
			<HouseholdList>
				{items.map((household) => {
					const { id, name } = household;

					return (
						<HouseholdItem key={id}>
							<InlineEdit text={name} onSetText={(name) => save({ ...household, name }, id)} />
							<HouseholdIcon icon={ic_delete} onClick={() => remove(id)} />
						</HouseholdItem>
					);
				})}
			</HouseholdList>
		</Page>
	);
});

export default HouseholdPage;
