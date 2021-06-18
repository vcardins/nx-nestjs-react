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
} from '@xapp/react';
import { HouseholdInput } from '@xapp/shared/types';

import { useStore } from '@xapp/state';

import { validationSchema } from './schema';
import { HouseholdList, HouseholdItem, HouseholdIcon, HouseholdItemInfo, HouseholdItemInvite } from './components';

const initialValues: HouseholdInput = { name: '' };

const HouseholdPage = memo(() => {
	const formRef = useRef({ valid: false });
	const { items, store, read, save, remove, invite, error } = useStore((state) => state.household);

	const { formData, handleSubmit, handleChange, errors, submitting, success } = useForm<HouseholdInput>({
		initialValues,
		onSubmit: save,
	});

	useEffect(() => {;
		if (store){
			read();
		}
	}, [read, store]);

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
				{items.map((household) => (
					<HouseholdItem key={household.id}>
						<HouseholdItemInfo>
							<InlineEdit text={household.name} onSetText={(name) => save({ ...household, name }, household.id)} />
							<HouseholdIcon icon={ic_delete} onClick={() => remove(household.id)} />
						</HouseholdItemInfo>
						{/* <HouseholdItemInvite>
							<input
								type="text"
								name="invitation-firstName"
								value={formData.invitation.firstName}
							/>
							<input
								type="text"
								name="invitation-email"
								value={formData.invitation.email}
							/>
							<HouseholdIcon icon={ic_send} onClick={() => invite({ householdId: household.id, ...formData.invitation })} />
						</HouseholdItemInvite> */}
					</HouseholdItem>
				))}
			</HouseholdList>
		</Page>
	);
});

export default HouseholdPage;
